import React from "react";
import StatCard from "../components/StatCard";

const PurchaseList = () => {
    return (
        <div id="lista-compras-screen" className="screen active">
            <div className="stats-grid">
                <StatCard
                    label="Total de Compras"
                    value="3"
                    className="stat-total-purchases"
                />
                <StatCard
                    label="Valor total"
                    value="R$ 258,40"
                    className="stat-total-value"
                />
                <StatCard
                    label="Ticket médio"
                    value="R$ 83,13"
                    className="stat-avg-ticket"
                />
            </div>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar por mercado ou item..."
                    className="search-input"
                />
                <i className="fas fa-search search-icon"></i>
            </div>

            <div className="filter-container">
                <div className="custom-select-container filter-select">
                    <select className="custom-select">
                        <option>Todos os mercados</option>
                    </select>
                    <div className="custom-select-icon">
                        <i className="fas fa-chevron-down"></i>
                    </div>
                </div>
                <div className="custom-select-container filter-select">
                    <select className="custom-select">
                        <option>Data</option>
                    </select>
                    <div className="custom-select-icon">
                        <i className="fas fa-chevron-down"></i>
                    </div>
                </div>
            </div>

            <div className="purchase-list">
                <div className="purchase-item">
                    <div className="purchase-info">
                        <div>
                            <p className="purchase-name">Supermercado Central</p>
                            <p className="purchase-date">15 Jan 2025 • 14:30</p>
                            <p className="purchase-details">Alimentação • 12 itens</p>
                        </div>
                        <p className="purchase-price">R$ 127,50</p>
                    </div>
                    <div className="purchase-actions">
                        <button className="purchase-details-button">Ver detalhes</button>
                        <div className="action-buttons">
                            <button className="action-button-edit">
                                <i className="fas fa-pen"></i>
                            </button>
                            <button className="action-button-delete">
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Outros itens da lista... */}
            </div>
        </div>
    );
};

export default PurchaseList;
