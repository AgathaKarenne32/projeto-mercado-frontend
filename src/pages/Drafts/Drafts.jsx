import React from "react";
import styles from "./Drafts.module.css";

const Drafts = () => {
  return (
    <main>
      <header className={styles.headerSection} role="banner">
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Rascunho de Compras</h1>
          <h2 className={styles.subtitle}>
            Organize suas compras em tempo real enquanto está no mercado
          </h2>
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.buttonRule}>Regra de 3</button>
          <button className={styles.buttonDraft}>Novo Rascunho</button>
        </div>
      </header>

      <section className={styles.emptySection}>
        <i className={`fa-solid fa-basket-shopping ${styles.icon}`}></i>
        <h3 className={styles.emptyTitle}>Nenhum rascunho encontrado</h3>
        <p className={styles.emptyText}>Você ainda não possui rascunhos salvos.</p>
        <p className={styles.emptyText}>
          Crie um novo rascunho para começar a organizar suas compras
        </p>
      </section>
    </main>
  );
};

export default Drafts;
