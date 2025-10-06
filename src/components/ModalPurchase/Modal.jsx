import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { usePurchase } from "../../context/PurchaseContext/PurchaseContext";

import "./Modal.css";

const Modal = ({ toggleModal }) => {
  const { dispatch } = usePurchase();

  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];

  const [date, setDate] = useState(localDate);
  const [items, setItems] = useState([{ name: "", quantity: 1, price: "", total: "" }]);
  const [market, setMarket] = useState("");
  const [purchaseTotal, setCompraTotal] = useState(0);

  const addItem = () => {
    setItems([...items, { name: "", quantity: 1, price: "", total: "" }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    calculaValorTotal(newItems);
  };

  const verificaValor = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...items];

    newItems[index][name] = value;

    const quantity = parseFloat(newItems[index].quantity);
    const price = parseFloat(newItems[index].price);

    if (!isNaN(quantity) && !isNaN(price)) {
      newItems[index].total = (quantity * price).toFixed(2);
    } else {
      newItems[index].total = "";
    }

    setItems(newItems);
    calculaValorTotal(newItems);
  };

  const calculaValorTotal = (itemsToCalculate) => {
    const total = itemsToCalculate.reduce((acc, item) => {
      const itemTotal = parseFloat(item.total);
      return acc + (isNaN(itemTotal) ? 0 : itemTotal);
    }, 0);
    setCompraTotal(total.toFixed(2));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const purchase = {
      id: uuidv4(),
      date: date,
      market,
      items,
      total: purchaseTotal,
    };

    dispatch({ type: "ADD_PURCHASE", payload: purchase });

    toggleModal();
  };

  return (
    <section className="modal-container" role="dialog" aria-modal="true">
      <form className="modal-form">
        <button type="button" className="modal-close" onClick={toggleModal} aria-label="Fechar modal">
          ×
        </button>

        <header className="modal-header">
          <h2 className="modal-title">Adicionar Nova Compra</h2>
          <p className="modal-description">Registre os detalhes da sua compra incluindo local, itens e valores</p>
        </header>

        <fieldset className="modal-fieldset">
          <div className="form-group">
            <label htmlFor="purchase-date">Data da Compra</label>
            <input id="purchase-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <span className="form-hint">Selecione quando a compra foi realizada</span>
          </div>

          <div className="form-group">
            <label htmlFor="market-name">Mercado</label>
            <input
              id="market-name"
              type="text"
              placeholder="Ex: Carrefour"
              value={market}
              onChange={(e) => setMarket(e.target.value)}
            />
            <span className="form-hint">Ex: Supermercado Extra, Carrefour</span>
          </div>
        </fieldset>

        <div className="add-item-container">
          <button type="button" className="btn-add-item" onClick={addItem}>
            <i className="fas fa-plus"></i> Adicionar Item
          </button>
        </div>

        <div className="items-list">
          {items.map((item, index) => (
            <fieldset key={index} className="modal-fieldset-itens">
              <div className="form-group">
                <label>Nome do item</label>
                <input type="text" name="name" value={item.name} onChange={(e) => verificaValor(index, e)} />
              </div>

              <div className="form-group">
                <label>Quantidade</label>
                <input
                  type="number"
                  min="1"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => verificaValor(index, e)}
                />
              </div>

              <div className="form-group">
                <label>Preço Unitário</label>
                <div className="item-price">
                  <span>R$</span>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={item.price}
                    onChange={(e) => verificaValor(index, e)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Total</label>
                <div className="item-price">
                  <span>R$</span>
                  <input type="number" step="0.01" value={item.total} readOnly />
                </div>
              </div>
              {items.length > 1 && (
                <button type="button" className="btn-remove-item" onClick={() => removeItem(index)}>
                  <i className="fas fa-trash"></i>
                </button>
              )}
            </fieldset>
          ))}
        </div>

        <fieldset className="modal-fieldset-total">
          <label>Total Geral</label>
          <div className="item-price">
            <span>R$</span>
            <input type="number" value={purchaseTotal} readOnly />
          </div>
        </fieldset>

        <footer className="form-actions">
          <button type="button" className="btn btn-cancel" onClick={toggleModal}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-save" onClick={handleSubmit}>
            Salvar Compra
          </button>
        </footer>
      </form>
    </section>
  );
};

export default Modal;
