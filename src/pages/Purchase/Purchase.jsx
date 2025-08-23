import { useState } from "react";
import Modal from "../../components/ModalPurchase/Modal";
import PurchaseList from "../../components/PurchaseList/Desktop";

import "./Purchase.css";

const Purchase = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <main>
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
      <PurchaseList />
    </main>
  );
};

export default Purchase;
