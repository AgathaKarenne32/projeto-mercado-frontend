import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./UnitPriceComparatorModal.module.css";

const UnitPriceComparatorModal = ({ setShowModalUnitCompare }) => {
    const [unit, setUnit] = useState("g");
    const [result, setResult] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            quantityA: "",
            priceA: "",
            quantityB: "",
            priceB: "",
        },
    });

    const units = {
        g: "Grama",
        kg: "Quilograma",
        mg: "Miligrama",
        ml: "Mililitro",
        L: "Litro",
        unid: "Unidade",
        duzia: "Dúzia",
        m: "Metro",
        cm: "Centímetro",
    };

    const formatPriceInput = (value, field) => {
        const numeric = value.replace(/\D/g, "");
        const formatted = (parseFloat(numeric) / 100).toFixed(2).replace(".", ",");
        setValue(field, formatted);
    };

    const onCompare = (data) => {
        const qA = parseFloat(data.quantityA);
        const pA = parseFloat(data.priceA.replace(",", "."));
        const qB = parseFloat(data.quantityB);
        const pB = parseFloat(data.priceB.replace(",", "."));

        const unitPriceA = pA / qA;
        const unitPriceB = pB / qB;

        const better = unitPriceA < unitPriceB ? "Produto A" : "Produto B";
        const cheaper = Math.min(unitPriceA, unitPriceB);
        const diff = Math.abs(unitPriceA - unitPriceB).toFixed(4);
        const percent = ((diff / Math.max(unitPriceA, unitPriceB)) * 100).toFixed(1);
        const reference = (cheaper * 100).toFixed(2);

        setResult({ better, diff, percent, reference });
    };

    const onClear = () => {
        reset();
        setUnit("g");
        setResult(null);
    };

    return (
        <section className={styles.modalOverlay} role="dialog" aria-modal="true">
            <form className={styles.modalBox} onSubmit={handleSubmit(onCompare)}>
                <button
                    type="button"
                    className={styles.closeButton}
                    onClick={() => setShowModalUnitCompare(false)}
                    aria-label="Fechar modal"
                >
                    ×
                </button>

                <header className={styles.modalHeader}>
                    <h1 className={styles.modalTitle}>Comparação Unitária</h1>
                    <p className={styles.modalDescription}>
                        Informe tamanho e preço de dois produtos no mesmo tipo de unidade.
                    </p>
                </header>

                <fieldset className={styles.fieldset}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="unit">Unidade de medida</label>
                        <select
                            id="unit"
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                            className={styles.selectInput}
                            required
                        >
                            {Object.entries(units).map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label} ({value})
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>

                <div className={styles.productSection}>
                    <fieldset className={styles.fieldset}>
                        <legend>Produto A</legend>
                        <div className={styles.inputGroup}>
                            <label htmlFor="quantityA">Quantidade ({unit})</label>
                            <input
                                id="quantityA"
                                type="number"
                                className={styles.textInput}
                                {...register("quantityA", {
                                    required: "campo obrigatório *",
                                    min: { value: 0.01, message: "Valor mínimo é 0.01" },
                                })}
                            />
                            {errors.quantityA && (
                                <span className={styles.error}>{errors.quantityA.message}</span>
                            )}
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="priceA">Preço (R$)</label>
                            <input
                                id="priceA"
                                type="text"
                                className={styles.textInput}
                                {...register("priceA", {
                                    required: "campo obrigatório *",
                                })}
                                onChange={(e) => formatPriceInput(e.target.value, "priceA")}
                            />
                            {errors.priceA && (
                                <span className={styles.error}>{errors.priceA.message}</span>
                            )}
                        </div>
                    </fieldset>

                    <fieldset className={styles.fieldset}>
                        <legend>Produto B</legend>
                        <div className={styles.inputGroup}>
                            <label htmlFor="quantityB">Quantidade ({unit})</label>
                            <input
                                id="quantityB"
                                type="number"
                                className={styles.textInput}
                                {...register("quantityB", {
                                    required: "campo obrigatório *",
                                    min: { value: 0.01, message: "Valor mínimo é 0.01" },
                                })}
                            />
                            {errors.quantityB && (
                                <span className={styles.error}>{errors.quantityB.message}</span>
                            )}
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="priceB">Preço (R$)</label>
                            <input
                                id="priceB"
                                type="text"
                                className={styles.textInput}
                                {...register("priceB", {
                                    required: "campo obrigatório *",
                                })}
                                onChange={(e) => formatPriceInput(e.target.value, "priceB")}
                            />
                            {errors.priceB && (
                                <span className={styles.error}>{errors.priceB.message}</span>
                            )}
                        </div>
                    </fieldset>
                </div>

                {result && (
                    <section aria-live="polite" className={styles.resultBox}>
                        <h2>Resultado</h2>
                        <p>Melhor opção: <strong>{result.better}</strong></p>
                        <p>
                            Economiza R$ {result.diff.replace(".", ",")} por {unit} (
                            {result.percent}% mais barato)
                        </p>
                        <p>
                            Referência: R$ {result.reference.replace(".", ",")} por 100 {unit}
                        </p>
                    </section>
                )}

                <footer className={styles.buttonGroup}>
                    <button
                        type="button"
                        className={`${styles.button} ${styles.clearButton}`}
                        onClick={onClear}
                    >
                        Limpar
                    </button>
                    <button
                        type="submit"
                        className={`${styles.button} ${styles.compareButton}`}
                    >
                        Comparar
                    </button>
                </footer>
            </form>
        </section>
    );
};

export default UnitPriceComparatorModal;
