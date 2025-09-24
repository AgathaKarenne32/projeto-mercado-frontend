import React from "react";
import styles from "./Drafts.module.css";
import UnitPriceComparatorModal from "../../components/UnitPriceComparatorModal/UnitPriceComparatorModal";
import DraftModal from "../../components/Drafts/DraftModal";
import { DraftItem } from "../../components/Drafts/DrafItem";
import { useModal } from "../../contexts/ModalContext";

const Drafts = () => {
  const {
    isDraftModalOpen,
    isUnitCompareModalOpen,
    openUnitCompareModal,
  } = useModal();


  const handleUnitCompareClick = () => {
    if (typeof openUnitCompareModal === "function") {
      openUnitCompareModal();
    }
  };

  return (
    <main>
      <header className={styles.headerSection} role="banner">
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Rascunho de Compras</h1>
          <h2 className={styles.subtitle}>
            Organize suas compras em tempo real enquanto está no mercado
          </h2>
        </div>

        <div className={styles.buttonGroup}>
          <button
            className={styles.buttonUnitCompare}
            onClick={handleUnitCompareClick}
            type="button"
          >
            Comparação Unitária
          </button>
        </div>
      </header>

      <DraftItem />


      {isUnitCompareModalOpen && <UnitPriceComparatorModal />}
      {isDraftModalOpen && <DraftModal />}


    </main>
  );
};

export default Drafts;