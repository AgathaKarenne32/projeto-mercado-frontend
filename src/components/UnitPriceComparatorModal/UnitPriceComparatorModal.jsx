import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./UnitPriceComparatorModal.module.css";
import { useModal } from "../../contexts/ModalContext";

const formSchema = z.object({
  quantityA: z
    .string()
    .regex(/^[0-9]+([.,][0-9]{1,2})?$/, "Apenas números são permitidos")
    .refine((val) => parseFloat(val.replace(",", ".")) > 0, {
      message: "Valor deve ser maior que zero",
    }),
  priceA: z
    .string()
    .regex(/^[0-9]+(,[0-9]{2})?$/, "Formato inválido (ex: 12,50)")
    .refine((val) => val !== "0,00" && val !== "0", {
      message: "Preço não pode ser 0,00",
    }),
  quantityB: z
    .string()
    .regex(/^[0-9]+([.,][0-9]{1,2})?$/, "Apenas números são permitidos")
    .refine((val) => parseFloat(val.replace(",", ".")) > 0, {
      message: "Valor deve ser maior que zero",
    }),
  priceB: z
    .string()
    .regex(/^[0-9]+(,[0-9]{2})?$/, "Formato inválido (ex: 12,50)")
    .refine((val) => val !== "0,00" && val !== "0", {
      message: "Preço não pode ser 0,00",
    }),
});

const UnitPriceComparatorModal = () => {
  const [unit, setUnit] = useState("g");
  const [result, setResult] = useState(null);
  const { closeUnitCompareModal, closeUnitModal } = useModal();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
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
    if (!numeric) {
      setValue(field, "");
      return;
    }
    const formatted = (parseFloat(numeric) / 100).toFixed(2).replace(".", ",");
    setValue(field, formatted);
  };

  const onCompare = (data) => {
    const qA = parseFloat(data.quantityA.replace(",", "."));
    const pA = parseFloat(data.priceA.replace(",", "."));
    const qB = parseFloat(data.quantityB.replace(",", "."));
    const pB = parseFloat(data.priceB.replace(",", "."));

    const unitPriceA = pA / qA;
    const unitPriceB = pB / qB;

    const better = unitPriceA < unitPriceB ? "Produto A" : "Produto B";
    const cheaper = Math.min(unitPriceA, unitPriceB);
    const diff = Math.abs(unitPriceA - unitPriceB).toFixed(4);
    const percent = (
      (Math.abs(unitPriceA - unitPriceB) / Math.max(unitPriceA, unitPriceB)) *
      100
    ).toFixed(1);
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
          onClick={() => {
            if (typeof closeUnitCompareModal === "function") {
              closeUnitCompareModal();
            } else if (typeof closeUnitModal === "function") {
              closeUnitModal();
            }
          }}
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
          <fieldset className={styles.productFieldset}>
            <legend>Produto A</legend>

            <div className={styles.inputGroup}>
              <label htmlFor="quantityA">Quantidade ({unit})</label>
              <input
                id="quantityA"
                type="text"
                placeholder="500"
                className={styles.textInput}
                {...register("quantityA")}
                inputMode="decimal"
                pattern="[0-9]+([.,][0-9]{1,2})?"
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
                placeholder="R$ 0,00"
                className={styles.textInput}
                {...register("priceA")}
                onChange={(e) => formatPriceInput(e.target.value, "priceA")}
                inputMode="numeric"
              />
              {errors.priceA && (
                <span className={styles.error}>{errors.priceA.message}</span>
              )}
            </div>
          </fieldset>

          <fieldset className={styles.productFieldset}>
            <legend>Produto B</legend>

            <div className={styles.inputGroup}>
              <label htmlFor="quantityB">Quantidade ({unit})</label>
              <input
                id="quantityB"
                type="text"
                placeholder="300"
                className={styles.textInput}
                {...register("quantityB")}
                inputMode="decimal"
                pattern="[0-9]+([.,][0-9]{1,2})?"
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
                placeholder="R$ 0,00"
                className={styles.textInput}
                {...register("priceB")}
                onChange={(e) => formatPriceInput(e.target.value, "priceB")}
                inputMode="numeric"
              />
              {errors.priceB && (
                <span className={styles.error}>{errors.priceB.message}</span>
              )}
            </div>
          </fieldset>
        </div>

        {result && (
          <section aria-live="polite" className={styles.resultBox}>
            <h2>📊 Resultado da Comparação</h2>
            <p>
              🎯 <strong>Melhor opção:</strong> {result.better}
            </p>
            <p>
              💰 <strong>Economia:</strong> R$ {result.diff.replace(".", ",")}{" "}
              por {unit}
            </p>
            <p>
              📈 <strong>Percentual:</strong> {result.percent}% mais barato
            </p>
            <p>
              ⚖️ <strong>Referência:</strong> R${" "}
              {result.reference.replace(".", ",")} por 100 {unit}
            </p>
          </section>
        )}

        <footer className={styles.buttonGroup}>
          <button
            type="button"
            className={`${styles.button} ${styles.clearButton}`}
            onClick={onClear}
          >
            <i className="fa-solid fa-eraser"></i>
            Limpar
          </button>

          <button
            type="submit"
            className={`${styles.button} ${styles.compareButton}`}
          >
            <i className="fa-solid fa-calculator"></i>
            Comparar
          </button>
        </footer>
      </form>
    </section>
  );
};

export default UnitPriceComparatorModal;
