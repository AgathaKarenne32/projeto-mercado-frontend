import { usePurchase } from "../../contexts/Purchase/PurchaseContext";
import PurchaseItem from "../PurchaseItem/Desktop";

import styles from "./Desktop.module.css";

function PurchaseList() {
  const { state } = usePurchase();

  return (
    <div className={styles.container}>
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
                key={purchase.id}
                id={purchase.id}
                date={purchase.date}
                market={purchase.market}
                items={purchase.items}
                total={purchase.total}
              />
            ))}
          </tbody>
        </table>
      </div>

      <footer className={styles.footer}></footer>
    </div>
  );
}

export default PurchaseList;
