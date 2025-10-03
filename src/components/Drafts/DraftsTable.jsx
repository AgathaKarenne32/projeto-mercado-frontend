import React, { useState, useEffect } from "react";
import { useModal } from "../../contexts/ModalContext";
import { useDraft } from "../../contexts/DraftContext";
import styles from "./DraftsTable.module.css";

const DraftsTable = ({
    savedRascunhos = [],
    refresh = () => { },
    formatDate = (d) => d,
    loading = false,
}) => {
    const [preview, setPreview] = useState(null);
    const { openDraftModal } = useModal();
    const { handleDeleteDraft } = useDraft();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [expanded, setExpanded] = useState(null);

    const rascunhos = Array.isArray(savedRascunhos) ? savedRascunhos : [];

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const currencyFormatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    const extractNumber = (val) => {
        if (!val) return 0;
        if (typeof val === "number") return val;
        const cleaned = val.toString().replace(/[^0-9,.-]/g, "").replace(",", ".");
        const parsed = Number(cleaned);
        return Number.isNaN(parsed) ? 0 : parsed;
    };

    const extractQty = (it) => {
        const keys = ["quantity", "quantidade", "qty", "qtd", "amount"];
        for (const k of keys) {
            if (it && Object.prototype.hasOwnProperty.call(it, k)) {
                return extractNumber(it[k]);
            }
        }
        return 0;
    };

    const parseItems = (conteudo) => {
        try {
            if (typeof conteudo === "string") {
                const parsed = JSON.parse(conteudo);
                return Array.isArray(parsed) ? parsed : parsed.items || [];
            } else if (Array.isArray(conteudo)) {
                return conteudo;
            } else {
                return conteudo?.items || [];
            }
        } catch {
            return [];
        }
    };

    const handleDelete = async (id) => {
        const success = await handleDeleteDraft(id);
        if (success) {
            refresh();
        }
    };

    return (
        <div className={styles.tableContainer}>
            {/* CONTROLES */}
            <div className={styles.controls}>
                <button className={styles.btnCreate} onClick={() => openDraftModal()} type="button">
                    Criar Rascunho
                </button>
                <button className={styles.btnRefresh} onClick={refresh} type="button">
                    {loading ? "Carregando..." : "Atualizar lista"}
                </button>
                <div className={styles.meta}>{rascunhos.length} rascunho(s) encontrados</div>
            </div>

            {/* LISTAGEM */}
            <div className={styles.tableWrap}>
                {rascunhos.length === 0 ? (
                    <div className={styles.empty}>Nenhum rascunho salvo encontrado.</div>
                ) : isMobile ? (
                    // ==== MOBILE: Cards expansíveis ====
                    <div className={styles.mobileList}>
                        {rascunhos.map((r) => {
                            const items = parseItems(r.conteudo);
                            const totalQty = items.reduce((acc, it) => acc + extractQty(it), 0);
                            const totalPrice = items.reduce(
                                (acc, it) => acc + extractNumber(it.price) * extractQty(it),
                                0
                            );
                            const isOpen = expanded === r.id;

                            return (
                                <div key={r.id} className={styles.mobileCard}>
                                    <div className={styles.mobileHeader}>
                                        <div>
                                            <strong>{r.mercado}</strong>
                                            <div className={styles.mobileMeta}>
                                                {totalQty} itens • {currencyFormatter.format(totalPrice)}
                                            </div>
                                        </div>
                                        <button
                                            className={styles.btnExpand}
                                            onClick={() => setExpanded(isOpen ? null : r.id)}
                                        >
                                            {isOpen ? "Fechar" : "Expandir"}
                                        </button>
                                    </div>

                                    {isOpen && (
                                        <div className={styles.mobileBody}>
                                            <div className={styles.productList}>
                                                {items.map((it, i) => (
                                                    <div key={i} className={styles.productChip}>
                                                        {it.product || it.name || it.produto || "item"} •{" "}
                                                        {extractQty(it)} un. •{" "}
                                                        {currencyFormatter.format(extractNumber(it.price))}
                                                    </div>
                                                ))}
                                            </div>

                                            <div className={styles.actions}>
                                                <button
                                                    className={styles.btnView}
                                                    onClick={() => setPreview({ ...r, items })}
                                                >
                                                    Visualizar
                                                </button>
                                                <button
                                                    className={styles.btnDelete}
                                                    onClick={() => handleDelete(r.id)}
                                                >
                                                    Excluir
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    // ==== DESKTOP: Tabela ====
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
                            {rascunhos.map((r) => {
                                const items = parseItems(r.conteudo);
                                const totalQty = items.reduce((acc, it) => acc + extractQty(it), 0);
                                const totalPrice = items.reduce(
                                    (acc, it) => acc + extractNumber(it.price) * extractQty(it),
                                    0
                                );

                                return (
                                    <tr key={r.id}>
                                        <td>{r.mercado}</td>
                                        <td>
                                            <div className={styles.productList}>
                                                {items.slice(0, 3).map((it, i) => (
                                                    <span key={i} className={styles.productChip}>
                                                        {it.product || it.name || it.produto || "item"}
                                                    </span>
                                                ))}
                                                {items.length > 3 && (
                                                    <span className={styles.productChip}>+{items.length - 3}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td>{totalQty}</td>
                                        <td>{currencyFormatter.format(totalPrice)}</td>
                                        <td>{formatDate(r.createdAt || r.CREATED_AT || r.created_at || "")}</td>
                                        <td>
                                            <div className={styles.actions}>
                                                <button
                                                    className={styles.btnView}
                                                    onClick={() => setPreview({ ...r, items })}
                                                >
                                                    Visualizar
                                                </button>
                                                <button
                                                    className={styles.btnDelete}
                                                    onClick={() => handleDelete(r.id)}
                                                >
                                                    Excluir
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>

            {/* MODAL VISUALIZAÇÃO */}
            {preview && (
                <div className={styles.modalOverlay} onClick={() => setPreview(null)}>
                    <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>{preview.mercado}</h2>
                            <button className={styles.modalClose} onClick={() => setPreview(null)} aria-label="Fechar">
                                ✕
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.productsGrid}>
                                {preview.items.map((it, i) => (
                                    <div key={i} className={styles.productCard}>
                                        <div className={styles.productName}>{it.product}</div>
                                        <div className={styles.productMeta}>Qtd: {extractQty(it)}</div>
                                        <div className={styles.productPrice}>
                                            {currencyFormatter.format(extractNumber(it.price))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.totalPreview}>
                                <strong>Total geral:</strong>{" "}
                                {currencyFormatter.format(
                                    preview.items.reduce(
                                        (acc, it) => acc + extractNumber(it.price) * extractQty(it),
                                        0
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DraftsTable;