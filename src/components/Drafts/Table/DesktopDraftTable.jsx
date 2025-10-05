import React from "react";
import styles from "./DraftsTable.module.css";

const DesktopDraftTable = ({
    rascunhos,
    onPreview,
    onDelete,
    formatDate,
    parseItems,
    currencyFormatter,
    extractQty,
    extractNumber
}) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Mercado</th>
                    <th>Produtos</th>
                    <th>Qtd. Total</th>
                    <th>Total (R$)</th>
                    <th>Data e Hora</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {rascunhos.map((rascunho) => (
                    <TableRow
                        key={rascunho.id}
                        rascunho={rascunho}
                        onPreview={onPreview}
                        onDelete={onDelete}
                        formatDate={formatDate}
                        parseItems={parseItems}
                        currencyFormatter={currencyFormatter}
                        extractQty={extractQty}
                        extractNumber={extractNumber}
                    />
                ))}
            </tbody>
        </table>
    );
};

const TableRow = ({
    rascunho,
    onPreview,
    onDelete,
    formatDate,
    parseItems,
    currencyFormatter,
    extractQty,
    extractNumber
}) => {
    const items = parseItems(rascunho.conteudo);
    const totalQty = items.reduce((acc, it) => acc + extractQty(it), 0);
    const totalPrice = items.reduce(
        (acc, it) => acc + extractNumber(it.price) * extractQty(it),
        0
    );

    return (
        <tr>
            <td>{rascunho.mercado}</td>
            <td>
                <div className={styles.desktopProductList}>
                    {items.slice(0, 3).map((item, index) => (
                        <span key={index} className={styles.desktopProductChip}>
                            {item.product || item.name || item.produto || "item"}
                        </span>
                    ))}
                    {items.length > 3 && (
                        <span className={styles.desktopProductChip}>+{items.length - 3}</span>
                    )}
                </div>
            </td>
            <td>{totalQty}</td>
            <td>{currencyFormatter.format(totalPrice)}</td>
            <td>{formatDate(rascunho.createdAt || rascunho.CREATED_AT || rascunho.created_at || "")}</td>
            <td>
                <div className={styles.desktopActions}>
                    <button
                        className={styles.btnView}
                        onClick={() => onPreview({ ...rascunho, items })}
                    >
                        <i className="fa-solid fa-eye"></i>
                    </button>
                    <button
                        className={styles.btnDelete}
                        onClick={() => onDelete(rascunho.id)}
                    >
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default DesktopDraftTable;