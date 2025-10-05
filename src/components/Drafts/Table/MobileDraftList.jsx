import React from "react";
import styles from "./DraftsTable.module.css";

const MobileDraftList = ({
    rascunhos,
    expanded,
    onExpand,
    onPreview,
    onDelete,
    parseItems,
    currencyFormatter,
    extractQty,
    extractNumber
}) => {
    return (
        <div className={styles.mobileList}>
            {rascunhos.map((rascunho) => {
                const items = parseItems(rascunho.conteudo);
                const totalQty = items.reduce((acc, it) => acc + extractQty(it), 0);
                const totalPrice = items.reduce(
                    (acc, it) => acc + extractNumber(it.price) * extractQty(it),
                    0
                );
                const isOpen = expanded === rascunho.id;

                return (
                    <MobileDraftCard
                        key={rascunho.id}
                        rascunho={rascunho}
                        items={items}
                        totalQty={totalQty}
                        totalPrice={totalPrice}
                        isOpen={isOpen}
                        onExpand={onExpand}
                        onPreview={onPreview}
                        onDelete={onDelete}
                        currencyFormatter={currencyFormatter}
                        extractQty={extractQty}
                        extractNumber={extractNumber}
                    />
                );
            })}
        </div>
    );
};

const MobileDraftCard = ({
    rascunho,
    items,
    totalQty,
    totalPrice,
    isOpen,
    onExpand,
    onPreview,
    onDelete,
    currencyFormatter,
    extractQty,
    extractNumber
}) => {
    return (
        <div className={styles.mobileCard}>
            <div className={styles.mobileHeader}>
                <div className={styles.mobileHeaderContent}>
                    <strong>{rascunho.mercado}</strong>
                    <div className={styles.mobileMeta}>
                        {totalQty} itens • {currencyFormatter.format(totalPrice)}
                    </div>
                </div>
                <button
                    className={styles.btnExpand}
                    onClick={() => onExpand(isOpen ? null : rascunho.id)}
                    aria-label={isOpen ? "Fechar detalhes" : "Expandir detalhes"}
                >
                    {isOpen ? (
                        <>
                            <i className="fa-solid fa-chevron-up"></i>
                            Fechar
                        </>
                    ) : (
                        <>
                            <i className="fa-solid fa-chevron-down"></i>
                            Expandir
                        </>
                    )}
                </button>
            </div>

            {isOpen && (
                <div className={styles.mobileBody}>
                    <div className={styles.productList}>
                        {items.map((item, index) => (
                            <ProductChip
                                key={index}
                                item={item}
                                extractQty={extractQty}
                                extractNumber={extractNumber}
                                currencyFormatter={currencyFormatter}
                            />
                        ))}
                    </div>

                    <div className={styles.actions}>
                        <button
                            className={styles.btnView}
                            onClick={() => onPreview({ ...rascunho, items })}
                        >
                            <i className="fa-solid fa-eye"></i>
                            Visualizar
                        </button>
                        <button
                            className={styles.btnDelete}
                            onClick={() => onDelete(rascunho.id)}
                        >
                            <i className="fa-solid fa-trash"></i>
                            Excluir
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const ProductChip = ({ item, extractQty, extractNumber, currencyFormatter }) => {
    const productName = item.product || item.name || item.produto || "item";
    const quantity = extractQty(item);
    const price = currencyFormatter.format(extractNumber(item.price));

    return (
        <div className={styles.productChip}>
            <i className="fa-solid fa-tag"></i>
            <span className={styles.productText}>
                {productName} • {quantity} un. • {price}
            </span>
        </div>
    );
};

export default MobileDraftList;