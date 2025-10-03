import { useState } from "react";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { useDraft } from "../../contexts/DraftContext";
import { useModal } from "../../contexts/ModalContext";
import styles from "./DraftItem.module.css";

export const DraftItem = ({ hasSavedRascunhos = false }) => {
    const { draftItems, market, removeItem, clearDraft } = useDraft();
    const { openDraftModal } = useModal();
    const [isSaving, setIsSaving] = useState(false);
    const [showSavedMessage, setShowSavedMessage] = useState(false);

    const isEmpty = !draftItems || draftItems.length === 0;

    const handleCreateDraft = () => openDraftModal();

    const handleRemoveItem = (id) => removeItem(id);

    const handleSaveDraft = async () => {
        if (!market || market.trim() === "") {
            toast.error("Informe o mercado antes de salvar");
            return;
        }

        if (!draftItems || draftItems.length === 0) {
            toast.info("Não há rascunhos para salvar");
            return;
        }

        const conteudo = JSON.stringify(draftItems);
        const mercado = market;

        setIsSaving(true);
        try {

            const res = await api.post("/api/rascunhos", { mercado, conteudo });
            if (res && res.status >= 200 && res.status < 300) {
                clearDraft();
                setShowSavedMessage(true);
                toast.success("Rascunho salvo no servidor com sucesso");
                window.dispatchEvent(new CustomEvent("rascunhos:updated"));
            } else {
                toast.error(`Erro ao salvar rascunho: ${res ? res.status : "sem resposta"}`);
            }
        } catch (err) {
            console.error("Falha ao salvar rascunho:", err);
            const errMsg = err?.response?.data ? JSON.stringify(err.response.data) : err.message;
            toast.error(`Não foi possível salvar: ${errMsg}`);
        } finally {
            setIsSaving(false);
        }
    };


    const handleCreateNewDraft = () => {
        clearDraft();
        setShowSavedMessage(false);
        openDraftModal();
    };

    return (
        <section className={styles.draftList}>
            {isEmpty && !hasSavedRascunhos ? (
                <section className={styles.emptySection}>
                    <i className={`fa-solid fa-basket-shopping ${styles.icon}`}></i>
                    <h3 className={styles.emptyTitle}>Nenhum rascunho encontrado</h3>
                    <p className={styles.emptyText}>Você ainda não possui rascunhos salvos.</p>
                    <p className={styles.emptyText}>Crie um novo rascunho para começar a organizar suas compras</p>
                    <button className={styles.btnCreateDraft} onClick={handleCreateDraft} type="button">
                        Criar Rascunho
                    </button>
                </section>
            ) : (
                <section className={styles.itensContainer}>

                    {!isEmpty && !showSavedMessage && (
                        <div className={styles.actions}>
                            <button className={styles.btnAddItem} onClick={handleCreateDraft} type="button">
                                + Adicionar item
                            </button>

                            <button
                                className={styles.btnSaveDraft}
                                type="button"
                                onClick={handleSaveDraft}
                                disabled={isSaving}
                            >
                                {isSaving ? "Salvando..." : "Salvar rascunho"}
                            </button>
                        </div>
                    )}


                    {!isEmpty && draftItems.map((item) => (
                        <article key={item.id} className={styles.itemCard}>
                            <div className={styles.itemProduct}>
                                <h3 className={styles.titleProduct}>{item.product}</h3>
                                <div className={styles.infoCard}>
                                    <p><strong>Quantidade:</strong> {item.quantity}</p>
                                    <p><strong>Preço:</strong> R$ {item.price}</p>

                                </div>
                            </div>

                            {!showSavedMessage && (
                                <button
                                    className={styles.btnTrash}
                                    onClick={() => handleRemoveItem(item.id)}
                                    type="button"
                                    aria-label={`Remover ${item.product}`}
                                >
                                    Excluir
                                </button>
                            )}
                        </article>
                    ))}
                </section>
            )}
        </section>
    );
};