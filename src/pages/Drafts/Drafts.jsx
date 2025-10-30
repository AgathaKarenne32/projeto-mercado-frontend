import { useEffect } from "react";
import styles from "./Drafts.module.css";
import UnitPriceComparatorModal from "../../components/UnitPriceComparatorModal/UnitPriceComparatorModal";
import DraftModal from "../../components/Drafts/DraftModal";
import { DraftItem } from "../../components/Drafts/DrafItem";
import DraftsTable from "../../components/Drafts/Table/DraftsTable";
import { useModal } from "../../contexts/ModalContext";
import formatLocalDate from "../../utils/formatDate";
import { useDraft } from "../../contexts/DraftContext";

const Drafts = () => {
  const { isDraftModalOpen, isUnitCompareModalOpen, openUnitCompareModal } =
    useModal();

  const {
    draftItems = [],
    savedDrafts,
    loadingSaved,
    fetchDrafts,
  } = useDraft();

  useEffect(() => {
    fetchDrafts();
  }, []);

  const handleUnitCompareClick = () => {
    openUnitCompareModal();
  };

  const hasSavedDrafts = savedDrafts && savedDrafts.length > 0;
  const hasLocalDraftItems = draftItems && draftItems.length > 0;

  return (
    <main className={styles.main}>
      <header className={styles.headerSection} role="banner">
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Rascunho de Compras</h1>
          <h2 className={styles.subtitle}>
            Organize suas compras em tempo real enquanto está no mercado
          </h2>
        </div>

        <div className={styles.buttonGroup}>
          <button
            className={styles.btnUnitCompare}
            onClick={handleUnitCompareClick}
            type="button"
          >
            <i className="fa-solid fa-chart-line"></i>
            Comparação Unitária
          </button>
        </div>
      </header>

      {(hasLocalDraftItems || (!hasSavedDrafts && !loadingSaved)) && (
        <DraftItem hasSavedRascunhos={hasSavedDrafts} />
      )}

      {loadingSaved && (
        <section className={styles.loadingContainer}>
          <p>
            <i className={`fas fa-spinner ${styles.spinner}`}></i>
            Carregando rascunhos...
          </p>
        </section>
      )}

      {!loadingSaved && hasSavedDrafts && !hasLocalDraftItems && (
        <DraftsTable
          savedRascunhos={savedDrafts}
          formatDate={formatLocalDate}
          loading={loadingSaved}
          refresh={fetchDrafts}
        />
      )}

      {isUnitCompareModalOpen && <UnitPriceComparatorModal />}
      {isDraftModalOpen && <DraftModal />}
    </main>
  );
};

export default Drafts;
