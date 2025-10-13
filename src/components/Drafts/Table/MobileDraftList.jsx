import React from "react";
import { useDraft } from "../../../contexts/DraftContext";
import styles from "./DraftsTable.module.css";

const MobileDraftList = ({
  rascunhos,
  expanded,
  onExpand,
  onPreview,
  onDelete,
  onEdit,
  currencyFormatter,
  extractQty,
  extractNumber
}) => {
  return (
    <div className={styles.mobileList}>
      {rascunhos.map((rascunho) => (
        <MobileDraftCard
          key={rascunho.id}
          rascunho={rascunho}
          isExpanded={expanded === rascunho.id}
          onToggle={() => onExpand(expanded === rascunho.id ? null : rascunho.id)}
          onPreview={onPreview}
          onDelete={onDelete}
          onEdit={onEdit}
          currencyFormatter={currencyFormatter}
          extractQty={extractQty}
          extractNumber={extractNumber}
        />
      ))}
    </div>
  );
};

const MobileDraftCard = ({
  rascunho,
  isExpanded,
  onToggle,
  onPreview,
  onDelete,
  onEdit,
  currencyFormatter,
  extractQty,
  extractNumber
}) => {
  const { normalizeDraftContent } = useDraft();
  
  // Usa a função do contexto para normalizar o conteúdo
  const items = normalizeDraftContent(rascunho.conteudo);

  const totalQty = items.reduce((acc, it) => acc + extractQty(it), 0);
  const totalPrice = items.reduce((acc, it) => acc + extractNumber(it.price) * extractQty(it), 0);

  const handleEdit = () => {
    onEdit({
      id: rascunho.id,
      mercado: rascunho.mercado,
      conteudo: items, // envia os itens já normalizados
      createdAt: rascunho.createdAt
    });
  };

  return (
    <div className={styles.mobileCard}>
      <div className={styles.mobileCardHeader} onClick={onToggle}>
        <div>
          <div className={styles.mobileCardTitle}>{rascunho.mercado}</div>
          <div className={styles.mobileCardSubtitle}>
            {totalQty} itens • {currencyFormatter.format(totalPrice)}
          </div>
        </div>
        <i className={`fa-solid fa-chevron-${isExpanded ? "up" : "down"}`}></i>
      </div>

      {isExpanded && (
        <div className={styles.mobileCardBody}>
          <div className={styles.mobileProductList}>
            {items.map((item, index) => (
              <div key={index} className={styles.mobileProductItem}>
                <span>{item.produto}</span>
                <span>
                  {extractQty(item)}x • {currencyFormatter.format(extractNumber(item.price))}
                </span>
              </div>
            ))}
          </div>

          <div className={styles.mobileCardActions}>
            <button className={styles.btnView} onClick={() => onPreview({ ...rascunho, items })}>
              <i className="fa-solid fa-eye"></i> Visualizar
            </button>
            <button className={styles.btnEdit} onClick={handleEdit}>
              <i className="fa-solid fa-pen"></i> Editar
            </button>
            <button className={styles.btnDelete} onClick={() => onDelete(rascunho.id)}>
              <i className="fa-solid fa-trash"></i> Excluir
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileDraftList;