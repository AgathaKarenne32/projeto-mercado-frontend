import React from "react";
import { Link } from "react-router-dom";
import StatCard from "../../components/StatCard";
import "./dashboard.css";

export default function Dashboard() {
  return (
    <div className="dash-shell">
      <main className="dash-content">
        {/* Hero */}
        <section className="dash-hero">
          <h1>Sistema de Gestão de Compras Pessoais</h1>
          <p>
            Controle total dos seus gastos com análise inteligente de compras, relatórios detalhados e integração com leitura de QR Code para automação da entrada de dados.
          </p>
        </section>

        {/* Stat Cards */}
        <section className="stats-grid">
          <div className="stat-wrapper stat--blue">
            <StatCard label="Gasto Total Mês" value="R$ 1.234,56" />
            <p className="stat-sub">+12% em relação ao mês passado</p>
          </div>

          <div className="stat-wrapper stat--green">
            <StatCard label="Compras Este Mês" value="156" />
            <p className="stat-sub">4 novas compras esta semana</p>
          </div>

          <div className="stat-wrapper stat--amber">
            <StatCard label="Itens Únicos" value="156" />
            <p className="stat-sub">Itens únicos</p>
          </div>

          <div className="stat-wrapper stat--purple">
            <StatCard label="Economia Estimada" value="R$ 89,32" />
            <p className="stat-sub">Economia estimada</p>
          </div>
        </section>

        {/* Action Cards */}
        <section className="actions-grid">
          <article className="action-card">
            <div className="action-icon">🧾</div>
            <h3>Gerenciar Compras</h3>
            <p>Registre suas compras manualmente ou pelo QRCode.</p>
            <Link to='/compras' className="btn btn-primary">Adicionar Compra</Link>
          </article>

          <article className="action-card">
            <div className="action-icon">📐</div>
            <h3>Regra de 3</h3>
            <p>
              Compare preços por quantidade com a Regra de 3 e descubra qual
              produto realmente compensa.
            </p>
            <button className="btn btn-outline">Regra de 3</button>
          </article>

          <article className="action-card">
            <div className="action-icon">📊</div>
            <h3>Relatórios e Análises</h3>
            <p>
              Analise seus gastos com profundidade e acompanhe os padrões de consumo dos usuários para decisões mais inteligentes.
            </p>
            <Link to="/meus-relatorios" className="btn btn-outline">Meus Relatórios</Link>
            <Link to="/relatorios" className="btn btn-outline">Relatórios Gerais</Link>
          </article>
        </section>

        {/* Features list */}
        <section className="features">
          <div className="feature-row">
            <div className="feature-icon">💲</div>
            <div>
              <h4>Comparação de Preços</h4>
              <p>Compare preços entre diferentes mercados.</p>
            </div>
          </div>

          <div className="feature-row">
            <div className="feature-icon">📐</div>
            <div>
              <h4>Regra de 3</h4>
              <p>
                Compare produtos de tamanhos e preços diferentes e ache o melhor
                custo-benefício.
              </p>
            </div>
          </div>

          <div className="feature-row">
            <div className="feature-icon">📈</div>
            <div>
              <h4>Relatório mensal gerado</h4>
              <p>
                Relatórios com gráficos para análise de tendências e padrões de
                gastos.
              </p>
            </div>
          </div>
        </section>

        <footer className="dash-footer">
          <small>© {new Date().getFullYear()} Seu Projeto</small>
        </footer>
      </main>
    </div>
  );
}
