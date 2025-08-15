import { useState } from 'react';
import './Modal.css'
import { isRouteErrorResponse } from 'react-router-dom';

const Modal = ({ toggleModal }) => {
    const [items, setItems] = useState([
        { name: "", quantity: 1, price: "", total: "" }
    ]);

    const addItem = () => {
        setItems([...items, { name: "", quantity: 1, price: "", total: "" }]);
    };

    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };
    return (
        <section className="modal-container" role="dialog" aria-modal="true">
            <form className="modal-form">
                <button
                    type="button"
                    className="modal-close"
                    onClick={toggleModal}
                    aria-label="Fechar modal"
                >
                    ×
                </button>

                <header className="modal-header">
                    <h2 className="modal-title">Adicionar Nova Compra</h2>
                    <p className="modal-description">
                        Registre os detalhes da sua compra incluindo local, itens e valores
                    </p>
                </header>

                <fieldset className="modal-fieldset">
                    <div className="form-group">
                        <label htmlFor="purchase-date">Data da Compra</label>
                        <input id="purchase-date" type="date" />
                        <span className="form-hint">Selecione quando a compra foi realizada</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="market-name">Mercado</label>
                        <input id="market-name" type="text" placeholder="Ex: Carrefour" />
                        <span className="form-hint">Ex: Supermercado Extra, Carrefour</span>
                    </div>
                </fieldset>

                <div className="add-item-container">
                    <button type="button" className="btn-add-item" onClick={addItem}>
                        <i className="fas fa-plus"></i> Adicionar Item
                    </button>
                </div>

                <div className="items-list">
                    {items.map((_, index) => (
                        <fieldset key={index} className="modal-fieldset-itens">
                            <div className="form-group">
                                <label>Nome do item</label>
                                <input type="text" />
                            </div>

                            <div className="form-group">
                                <label>Quantidade</label>
                                <input type="number" min="1" />
                            </div>

                            <div className="form-group">
                                <label>Preço Unitário</label>
                                <div className="item-price">
                                    <span>R$</span>
                                    <input type="number" step="0.01" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Total</label>
                                <div className="item-price">
                                    <span>R$</span>
                                    <input type="number" step="0.01" />
                                </div>
                            </div>
                            {
                                items.length > 1 && (
                                    <button
                                        type="button"
                                        className="btn-remove-item"
                                        onClick={() => removeItem(index)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                )
                            }


                        </fieldset>
                    ))}
                </div>

                <fieldset className="modal-fieldset-total">
                    <label>Total Geral</label>
                    <div className="item-price">
                        <span>R$</span>
                        <input type="number"
                            min="0.01"
                            max="99999.99"
                            step="0.01"
                            placeholder="0,00" />

                    </div>
                </fieldset>

                <footer className="form-actions">
                    <button
                        type="button"
                        className="btn btn-cancel"
                        onClick={toggleModal}
                    >
                        Cancelar
                    </button>
                    <button type="submit" className="btn btn-save">
                        Salvar Compra
                    </button>
                </footer>
            </form>
        </section>
    )
}

export default Modal
