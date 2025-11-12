import React from "react";
import { usePurchase } from "../../../context/PurchaseContext/PurchaseContext";
import formatLocalDate from "../../../utils/formatDate";
import formatMoney from "../../../utils/formatMoney";
import Modal from "../../../modal/Modal";
import styles from "./ViewPurchaseModal.module.css";

export default function ViewPurchaseModal() {
  const { modal, closeModal, getById } = usePurchase();
  const isOpen = modal?.open && modal?.mode === "view" && modal?.id;
  const purchase = isOpen ? getById(modal.id) : null;

  if (!isOpen || !purchase) return null;

  const products = purchase.products ?? [];

  // Total oficial e total calculado pelos itens
  const purchaseTotal = purchase?.totalPrice ?? 0;
  const itemsTotal = products.reduce((acc, product) => {
    const quantity = product.quantity ?? 1;
    const unitPrice = product.unitPrice ?? product.price ?? 0;
    return acc + quantity * unitPrice;
  }, 0);

  // Mostra total de itens apenas se for diferente do total da compra
  const showItemsTotal =
    Math.round(purchaseTotal * 100) !== Math.round(itemsTotal * 100);

  return (
    <Modal onClose={closeModal}>
      <header className={styles.header}>
        <h2>Visualizar Compra</h2>
      </header>

      <section className={styles.card}>
        <h3>Itens da compra</h3>
        <p className={styles.data}>
          Data:{" "}
          {purchase?.date ? formatLocalDate(purchase.date) : "—"}
        </p>
        <p className={styles.mercado}>
          Mercado:{" "}
          {purchase?.supermarket?.store ?? "—"}
        </p>
        {products.length === 0 && (
          <p className={styles.emptyItems}>Nenhum item cadastrado.</p>
        )}

        {products.length > 0 && (
          <table className={styles.itemsTable}>
            <thead>
              <tr>
                <th>Item</th>
                <th>Qtd.</th>
                <th>Valor unit.</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const quantity = product.quantity ?? 1;
                const unitPrice =
                  product.unitPrice ??
                  product.price ??
                  0;
                const subtotal = quantity * unitPrice;

                return (
                  <tr key={product.id ?? product.name}>
                    <td>{product.name ?? "—"}</td>
                    <td>{quantity}</td>
                    <td>{formatMoney(unitPrice)}</td>
                    <td>{formatMoney(subtotal)}</td>
                  </tr>
                );
              })}
            </tbody>

            {showItemsTotal && (
              <tfoot>
                <tr>
                  <td colSpan={3} style={{ textAlign: "right" }}>
                    <strong>Total itens:</strong>
                  </td>
                  <td>
                    <strong>{formatMoney(itemsTotal)}</strong>
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        )}
      </section>

      <footer style={{ display: "flex", justifyContent: "end" }}>
        <button className={styles.btnPrimary} onClick={closeModal}>
          Fechar
        </button>
      </footer>
    </Modal>
  );
}

