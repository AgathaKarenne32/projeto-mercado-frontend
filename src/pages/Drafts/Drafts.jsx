import { useEffect, useState } from "react";
import styles from "./Drafts.module.css";
import UnitPriceComparatorModal from "../../components/UnitPriceComparatorModal/UnitPriceComparatorModal";
import DraftModal from "../../components/Drafts/DraftModal";
import { DraftItem } from "../../components/Drafts/DrafItem";
import DraftsTable from "../../components/Drafts/DraftsTable";
import { useModal } from "../../contexts/ModalContext";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import formatLocalDate from "../../utils/formatDate";
import { useDraft } from "../../contexts/DraftContext";

const Drafts = () => {
  const {
    isDraftModalOpen,
    isUnitCompareModalOpen,
    openUnitCompareModal,
  } = useModal();


  const handleUnitCompareClick = () => {
    openUnitCompareModal();

  };

  const [savedRascunhos, setSavedRascunhos] = useState([]);
  const [loadingSaved, setLoadingSaved] = useState(false);

  const fetchRascunhos = async () => {
    setLoadingSaved(true);
    try {
      const res = await api.get("/api/rascunhos");
      if (res && res.status === 200) {
        setSavedRascunhos(Array.isArray(res.data) ? res.data : []);
      } else {
        toast.error("Erro ao buscar rascunhos salvos");
      }
    } catch (err) {
      console.error("Erro ao buscar rascunhos:", err);
      const msg = err && err.response && err.response.data ? JSON.stringify(err.response.data) : err.message || String(err);
      toast.error(`Não foi possível carregar rascunhos: ${msg}`);
    } finally {
      setLoadingSaved(false);
    }
  };

  useEffect(() => {
    fetchRascunhos();

  }, []);

  useEffect(() => {
    const handler = () => fetchRascunhos();
    if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
      window.addEventListener('rascunhos:updated', handler);
    }
    return () => {
      if (typeof window !== 'undefined' && typeof window.removeEventListener === 'function') {
        window.removeEventListener('rascunhos:updated', handler);
      }
    }

  }, []);

  const { draftItems = [] } = useDraft();

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
            className={styles.btnUnitCompare}
            onClick={handleUnitCompareClick}
            type="button"
          >
            Comparação unitária
          </button>
        </div>
      </header>

      <DraftItem hasSavedRascunhos={savedRascunhos && savedRascunhos.length > 0} />

      {savedRascunhos && savedRascunhos.length > 0 && (!draftItems || draftItems.length === 0) ? (
        <section style={{ padding: "1.5rem 0" }}>

          <DraftsTable
            savedRascunhos={savedRascunhos}
            refresh={fetchRascunhos}
            formatDate={formatLocalDate}
            loading={loadingSaved}
          />
        </section>
      ) : null}


      {isUnitCompareModalOpen && <UnitPriceComparatorModal />}
      {isDraftModalOpen && <DraftModal />}


    </main>
  );
};

export default Drafts;