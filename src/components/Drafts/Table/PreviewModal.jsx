import React from "react";
import styles from "./DraftsTable.module.css";

const PreviewModal = ({ preview, onClose, currencyFormatter, extractQty, extractNumber }) => {
    if (!preview) return null;

    const totalPrice = preview.items.reduce(
        (acc, it) => acc + extractNumber(it.price) * extractQty(it),
        0
    );

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
                <ModalHeader title={preview.mercado} onClose={onClose} />
                <ModalBody
                    items={preview.items}
                    totalPrice={totalPrice}
                    currencyFormatter={currencyFormatter}
                    extractQty={extractQty}
                    extractNumber={extractNumber}
                />
            </div>
        </div>
    );
};

const ModalHeader = ({ title, onClose }) => {
    return (
        <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>{title}</h2>
            <button className={styles.modalClose} onClick={onClose} aria-label="Fechar">
                ✕
            </button>
        </div>
    );
};

const ModalBody = ({ items, totalPrice, currencyFormatter, extractQty, extractNumber }) => {
    return (
        <div className={styles.modalBody}>
            <div className={styles.productsGrid}>
                {items.map((item, index) => (
                    <ProductCard
                        key={index}
                        item={item}
                        currencyFormatter={currencyFormatter}
                        extractQty={extractQty}
                        extractNumber={extractNumber}
                    />
                ))}
            </div>
            <div className={styles.totalPreview}>
                <strong>Total geral:</strong> {currencyFormatter.format(totalPrice)}
            </div>
        </div>
    );
};

const ProductCard = ({ item, currencyFormatter, extractQty, extractNumber }) => {
    return (
        <div className={styles.productCard}>
            <div className={styles.productName}>{item.product}</div>
            <div className={styles.productMeta}>Qtd: {extractQty(item)}</div>
            <div className={styles.productPrice}>
                {currencyFormatter.format(extractNumber(item.price))}
            </div>
        </div>
    );
};

export default PreviewModal;