import { useState } from "react";
import { useDraft } from "../../contexts/DraftContext";
import { useModal } from "../../contexts/ModalContext";
import styles from "./DraftItem.module.css";

export const DraftItem = ({ hasSavedRascunhos = false }) => {
    const { draftItems, market, removeItem, clearDraft, saveDrafts, isSaving } = useDraft();
    const { openDraftModal } = useModal();

    const handleCreateDraft = () => openDraftModal();
    const handleRemoveItem = (id) => removeItem(id);

    const handleSaveDraft = async () => {
        await saveDrafts();
    };

    const handleCreateNewDraft = () => {
        clearDraft();
        openDraftModal();
    };

    const hasItems = draftItems.length > 0;

    return (
        <section className={styles.draftList}>
            {!hasItems && !hasSavedRascunhos ? (
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
                    {hasItems && (
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

                    {hasItems && draftItems.map((item) => (
                        <article key={item.id} className={styles.itemCard}>
                            <div className={styles.itemProduct}>
                                <h3 className={styles.titleProduct}>{item.product}</h3>
                                <div className={styles.infoCard}>
                                    <p><strong>Quantidade:</strong> {item.quantity}</p>
                                    <p><strong>Preço:</strong> R$ {item.price}</p>
                                </div>
                            </div>

                            <button
                                className={styles.btnTrash}
                                onClick={() => handleRemoveItem(item.id)}
                                type="button"
                                aria-label={`Remover ${item.product}`}
                            >
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </article>
                    ))}
                </section>
            )}
        </section>
    );
};
