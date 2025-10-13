import React from "react";
import styles from "./DraftsTable.module.css";

const DesktopDraftTable = ({
  rascunhos,
  onPreview,
  onDelete,
  onEdit,
  formatDate,
  parseItems,
  currencyFormatter,
  extractQty,
  extractNumber
}) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Mercado</th>
          <th>Produtos</th>
          <th>Qtd. Total</th>
          <th>Total (R$)</th>
          <th>Data e Hora</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {rascunhos.map((rascunho) => (
          <TableRow
            key={rascunho.id}
            rascunho={rascunho}
            onPreview={onPreview}
            onDelete={onDelete}
            onEdit={onEdit}
            formatDate={formatDate}
            parseItems={parseItems}
            currencyFormatter={currencyFormatter}
            extractQty={extractQty}
            extractNumber={extractNumber}
          />
        ))}
      </tbody>
    </table>
  );
};

const TableRow = ({
  rascunho,
  onPreview,
  onDelete,
  onEdit,
  formatDate,
  parseItems,
  currencyFormatter,
  extractQty,
  extractNumber
}) => {
  let items = [];
  try {
    const parsed = typeof rascunho.conteudo === "string" ? JSON.parse(rascunho.conteudo) : rascunho.conteudo;
    items = Array.isArray(parsed)
      ? parsed.map((item) => ({
          produto: item.produto || item.name || "",
          quantidade: item.quantidade || 1,
          price: item.price || 0
        }))
      : [];
  } catch {
    items = [];
  }

  const totalQty = items.reduce((acc, it) => acc + extractQty(it), 0);
  const totalPrice = items.reduce((acc, it) => acc + extractNumber(it.price) * extractQty(it), 0);

  const handleEdit = () => {
    onEdit({
      ...rascunho,
      conteudo: items // envia os itens já parseados para o modal
    });
  };

  return (
    <tr>
      <td>{rascunho.mercado}</td>
      <td>
        <div className={styles.desktopProductList}>
          {items.slice(0, 3).map((item, index) => (
            <span key={index} className={styles.desktopProductChip}>
              {item.produto}
            </span>
          ))}
          {items.length > 3 && (
            <span className={styles.desktopProductChip}>+{items.length - 3}</span>
          )}
        </div>
      </td>
      <td>{totalQty}</td>
      <td>{currencyFormatter.format(totalPrice)}</td>
      <td>{formatDate(rascunho.createdAt || "")}</td>
      <td>
        <div className={styles.desktopActions}>
          <button className={styles.btnView} onClick={() => onPreview({ ...rascunho, items })}>
            <i className="fa-solid fa-eye"></i>
          </button>
          <button className={styles.btnEdit} onClick={handleEdit}>
            <i className="fa-solid fa-pen"></i>
          </button>
          <button className={styles.btnDelete} onClick={() => onDelete(rascunho.id)}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default DesktopDraftTable;
