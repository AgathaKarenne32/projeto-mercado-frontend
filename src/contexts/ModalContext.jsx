import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
    const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);

    const openDraftModal = () => setIsDraftModalOpen(true);
    const closeDraftModal = () => setIsDraftModalOpen(false);

    const openUnitModal = () => setIsUnitModalOpen(true);
    const closeUnitModal = () => setIsUnitModalOpen(false);

    return (
        <ModalContext.Provider
            value={{
                // Draft Modal
                isDraftModalOpen,
                openDraftModal,
                closeDraftModal,

                // Unit Modal (com nomes consistentes)
                isUnitModalOpen,
                openUnitModal,
                closeUnitModal,

                // Aliases para compatibilidade
                isUnitCompareModalOpen: isUnitModalOpen,
                openUnitCompareModal: openUnitModal,
                closeUnitCompareModal: closeUnitModal,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};