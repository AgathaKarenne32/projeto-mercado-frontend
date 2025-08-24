import { useEffect, useState } from "react";
import Modal from "../../components/ModalPurchase/Modal";
import PurchaseListDesktop from "../../components/PurchaseList/Desktop";
import PurchaseListMobile from "../../components/PurchaseList/Mobile";

import "./Purchase.css";
import { PurchaseProvider } from "../../contexts/Purchase/PurchaseContext";

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
    <main>
      <PurchaseProvider>
        <section className="section-header">
          <header className="section-title">
            <h1>Gestão de Compras</h1>
            <p>Controle todas as suas compras e gastos em um só lugar</p>
          </header>

          <button className="modal-toggle" onClick={toggleModal}>
            Adicionar Compra
          </button>

          {modal && <Modal toggleModal={toggleModal} />}
        </section>

        {isMobile ? <PurchaseListMobile /> : <PurchaseListDesktop />}
      </PurchaseProvider>
    </main>
  );
};

export default Purchase;
