import { usePurchase } from "../../context/PurchaseContext/PurchaseContext";
import PurchaseItem from "../PurchaseItem/Desktop";

import styles from "./Desktop.module.css";

function PurchaseList() {
  const { state } = usePurchase();

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Lista de Compras</h1>
        <p className={styles.subtitle}>
          {state.length} {state.length === 1 ? "compra encontrada" : "compras encontradas"}
        </p>
      </header>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>DATA</th>
              <th>MERCADO</th>
              <th>ITENS</th>
              <th>TOTAL</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {state.map((purchase) => (
              <PurchaseItem
                key={purchase.accessKey}
                id={purchase.accessKey}
                date={purchase.date}
                market={purchase.store}
                items={purchase.products}
                total={purchase.totalPrice}
              />
            ))}
          </tbody>
        </table>
      </div>

      <footer className={styles.footer}></footer>
    </section>
  );
}

export default PurchaseList;
