import { useState, useEffect } from "react";
import { useModal } from "../../../contexts/ModalContext";
import { useDraft } from "../../../contexts/DraftContext";
import MobileDraftList from "./MobileDraftList";
import DesktopDraftTable from "./DesktopDraftTable";
import PreviewModal from "./PreviewModal";
import { useTableUtils } from "./useTableUtils";
import styles from "./DraftsTable.module.css";
import EditDraftModal from "../EditDraftModal/EditDraftModal";

const DraftsTable = ({
  savedRascunhos = [],
  refresh = () => {},
  formatDate = (d) => d,
  loading = false,
}) => {
  const [preview, setPreview] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [expanded, setExpanded] = useState(null);
  const [editingDraft, setEditingDraft] = useState(null);
  const [filtroNome, setFiltroNome] = useState("");

  const [filtroData, setFiltroData] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const { openDraftModal } = useModal();
  const { deleteDraft } = useDraft();
  const { currencyFormatter, parseItems, extractQty, extractNumber } =
    useTableUtils();

  const rascunhos = Array.isArray(savedRascunhos) ? savedRascunhos : [];

  const rascunhosFiltrados = rascunhos.filter((r) => {
    const nomeMatch = r.mercado
      ?.toLowerCase()
      .includes(filtroNome.toLowerCase());
    const dataMatch = filtroData ? r.createdAt?.startsWith(filtroData) : true;
    return nomeMatch && dataMatch;
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDelete = async (id) => {
    const success = await deleteDraft(id);
    if (success) refresh();
  };

  if (rascunhos.length === 0) {
    return (
      <div className={styles.tableContainer}>
        <div className={styles.controls}>
          <div className={styles.controlsHeader}>
            <div className={styles.controlsLeft}>
              <div className={styles.meta}>
                <span>Total de rascunhos:</span>
                <span className={styles.metaCount}>0</span>
              </div>
            </div>
            <div className={styles.controlsRight}>
              <button className={styles.btnCreate} onClick={openDraftModal}>
                <i className="fa-solid fa-plus"></i>
                Novo Rascunho
              </button>
            </div>
          </div>
        </div>
        <div className={styles.empty}>
          <i
            className="fa-solid fa-inbox"
            style={{ fontSize: "32px", marginBottom: "12px", color: "#9ca3af" }}
          ></i>
          <div>Nenhum rascunho salvo encontrado.</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <div className={styles.controls}>
        <div className={styles.controlsHeader}>
          <div className={styles.controlsLeft}>
            <div className={styles.meta}>
              <span>Total de rascunhos:</span>
              <span className={styles.metaCount}>
                {rascunhosFiltrados.length}
              </span>
            </div>
          </div>

          <div className={styles.controlsRight}>
            <div className={styles.filtersContainer}>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Mercado</label>
                <input
                  type="text"
                  placeholder="Filtrar por mercado..."
                  value={filtroNome}
                  onChange={(e) => setFiltroNome(e.target.value)}
                  className={styles.filterInput}
                />
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Data</label>
                <input
                  type="date"
                  value={filtroData}
                  onChange={(e) => setFiltroData(e.target.value)}
                  className={styles.filterInput}
                />
              </div>

              <button className={styles.btnCreate} onClick={openDraftModal}>
                <i className="fa-solid fa-plus"></i>
                Novo Rascunho
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.tableWrap}>
        {isMobile ? (
          <MobileDraftList
            rascunhos={rascunhosFiltrados}
            expanded={expanded}
            onExpand={setExpanded}
            onPreview={setPreview}
            onDelete={handleDelete}
            parseItems={parseItems}
            currencyFormatter={currencyFormatter}
            extractQty={extractQty}
            extractNumber={extractNumber}
            onEdit={setEditingDraft}
          />
        ) : (
          <DesktopDraftTable
            rascunhos={rascunhosFiltrados}
            onPreview={setPreview}
            onDelete={handleDelete}
            formatDate={formatDate}
            parseItems={parseItems}
            currencyFormatter={currencyFormatter}
            extractQty={extractQty}
            extractNumber={extractNumber}
            onEdit={setEditingDraft}
          />
        )}
      </div>

      <PreviewModal
        preview={preview}
        onClose={() => setPreview(null)}
        currencyFormatter={currencyFormatter}
        extractQty={extractQty}
        extractNumber={extractNumber}
      />

      {editingDraft && (
        <EditDraftModal
          draft={editingDraft}
          onClose={() => setEditingDraft(null)}
        />
      )}
    </div>
  );
};

export default DraftsTable;
