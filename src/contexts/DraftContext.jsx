import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";

const DraftContext = createContext();

export const DraftProvider = ({ children }) => {
    const [draftItems, setDraftItems] = useState(() => {
        const stored = localStorage.getItem("draftItems");
        return stored ? JSON.parse(stored) : [];
    });

    const [market, setMarket] = useState(() => localStorage.getItem("currentMarket") || "");
    const [isSaving, setIsSaving] = useState(false);
    const [savedDrafts, setSavedDrafts] = useState([]);
    const [loadingSaved, setLoadingSaved] = useState(false);

    // Verifica se há token válido
    const hasToken = () => {
        const token = localStorage.getItem("accessToken") || localStorage.getItem("token");
        return Boolean(token);
    };

    // Salva draftItems e market no localStorage
    useEffect(() => {
        localStorage.setItem("draftItems", JSON.stringify(draftItems));
        if (draftItems.length === 0) localStorage.removeItem("currentMarket");
    }, [draftItems]);

    useEffect(() => {
        if (market && draftItems.length > 0) {
            localStorage.setItem("currentMarket", market);
        } else {
            localStorage.removeItem("currentMarket");
        }
    }, [market, draftItems]);

    // Busca rascunhos do servidor, só se estiver logado
    const fetchDrafts = async () => {
        if (!hasToken()) return;

        setLoadingSaved(true);
        try {
            const res = await api.get("/api/rascunhos");
            setSavedDrafts(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error("Error fetching drafts:", err);
            toast.error("Failed to load drafts");
        } finally {
            setLoadingSaved(false);
        }
    };

    // Carrega rascunhos ao montar o contexto, só se tiver token
    useEffect(() => {
        if (hasToken()) fetchDrafts();
    }, []);

    // Adiciona item ao rascunho local
    const addItem = (item) => {
        const newItem = { ...item, id: Date.now(), timestamp: new Date().toISOString() };
        setDraftItems((prev) => [...prev, newItem]);
    };

    // Remove item do rascunho local
    const removeItem = (id) => {
        setDraftItems((prev) => prev.filter((item) => item.id !== id));
    };

    // Limpa rascunho e market
    const clearDraft = () => {
        setDraftItems([]);
        setMarket("");
    };

    // Salva rascunhos no servidor
    const saveDrafts = async () => {
        if (!hasToken()) {
            toast.error("You must be logged in to save drafts.");
            return false;
        }

        if (!market.trim()) {
            toast.error("Please provide a market before saving.");
            return false;
        }

        if (draftItems.length === 0) {
            toast.info("No drafts to save.");
            return false;
        }

        setIsSaving(true);
        try {
            const res = await api.post("/api/rascunhos", {
                mercado: market,
                conteudo: JSON.stringify(draftItems),
            });

            if (res.status >= 200 && res.status < 300) {
                clearDraft();
                toast.success("Draft saved successfully.");
                fetchDrafts();
                return true;
            } else {
                toast.error("Error saving draft.");
                return false;
            }
        } catch (err) {
            console.error("Error saving draft:", err);
            toast.error("Failed to save draft.");
            return false;
        } finally {
            setIsSaving(false);
        }
    };

    // Deleta rascunho do servidor
    const deleteDraft = async (id) => {
        if (!hasToken()) {
            toast.error("You must be logged in to delete drafts.");
            return false;
        }

        const confirmDelete = window.confirm("Are you sure you want to delete this draft?");
        if (!confirmDelete) return false;

        try {
            await api.delete(`/api/rascunhos/${id}`);
            toast.success("Draft deleted successfully.");
            fetchDrafts();
            return true;
        } catch (err) {
            console.error("Error deleting draft:", err);
            toast.error("Failed to delete draft.");
            return false;
        }
    };

    return (
        <DraftContext.Provider
            value={{
                draftItems,
                market,
                setMarket,
                addItem,
                removeItem,
                clearDraft,
                saveDrafts,
                deleteDraft,
                isSaving,
                savedDrafts,
                loadingSaved,
                fetchDrafts,
            }}
        >
            {children}
        </DraftContext.Provider>
    );
};

export const useDraft = () => useContext(DraftContext);
