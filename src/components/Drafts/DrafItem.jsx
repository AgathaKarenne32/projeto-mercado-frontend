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
    const totalItems = draftItems.length;

    return (
        <section className={styles.draftList}>
            {!hasItems && !hasSavedRascunhos ? (
                <section className={styles.emptySection}>
                    <i className={`fa-solid fa-basket-shopping ${styles.icon}`}></i>
                    <h3 className={styles.emptyTitle}>Nenhum rascunho encontrado</h3>
                    <p className={styles.emptyText}>
                        Você ainda não possui rascunhos salvos.
                    </p>
                    <p className={styles.emptyText}>
                        Crie um novo rascunho para começar a organizar suas compras
                    </p>
                    <button 
                        className={styles.btnCreateDraft} 
                        onClick={handleCreateDraft} 
                        type="button"
                    >
                        <i className="fa-solid fa-plus"></i>
                        Criar Rascunho
                    </button>
                </section>
            ) : (
                <section className={styles.itensContainer}>
               
                    {market && (
                        <div className={styles.draftHeader}>
                            <div className={styles.marketInfo}>
                                <span className={styles.marketLabel}>Mercado atual</span>
                                <h2 className={styles.marketName}>{market}</h2>
                            </div>
                            <div className={styles.itemsCount}>
                                {totalItems} {totalItems === 1 ? 'item' : 'itens'}
                            </div>
                        </div>
                    )}

                    {hasItems && (
                        <div className={styles.actions}>
                            <button 
                                className={styles.btnAddItem} 
                                onClick={handleCreateDraft} 
                                type="button"
                            >
                                <i className="fa-solid fa-plus"></i>
                                Adicionar Item
                            </button>
                            <button
                                className={styles.btnSaveDraft}
                                type="button"
                                onClick={handleSaveDraft}
                                disabled={isSaving}
                            >
                                {isSaving ? (
                                    <>
                                        <i className="fa-solid fa-spinner fa-spin"></i>
                                        Salvando...
                                    </>
                                ) : (
                                    <>
                                        <i className="fa-solid fa-floppy-disk"></i>
                                        Salvar Rascunho
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    {hasItems && draftItems.map((item) => (
                        <article key={item.id} className={styles.itemCard}>
                            <div className={styles.itemProduct}>
                                <h3 className={styles.titleProduct}>{item.product}</h3>
                                <div className={styles.infoCard}>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoLabel}>Quantidade</span>
                                        <span className={`${styles.infoValue} ${styles.quantityValue}`}>
                                            {item.quantity}
                                        </span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoLabel}>Preço</span>
                                        <span className={`${styles.infoValue} ${styles.priceValue}`}>
                                            R$ {item.price}
                                        </span>
                                    </div>
                                    {item.timestamp && (
                                        <div className={styles.infoItem}>
                                            <span className={styles.infoLabel}>Adicionado</span>
                                            <span className={styles.infoValue}>
                                                {new Date(item.timestamp).toLocaleDateString('pt-BR')}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                className={styles.btnDeleteItem}
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