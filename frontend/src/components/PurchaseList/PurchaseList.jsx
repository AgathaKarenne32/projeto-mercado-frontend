import PurchaseItem from "../PurchaseItem/PurchaseItem";
import "./PurchaseList.css";

const purchases = [
  {
    date: "14/07/2024",
    market: "Supermercado Extra",
    items: ["Arroz 1kg", "Feijão 1kg", "Alface"],
    totalPrice: 49.90,
  },

  {
    date: "15/07/2024",
    market: "Supermercado Brasileiro",
    items: ["Macarrão", "Molho de Tomate", "Queijo"],
    totalPrice: 55.60,
  },
];

const PurchaseList = () => {
  return (
    <div className="purchase-list-container">
      <header className="purchase-list-header">
        <h1 className="purchase-list-title">Lista de Compras</h1>
        <p className="purchase-list-subtitle">
          {purchases.length} {purchases.length === 1 ? "compra encontrada" : "compras encontradas"}
        </p>
      </header>

      <div className="purchase-list-table-wrapper">
        <table className="purchase-list-table">
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

      <footer className="purchase-list-footer">

      </footer>
    </div>
  );
};

export default PurchaseList;
