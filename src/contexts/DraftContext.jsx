import { createContext, useContext, useEffect, useState } from "react";

const DraftContext = createContext();

export const DraftProvider = ({ children }) => {
    const [draftItems, setDraftItems] = useState(() => {
        const stored = localStorage.getItem("items");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(draftItems));
    }, [draftItems]);

    const addItem = (item) => {
        setDraftItems((prev) => [...prev, item]);
    };

    const removeItem = (index) => {
        setDraftItems((prev) => prev.filter((_, i) => i !== index));
    };

    const clearItems = () => {
        setDraftItems([]);
    };

    return (
        <DraftContext.Provider value={{ draftItems, addItem, removeItem, clearItems }}>
            {children}
        </DraftContext.Provider>
    );
};

export const useDraft = () => useContext(DraftContext);
