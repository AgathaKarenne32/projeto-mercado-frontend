import React from "react";
import StatCard from "./StatCard";

const RelatoriosItemScreen = ({ onTabChange, activeTab }) => {
  return (
    <div id="relatorios-item-screen" className="screen active">
      <div className="report-tabs">
        <button
          className={`report-tab-button ${activeTab === "item" ? "active" : ""}`}
          id="relatorios-por-item-tab-active"
          onClick={() => onTabChange("item")}
        >
          Por Item
        </button>
        <button
          className={`report-tab-button ${activeTab === "geral" ? "active" : ""}`}
          id="relatorios-geral-tab-inactive"
          onClick={() => onTabChange("geral")}
        >
          Geral
        </button>
      </div>

      <div className="report-filters">
        <div className="custom-select-container">
          <select className="custom-select">
            <option>Item Específico: Todos os itens</option>
          </select>
          <div className="custom-select-icon">
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
        <div className="custom-select-container">
          <select className="custom-select">
            <option>Período de Análise: Últimos 6 meses</option>
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
            <option>Ordenar por: Frequência de compra</option>
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
    </div>
  );
};

export default RelatoriosItemScreen;

