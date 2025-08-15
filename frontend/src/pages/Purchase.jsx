import { useState } from "react"
import Modal from '../components/ModalPurchase/Modal'
import './Purchase.css'
const Purchase = () => {
    const [modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    }
    return (
        <main>
            <section className="section-header">
                <div className="section-title">
                    <h1>Gestão de Compras</h1>
                    <p>Controle todas as suas compras e gastos em um só lugar</p>
                </div>
                <button className="modal-toggle" onClick={() => toggleModal()}>
                    Adicionar Compra
                </button>
                {
                    modal && <Modal toggleModal={toggleModal} />
                }

            </section>



        </main>




    )
}

export default Purchase