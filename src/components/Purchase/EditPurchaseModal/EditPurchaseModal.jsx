
import React from "react";
import { usePurchase } from "../../../context/PurchaseContext/PurchaseContext";
import Modal from "../../../modal/Modal";
import formatMoney from "../../../utils/formatMoney";
import styles from "./EditPurchaseModal.module.css";

export default function EditPurchaseModal() {
  const { modal, closeModal, getById, updateItem } = usePurchase();
  const isOpen = modal?.open && modal?.mode === "edit" && modal?.id;
  const p = isOpen ? getById(modal.id) : null;

  const [form, setForm] = React.useState({
    date: p?.date ?? "",
    supermarket: p?.supermarket?.store ?? "",
    totalPrice: p?.totalPrice ?? 0,
  });

  const [productsForm, setProductsForm] = React.useState(p?.products ?? []);

  React.useEffect(() => {
    if (!p) return;
    setForm({
      date: p.date ?? "",
      supermarket: p.supermarket?.store ?? "",
      totalPrice: p.totalPrice ?? 0,
    });
    setProductsForm(p.products ?? []);
  }, [p]);

  if (!isOpen || !p) return null;

  const purchaseTotal = form.totalPrice ?? 0;

  const itemsTotal = productsForm.reduce((acc, product) => {
    const quantity = product.quantity ?? 1;
    const unitPrice = product.unitPrice ?? product.price ?? 0;
    return acc + quantity * unitPrice;
  }, 0);

  const showItemsTotal =
    Math.round(purchaseTotal * 100) !== Math.round(itemsTotal * 100);

  const onChangeProduct = (index, field, value) => {
    setProductsForm((prev) =>
      prev.map((product, i) => {
        if (i !== index) return product;

        if (field === "quantity") {
          return { ...product, quantity: Number(value) };
        }

        if (field === "unitPrice") {
          const num = Number(value);
          // Atualiza unitPrice e price pra manter compatível com o backend
          return { ...product, unitPrice: num, price: num };
        }

        return { ...product, [field]: value };
      })
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await updateItem(p.accessKey, {
      date: form.date,
      supermarket: { ...(p.supermarket ?? {}), store: form.supermarket },
      totalPrice: form.totalPrice,
      products: productsForm,
    });

    closeModal();
  };

  return (
    <Modal onClose={closeModal}>
      <header className={styles.header}>
        <h2>Editar Compra</h2>
      </header>

      <form className={styles.card} onSubmit={onSubmit}>
        <section className={styles.itemsSection}>
          <h3>Itens da compra</h3>

          {productsForm.length === 0 && (
            <p className={styles.emptyItems}>
              Nenhum item cadastrado.
            </p>
          )}

          {productsForm.length > 0 && (
            <table className={styles.itemsTable}>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qtd.</th>
                  <th>Unidade de Medida</th>
                  <th>Valor unit.</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {productsForm.map((product, index) => {
                  const quantity = product.quantity ?? 1;
                  const unitPrice =
                    product.unitPrice ??
                    product.price ??
                    0;
                  const subtotal = quantity * unitPrice;

                  return (
                    <tr key={product.id ?? product.name ?? index}>
                      <td>
                        <input
                          type="text"
                          value={product.name ?? ""}
                          onChange={(e) =>
                            onChangeProduct(
                              index,
                              "name",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          value={quantity}
                          onChange={(e) =>
                            onChangeProduct(
                              index,
                              "quantity",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          disabled={true}
                          value={product.unit ?? ""}
                          onChange={(e) =>
                            onChangeProduct(
                              index,
                              "medida",
                              e.target.value
                            )
                          }
                        />

                      </td>
                      <td>
                        <input
                          type="number"
                          step="0.01"
                          value={unitPrice}
                          onChange={(e) =>
                            onChangeProduct(
                              index,
                              "unitPrice",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>{formatMoney(subtotal)}</td>
                    </tr>
                  );
                })}
              </tbody>

              {showItemsTotal && (
                <tfoot>
                  <tr>
                    <td
                      colSpan={3}
                      style={{ textAlign: "right" }}
                    >
                      <strong>Total itens:</strong>
                    </td>
                    <td>
                      <strong>
                        {formatMoney(itemsTotal)}
                      </strong>
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          )}
        </section>

        <footer
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "end",
          }}
        >
          <button
            type="button"
            className={styles.btnGhost}
            onClick={closeModal}
          >
            Cancelar
          </button>
          <button type="submit" className={styles.btnPrimary}>
            Salvar
          </button>
        </footer>
      </form>
    </Modal >
  );
}

