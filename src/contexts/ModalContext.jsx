
import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
    const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);

    return (
        <ModalContext.Provider
            value={{
                isDraftModalOpen,
                openDraftModal: () => setIsDraftModalOpen(true),
                closeDraftModal: () => setIsDraftModalOpen(false),
                isUnitModalOpen,
                openUnitModal: () => setIsUnitModalOpen(true),
                closeUnitModal: () => setIsUnitModalOpen(false),
                isUnitCompareModalOpen: isUnitModalOpen,
                openUnitCompareModal: () => setIsUnitModalOpen(true),
                closeUnitCompareModal: () => setIsUnitModalOpen(false),
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);
