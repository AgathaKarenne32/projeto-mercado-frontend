import React, { useState, useEffect } from "react";
import { useModal } from "../../../contexts/ModalContext";
import { useDraft } from "../../../contexts/DraftContext";
import TableControls from "./TableControls";
import MobileDraftList from "./MobileDraftList";
import DesktopDraftTable from "./DesktopDraftTable";
import PreviewModal from "./PreviewModal";
import { useTableUtils } from "./useTableUtils";
import styles from "./DraftsTable.module.css";
import EditDraftModal from "../../EditDraftModal/EditDraftModal";

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

  const { openDraftModal } = useModal();
  const { deleteDraft } = useDraft();
  const { currencyFormatter, parseItems, extractQty, extractNumber } = useTableUtils();

  const rascunhos = Array.isArray(savedRascunhos) ? savedRascunhos : [];
  console.log(rascunhos)
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
        <TableControls
          onCreateDraft={openDraftModal}
          onRefresh={refresh}
          loading={loading}
          count={rascunhos.length}
        />
        <div className={styles.empty}>Nenhum rascunho salvo encontrado.</div>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <TableControls
        onCreateDraft={openDraftModal}
        onRefresh={refresh}
        loading={loading}
        count={rascunhos.length}
      />

      <div className={styles.tableWrap}>
        {isMobile ? (
          <MobileDraftList
            rascunhos={rascunhos}
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
            rascunhos={rascunhos}
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
