import axios from "axios";
import { useDraft } from "../../contexts/DraftContext";
import { useModal } from "../../contexts/ModalContext";
import styles from "./DraftItem.module.css";

export const DraftItem = () => {
    const { draftItems, removeItem } = useDraft();
    const { openDraftModal } = useModal();

    const isEmpty = draftItems.length === 0;

    const handleCreateDraft = () => {
        openDraftModal();
    };

    const handleRemoveItem = (index) => {
        removeItem(index);
    };

    const handleSaveDraft = () => {
        const response = axios.post("", draftItems)
    }

    return (
        <section className={styles.draftList}>
            {isEmpty ? (
                <section className={styles.emptySection}>
                    <i className={`fa-solid fa-basket-shopping ${styles.icon}`}></i>
                    <h3 className={styles.emptyTitle}>Nenhum rascunho encontrado</h3>
                    <p className={styles.emptyText}>Você ainda não possui rascunhos salvos.</p>
                    <p className={styles.emptyText}>
                        Crie um novo rascunho para começar a organizar suas compras
                    </p>
                    <button
                        className={styles.btnCreateDraft}
                        onClick={handleCreateDraft}
                        type="button"
                    >
                        Criar Rascunho
                    </button>
                </section>
            ) : (
                <section className={styles.itensContainer}>
                    <div className={styles.actions}>
                        <button
                            className={styles.btnAddItem}
                            onClick={handleCreateDraft}
                            type="button"
                        >
                            + Adicionar item
                        </button>
                        <button
                            className={styles.btnSaveDraft}
                            type="button"
                        >
                            Salvar rascunho
                        </button>
                    </div>

                    {draftItems.map((item, index) => (
                        <article key={`${item.product}-${index}`} className={styles.itemCard}>
                            <div>
                                <h3 className={styles.titleProduct}>{item.product}</h3>
                                <div className={styles.infoCard}>
                                    <p><strong>Quantidade:</strong> {item.quantity}</p>
                                    <p><strong>Preço:</strong> R$ {item.price}</p>
                                </div>
                            </div>
                            <button
                                className={styles.iconTrash}
                                onClick={() => handleRemoveItem(index)}
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