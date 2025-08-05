import React from "react";
import StatCard from "./StatCard";

const RelatoriosGeralScreen = ({ onTabChange, activeTab }) => {
  return (
    <div id="relatorios-geral-screen" className="screen active">
      <div className="report-tabs">
        <button
          className={`report-tab-button ${activeTab === "item" ? "active" : ""}`}
          id="relatorios-por-item-tab"
          onClick={() => onTabChange("item")}
        >
          Por Item
        </button>
        <button
          className={`report-tab-button ${activeTab === "geral" ? "active" : ""}`}
          id="relatorios-geral-tab"
          onClick={() => onTabChange("geral")}
        >
          Geral
        </button>
      </div>

      <div className="report-filters">
        <div className="custom-select-container">
          <select className="custom-select">
            <option>Periodo: Últimos 6 meses</option>
          </select>
          <div className="custom-select-icon">
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
        <div className="custom-select-container">
          <select className="custom-select">
            <option>Mercado: Todos os mercados</option>
          </select>
          <div className="custom-select-icon">
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
        <div className="custom-select-container">
          <select className="custom-select">
            <option>Comparação: Com período anterior</option>
          </select>
          <div className="custom-select-icon">
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          label="Gasto este mês"
          value="R$ 1.678,90"
          className="stat-month-spending"
        />
        <StatCard
          label="Total 6 meses"
          value="R$ 8.839,70"
          className="stat-total-6-months"
        />
        <StatCard
          label="Itens analisados"
          value="4"
          className="stat-items-analyzed"
        />
      </div>

      <div className="report-summary-card">
        <h3 className="report-summary-title">Resumo do Pedido</h3>
        <div className="report-summary-list">
          <div className="report-summary-item">
            <span>Maior gasto:</span>
            <span>R$ 1.789,23</span>
          </div>
          <div className="report-summary-item">
            <span>Menor gasto:</span>
            <span>R$ 1.123,45</span>
          </div>
          <div className="report-summary-item">
            <span>Média mensal:</span>
            <span>R$ 1.473,28</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatoriosGeralScreen;
