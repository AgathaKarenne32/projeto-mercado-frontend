import { useEffect, useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";

import Modal from "../../components/ModalPurchase/Modal";
import PurchaseListDesktop from "../../components/PurchaseList/Desktop";
import PurchaseListMobile from "../../components/PurchaseList/Mobile";

import StatCard from "../../components/StatCard";

import styles from "./Purchase.module.css";
import { PurchaseProvider } from "../../context/PurchaseContext/PurchaseContext";

const Purchase = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 769);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className={styles.container}>
      <PurchaseProvider>
        <section className={styles.intro}>
          <header className={styles.header}>
            <h1 className={styles.title}>Gestão de Compras</h1>
            <p className={styles.subtitle}>Controle todas as suas compras e gastos em um só lugar</p>
          </header>

          <button className={styles.btnAddPurchase} onClick={toggleModal}>
            Adicionar Compra
          </button>

          {modal && <Modal toggleModal={toggleModal} />}
        </section>

        <section className={styles.cards}>
          <div className={styles.statCardWrapper} style={{ backgroundColor: "#6B7280" }}>
            <StatCard label="Total de Compras" value="1" className={styles.statCard} />
            {!isMobile && <ShoppingCartOutlinedIcon className={styles.statCardIcon} />}
          </div>

          <div className={styles.statCardWrapper} style={{ backgroundColor: "#A239FE" }}>
            <StatCard label="Valor Total" value="R$ 49,40" className={styles.statCard} />
            {!isMobile && <PaymentsOutlinedIcon className={styles.statCardIcon} />}
          </div>

          <div className={styles.statCardWrapper} style={{ backgroundColor: "#2196F3" }}>
            <StatCard label="Ticket Médio" value="R$ 49,40" className={styles.statCard} />
            {!isMobile && <LocalActivityOutlinedIcon className={styles.statCardIcon} />}
          </div>

          <div className={`${styles.statCardWrapper} ${styles.lastStatCard}`} style={{ backgroundColor: "#E74C3C" }}>
            <StatCard label="Produto mais comprado" value="Arroz 5kg" className={styles.statCard} />
            {!isMobile && <ShoppingBasketOutlinedIcon className={styles.statCardIcon} />}
          </div>
        </section>

        {isMobile ? <PurchaseListMobile /> : <PurchaseListDesktop />}
      </PurchaseProvider>

    </main>
  );
};

export default Purchase;
