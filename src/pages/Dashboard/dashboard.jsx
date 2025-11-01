import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./dashboard.module.css";

const ActionCard = ({
  icon,
  title,
  description,
  buttonText,
  link,
  variant,
}) => (
  <div className={`${styles.actionCard} ${styles[variant]}`}>
    <div className={styles.cardHeader}>
      <div className={styles.cardIcon}>
        <i className={icon}></i>
      </div>
    </div>
    <h3 className={styles.cardTitle}>{title}</h3>
    <p className={styles.cardDescription}>{description}</p>
    <Link to={link} className={styles.cardButton}>
      {buttonText}
      <i className="fas fa-arrow-right"></i>
    </Link>
  </div>
);

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footerContent}>
      <p>
        &copy; {new Date().getFullYear()} Compras Fácil. Todos os direitos
        reservados.
      </p>
    </div>
  </footer>
);

export default function Dashboard() {
  const mainActions = [
    {
      icon: "fas fa-bolt",
      title: "Gerencie suas compras",
      description: "Armazene suas compras do dia de forma manual.",
      buttonText: "Nova Compra",
      link: "/compras",
      variant: "primary",
    },
    {
      icon: "fas fa-qrcode",
      title: "Scan Inteligente",
      description:
        "Digitalize o QR code da nota e importe automaticamente todos os itens.",
      buttonText: "Escanear QR Code",
      link: "/compras",
      variant: "secondary",
    },
    {
      icon: "fas fa-pencil-alt",
      title: "Rascunho",
      description:
        "Comece uma compra e salve para terminar depois. Perfeito para planejamento!",
      buttonText: "Criar Rascunho",
      link: "/rascunhos",
      variant: "accent",
    },
  ];

  const quickTools = [
    {
      icon: "fas fa-balance-scale",
      title: "Comparar Preços",
      description: "Compare produtos de diferentes tamanhos e marcas",
      link: "/comparacao",
    },
    {
      icon: "fas fa-history",
      title: "Histórico",
      description: "Veja todas as suas compras anteriores",
      link: "/historico",
    },
    {
      icon: "fas fa-search-dollar",
      title: "Análises",
      description: "Descubra onde você mais economiza",
      link: "/analises",
    },
  ];

  const features = [
    {
      icon: "fas fa-mobile-alt",
      title: "App Mobile",
      description: "Use no mercado direto do seu celular",
      status: "Em Breve",
    },
    {
      icon: "fas fa-chart-pie",
      title: "Relatórios",
      description: "Gráficos detalhados dos seus gastos",
      status: "Em Breve",
    },
  ];

  return (
    <div className={styles.dashboard}>
      <header className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>Compras Fácil</h1>
            <p className={styles.heroSubtitle}>
              Digitalize notas fiscais, compare preços unitários e acompanhe seu
              histórico de compras.
            </p>
            <p className={styles.heroHighlight}>
              Economize tempo e dinheiro com o controle completo dos seus
              gastos.
            </p>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <i className="fas fa-shield-alt"></i>
                <span>100% gratuito</span>
              </div>
              <div className={styles.stat}>
                <i className="fas fa-rocket"></i>
                <span>Comece agora</span>
              </div>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroGraphics}>
              <div className={styles.floatingIcons}>
                <div className={`${styles.iconCircle} ${styles.receipt}`}>
                  <i className="fas fa-receipt"></i>
                </div>
                <div className={`${styles.iconCircle} ${styles.chart}`}>
                  <i className="fas fa-chart-line"></i>
                </div>
                <div className={`${styles.iconCircle} ${styles.piggy}`}>
                  <i className="fas fa-piggy-bank"></i>
                </div>
              </div>
              <div className={styles.shoppingScene}>
                <div className={styles.groceryBag}>
                  <i className="fas fa-shopping-bag"></i>
                </div>
                <div className={styles.priceTag}>
                  <i className="fas fa-tag"></i>
                </div>
                <div className={styles.wallet}>
                  <i className="fas fa-wallet"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className={styles.actionsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Como você quer começar?</h2>
          <p className={styles.sectionSubtitle}>
            Escolha a forma mais prática para você
          </p>
        </div>
        <div className={styles.actionsGrid}>
          {mainActions.map((action, index) => (
            <ActionCard key={index} {...action} />
          ))}
        </div>
      </section>

      <section className={styles.toolsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Ferramentas Úteis</h2>
          <p className={styles.sectionSubtitle}>
            Aqui você poderá acessar ferramentas incríveis para gerenciar suas
            compras
          </p>
        </div>
        <div className={styles.toolsGrid}>
          {quickTools.map((tool, index) => (
            <article key={index} className={styles.toolCard}>
              <div className={styles.toolIcon}>
                <i className={tool.icon}></i>
              </div>
              <div className={styles.toolContent}>
                <h4 className={styles.toolTitle}>{tool.title}</h4>
                <p className={styles.toolDescription}>{tool.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Novidades em Breve</h2>
          <p className={styles.sectionSubtitle}>
            Funcionalidades incríveis que estamos preparando para você
          </p>
        </div>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <i className={feature.icon}></i>
              </div>
              <div className={styles.featureContent}>
                <h4 className={styles.featureTitle}>{feature.title}</h4>
                <p className={styles.featureDescription}>
                  {feature.description}
                </p>
                <span className={styles.featureStatus}>{feature.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
