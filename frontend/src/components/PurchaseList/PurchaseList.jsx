import "./PurchaseList.css";

const purchases = [];

const PurchaseList = () => {
  return (
    <div className="purchase-list-container">
      <header>
        <h1 className="purchase-list-title">Lista de Compras</h1>
        <p className="purchase-list-subtitle">
          {purchases.length} {purchases.length === 1 ? "compra" : "compras"} encontrada
        </p>
      </header>

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

        <tbody></tbody>
      </table>
    </div>
  );
};

export default PurchaseList;
