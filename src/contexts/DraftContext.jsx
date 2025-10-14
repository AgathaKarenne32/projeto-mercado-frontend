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

  const hasToken = () => {
    const token = localStorage.getItem("accessToken") || localStorage.getItem("token");
    return Boolean(token);
  };

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

  
  const fetchDrafts = async () => {
    if (!hasToken()) return;
    setLoadingSaved(true);

    try {
      const res = await api.get("/api/rascunhos");
      setSavedDrafts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Erro ao buscar rascunhos:", err);
      toast.error("Falha ao carregar rascunhos.");
    } finally {
      setLoadingSaved(false);
    }
  };


  const addItem = (item) => {
    const newItem = { ...item, id: Date.now(), timestamp: new Date().toISOString() };
    setDraftItems((prev) => [...prev, newItem]);
  };

  
  const updateDraft = async (id, updatedData) => {
    if (!hasToken()) {
      toast.error("Você precisa estar logado para editar rascunhos.");
      return false;
    }

    try {
      const res = await api.put(`/api/rascunhos/${id}`, {
        mercado: updatedData.mercado,
        conteudo: JSON.stringify(updatedData.conteudo),
      });

      if (res.status >= 200 && res.status < 300) {
        toast.success("Rascunho atualizado com sucesso!");
        await fetchDrafts();
        return true;
      } else {
        toast.error("Erro ao atualizar o rascunho.");
        return false;
      }
    } catch (err) {
      console.error("Erro ao atualizar rascunho:", err);
      toast.error("Falha ao atualizar o rascunho.");
      return false;
    }
  };

  // 🔹 Remover item local
  const removeItem = (id) => {
    setDraftItems((prev) => prev.filter((item) => item.id !== id));
  };

  
  const clearDraft = () => {
    setDraftItems([]);
    setMarket("");
  };

 
  const saveDrafts = async () => {
    if (!hasToken()) {
      toast.error("Você precisa estar logado para salvar rascunhos.");
      return false;
    }

    if (!market.trim()) {
      toast.error("Informe o mercado antes de salvar.");
      return false;
    }

    if (draftItems.length === 0) {
      toast.info("Não há rascunhos para salvar.");
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
        toast.success("Rascunho salvo com sucesso!");
        await fetchDrafts();
        return true;
      } else {
        toast.error("Erro ao salvar o rascunho.");
        return false;
      }
    } catch (err) {
      console.error("Erro ao salvar rascunho:", err);
      toast.error("Falha ao salvar o rascunho.");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

 
 const deleteDraft = async (id) => {
  if (!hasToken()) {
    toast.error("Você precisa estar logado para excluir rascunhos.");
    return false;
  }

  try {
    await api.delete(`/api/rascunhos/${id}`);
    toast.success("Rascunho excluído com sucesso!");
    await fetchDrafts();
    return true;
  } catch (err) {
    console.error("Erro ao excluir rascunho:", err);
    toast.error("Falha ao excluir o rascunho.");
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
        updateDraft, 
      }}
    >
      {children}
    </DraftContext.Provider>
  );
};

export const useDraft = () => useContext(DraftContext);
