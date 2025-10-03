import React, { useState } from "react";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { useModal } from "../../contexts/ModalContext";
import styles from "./DraftsTable.module.css";

const DraftsTable = ({
    savedRascunhos = [],
    refresh = () => { },
    formatDate = (d) => d,
    loading = false
}) => {
    const [preview, setPreview] = useState(null); // estado para modal de visualização
    const { openDraftModal } = useModal();
    const rascunhos = Array.isArray(savedRascunhos) ? savedRascunhos : [];

    const currencyFormatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
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

    return (
        <div className={styles.tableContainer}>

            <div className={styles.controls}>
                <button className={styles.btnCreate} onClick={() => openDraftModal()} type="button">
                    Criar Rascunho
                </button>
                <button className={styles.btnRefresh} onClick={refresh} type="button">
                    {loading ? "Carregando..." : "Atualizar lista"}
                </button>

            </div>


            <div className={styles.tableWrap}>
                {rascunhos.length === 0 ? (
                    <div className={styles.empty}>Nenhum rascunho salvo encontrado.</div>
                ) : (
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
                                let items = [];
                                try {
                                    if (typeof r.conteudo === "string") {
                                        const parsed = JSON.parse(r.conteudo);
                                        items = Array.isArray(parsed) ? parsed : parsed.items || [];
                                    } else if (Array.isArray(r.conteudo)) {
                                        items = r.conteudo;
                                    } else {
                                        items = r.conteudo?.items || [];
                                    }
                                } catch {
                                    items = [];
                                }

                                const totalQty = items.reduce((acc, it) => acc + extractQty(it), 0);
                                const totalPrice = items.reduce(
                                    (acc, it) => acc + extractNumber(it.price) * extractQty(it),
                                    0
                                );

                                return (
                                    <tr key={r.id}>
                                        <td data-label="Mercado">{r.mercado}</td>


                                        <td data-label="Produtos">
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

                                        <td data-label="Qtd. Total">{totalQty}</td>
                                        <td data-label="Total (R$)">{currencyFormatter.format(totalPrice)}</td>
                                        <td data-label="Criado">{formatDate(r.createdAt || r.CREATED_AT || r.created_at || "")}</td>

                                        <td data-label="Ações">
                                            <div className={styles.actions}>
                                                <button
                                                    className={styles.btnView}
                                                    onClick={() => setPreview({ ...r, items })}
                                                    type="button"
                                                >
                                                    Visualizar
                                                </button>
                                                <button
                                                    className={styles.btnDelete}
                                                    onClick={async () => {
                                                        const ok = window.confirm("Confirma exclusão do rascunho?");
                                                        if (!ok) return;
                                                        try {
                                                            const delRes = await api.delete(`/api/rascunhos/${r.id}`);
                                                            if (delRes && (delRes.status === 200 || delRes.status === 204)) {
                                                                toast.success("Rascunho excluído");
                                                                refresh();
                                                            } else {
                                                                toast.error("Erro ao excluir rascunho");
                                                            }
                                                        } catch (err) {
                                                            console.error("Erro ao excluir rascunho", err);
                                                            toast.error("Não foi possível excluir o rascunho");
                                                        }
                                                    }}
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

                            {/* Total geral */}
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
