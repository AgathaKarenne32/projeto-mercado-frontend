import { useRef, useState, useEffect } from "react";
import "./Modal.css"
import { api } from "../../services/api";
import { usePurchase } from "../../context/PurchaseContext/PurchaseContext";
import { toast } from "react-toastify";
import qrcodeVazio from "./../../assets/qrcode-vazio.png"

const QRCodeAddModal = ({ toggleModal }) => {

    const [link, setLink] = useState("");
    const { dispatch } = usePurchase();
    const [isSendingRequest, setIsSendingRequest] = useState(false);
    const inputRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault();


        const urlForm = {
            url: link,
        }

        setIsSendingRequest(true)

        api.post("api/nfces/from-url", urlForm).then(
            res => {
                toast.success("Nota fiscal adicionada com sucesso!")
                dispatch({ type: "ADD_PURCHASE", payload: res.data.data });
                toggleModal()
            }
        ).catch(err => {
            if (err.response?.data?.statusMessage == "Host inválido.") toast.error("Desculpe, não conseguimos pegar a nota fiscal com o dado fornecido")
            else toast.error("Erro interno/nota fiscal ja cadastrada")
        }).finally(
            setIsSendingRequest(false)
        )
    }

    const onChangeInput = (e) => {
        setLink(e.target.value)
    }

    const clearLink = () => {
        setLink("")
        inputRef.current.value = ""
    }

    useEffect(() => {
            console.log(isSendingRequest)
    }, [isSendingRequest])

    return (
        <section className="modal-container" role="dialog" aria-modal="true">
            <form className="modal-form">

                <button type="button" className="modal-close" onClick={toggleModal} aria-label="Fechar modal">
                    ×
                </button>

                <h3>Link QRCode</h3>

                <h4>Como funciona?</h4>

                <p>Pegue a camera do seu celular e escaneie o QRCode da nota fiscal</p>

                <p>O QRCode ta nota fiscal é parecido com esse QRCode abaixo, geralmente costuma estar no final da nota fiscal</p>

                <img src={qrcodeVazio} width={"100px"} />

                <p>Após isso, pegue o link do QRCode e coloque no campo abaixo</p>




                <fieldset className="modal-fieldset-item-qrcode">
                    <div className="form-group">
                        <span>
                            <label>Link</label>
                            {
                                (
                                    (link != "") ?
                                        <i onClick={clearLink} className="fa-solid fa-eraser fa-fade fa-lg float-right" style={{ color: "#ef2929" }}></i> :  ""
)
                            }
                        </span>
                        <input
                            ref={inputRef}
                            type="text"
                            onChange={onChangeInput}
                            disabled={isSendingRequest}
                        />
                    </div>
                </fieldset>

                <button type="submit" className="btn btn-save" onClick={handleSubmit} disabled={isSendingRequest}>
                    {isSendingRequest ?
                        (
                            <>
                                <i class="fa-solid fa-spinner fa-spin"></i> <span>Salvando</span>
                            </>
                        ) : ("Salvar compra")
                    }

                </button>
            </form>
        </section >
    )
}

export default QRCodeAddModal;