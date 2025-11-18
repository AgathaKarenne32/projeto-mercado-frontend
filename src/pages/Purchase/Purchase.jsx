import { useEffect, useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";

import ViewPurchaseModal from "../../components/Purchase/ViewPurchaseModal/ViewPurchaseModal";
import EditPurchaseModal from "../../components/Purchase/EditPurchaseModal/EditPurchaseModal";

import Modal from "../../components/ModalPurchase/Modal";
import QRCodeAddModal from "../../components/ModalPurchase/QRCodeAddModal";
import PurchaseListDesktop from "../../components/PurchaseList/Desktop";
import PurchaseListMobile from "../../components/PurchaseList/Mobile";

import StatCard from "../../components/StatCard";
import styles from "./Purchase.module.css";

import {
  PurchaseProvider,
  usePurchase,
} from "../../context/PurchaseContext/PurchaseContext";
import PurchaseCards from "./PurchaseCards";

const Purchase = () => {
  return (
    <main className={styles.container}>
      <PurchaseProvider>
        <InnerPurchasePage />
      </PurchaseProvider>
    </main>
  );
};

const InnerPurchasePage = () => {
  const [manualAddModal, setManualAddModal] = useState(false);
  const [qrCodeAddModal, setQrCodeAddModal] = useState(false);

  const toggleManualAddModal = () => setManualAddModal(!manualAddModal);
  const toggleQRCodeAddModal = () => setQrCodeAddModal(!qrCodeAddModal);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);

  const { modalType, modalId, closeModal } = usePurchase();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 769);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <section className={styles.intro}>
        <header className={styles.header}>
          <h1 className={styles.title}>Gestão de Compras</h1>
          <p className={styles.subtitle}>
            Controle todas as suas compras e gastos em um só lugar
          </p>
        </header>

        <button
          className={styles.btnAddPurchase}
          onClick={toggleQRCodeAddModal}
        >
          Adicionar Compra
        </button>

        <button
          className={styles.btnAddPurchase}
          onClick={toggleManualAddModal}
        >
          Adicionar Compra
        </button>

        {manualAddModal && <Modal toggleModal={toggleManualAddModal} />}
        {qrCodeAddModal && (
          <QRCodeAddModal toggleModal={toggleQRCodeAddModal} />
        )}
      </section>

      <PurchaseCards isMobile={isMobile} />

      {isMobile ? <PurchaseListMobile /> : <PurchaseListDesktop />}

      <ViewPurchaseModal
        open={modalType === "view"}
        id={modalId}
        onClose={closeModal}
      />

      <EditPurchaseModal
        open={modalType === "edit"}
        id={modalId}
        onClose={closeModal}
      />
    </>
  );
};

export default Purchase;
