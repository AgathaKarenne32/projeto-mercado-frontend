import { createContext, useContext, useEffect, useState } from "react";

const DraftContext = createContext();

export const DraftProvider = ({ children }) => {
    const [draftItems, setDraftItems] = useState(() => {
        const stored = localStorage.getItem("draftItems");
        return stored ? JSON.parse(stored) : [];
    });

    const [market, setMarket] = useState(() => {
        const stored = localStorage.getItem("currentMarket");
        return stored || "";
    });

    // Salvar items e mercado separadamente no localStorage
    useEffect(() => {
        localStorage.setItem("draftItems", JSON.stringify(draftItems));

        // Se não há itens, remove o currentMarket do localStorage
        if (draftItems.length === 0) {
            localStorage.removeItem("currentMarket");
        }
    }, [draftItems]);

    useEffect(() => {
        // Só salva o market no localStorage se houver itens
        if (market && draftItems.length > 0) {
            localStorage.setItem("currentMarket", market);
        } else if (!market) {
            localStorage.removeItem("currentMarket");
        }
    }, [market, draftItems]);

    const addItem = (item) => {
        const newItem = {
            ...item,
            id: Date.now(), // ID único para cada item
            timestamp: new Date().toISOString()
        };
        setDraftItems((prev) => [...prev, newItem]);
    };

    const removeItem = (id) => {
        setDraftItems((prev) => prev.filter(item => item.id !== id));
    };

    const clearItems = () => {
        setDraftItems([]);
    };

    const clearDraft = () => {
        setDraftItems([]);
        setMarket("");
    };



    return (
        <DraftContext.Provider value={{
            draftItems,
            market,
            setMarket,
            addItem,
            removeItem,
            clearItems,
            clearDraft,

        }}>
            {children}
        </DraftContext.Provider>
    );
};

export const useDraft = () => {
    const context = useContext(DraftContext);
    return context;
};