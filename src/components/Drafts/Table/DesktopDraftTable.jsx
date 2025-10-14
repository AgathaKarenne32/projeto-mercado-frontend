import React, { useState } from "react";
import styles from "./DraftsTable.module.css";
import EditDraftModal from "../EditDraftModal/EditDraftModal";

const DesktopDraftTable = ({
  rascunhos,
  onPreview,
  onDelete,
  formatDate,
  parseItems,
  currencyFormatter,
  extractQty,
  extractNumber,
}) => {
  const [editingDraft, setEditingDraft] = useState(null);

  const handleEdit = (rascunho) => {
    console.log('Rascunho dentor do edit', rascunho)
    try {
     
      const parsed =
        typeof rascunho.conteudo === "string"
          ? JSON.parse(rascunho.conteudo)
          : Array.isArray(rascunho.conteudo)
          ? rascunho.conteudo
          : [];

      console.log('parsed dentor do edit', parsed)
      const items = parsed.map((item) => ({
        product: item.product || "",
        quantity: item.quantity || 1,
        price: item.price || 0,
      }));

     setEditingDraft({ ...rascunho, conteudo: items });
    } catch (err) {
      console.error("Erro ao abrir rascunho:", err);
      setEditingDraft({ ...rascunho, conteudo: [] });
    }
  };

  return (
    <>
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
          {rascunhos.map((rascunho) => {
            console.log('Ola,sou o rascunho para saber de fato como vem do back', rascunho)
            let items = [];
            try {
              const parsed = typeof rascunho.conteudo === "string" ? JSON.parse(rascunho.conteudo) : rascunho.conteudo;
              items = Array.isArray(parsed)
                ? parsed.map((item) => ({
                    product: item.product || "",
                    quantity: item.quantity || 1,
                    price: item.price || 0,
                  }))
                  
                : [];
                console.log('items', items)
            } catch {
              items = [];
            }

            const totalQty = items.reduce((acc, it) => acc + extractQty(it), 0);
            const totalPrice = items.reduce(
              (acc, it) => acc + extractNumber(it.price) * extractQty(it),
              0
            );

            return (
              <tr key={rascunho.id}>
                <td>{rascunho.mercado}</td>
                <td>
                  <div className={styles.desktopProductList}>
                    {items.slice(0, 3).map((item, index) => (
                      <span key={index} className={styles.desktopProductChip}>
                        {item.product}
                      </span>
                    ))}
                    {items.length > 3 && (
                      <span className={styles.desktopProductChip}>
                        +{items.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td>{totalQty}</td>
                <td>{currencyFormatter.format(totalPrice)}</td>
                <td>{formatDate(rascunho.createdAt || "")}</td>
                <td>
                  <div className={styles.desktopActions}>
                    <button
                      className={styles.btnView}
                      onClick={() => onPreview({ ...rascunho, items })}
                    >
                      <i className="fa-solid fa-eye"></i>
                    </button>
                    <button
                      className={styles.btnEdit}
                      onClick={() => handleEdit(rascunho)}
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button
                      className={styles.btnDelete}
                      onClick={() => onDelete(rascunho.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {editingDraft && (
        <EditDraftModal
          draft={editingDraft}
          onClose={() => setEditingDraft(null)}
        />
      )}
    </>
  );
};

export default DesktopDraftTable;
