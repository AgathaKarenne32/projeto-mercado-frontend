import PurchaseItem from "../PurchaseItem/Desktop";

import styles from "./Desktop.module.css";

const purchases = [
  {
    date: "14/07/2024",
    market: "Supermercado Extra",
    items: ["Arroz 1kg", "Feijão 1kg", "Alface"],
    totalPrice: 49.9,
  },

  {
    date: "15/07/2024",
    market: "Supermercado Brasileiro",
    items: ["Macarrão", "Molho de Tomate", "Queijo"],
    totalPrice: 55.6,
  },
];

function PurchaseList() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Lista de Compras</h1>
        <p className={styles.subtitle}>
          {purchases.length} {purchases.length === 1 ? "compra encontrada" : "compras encontradas"}
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
            {purchases.map((purchase, idx) => (
              <PurchaseItem
                key={idx}
                date={purchase.date}
                market={purchase.market}
                items={purchase.items}
                totalPrice={purchase.totalPrice}
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
