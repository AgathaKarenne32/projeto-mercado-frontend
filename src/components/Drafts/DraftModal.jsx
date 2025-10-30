import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./DraftModal.module.css";
import { useDraft } from "../../contexts/DraftContext";
import { useModal } from "../../contexts/ModalContext";

const formSchema = z.object({
  market: z.string().min(1, "campo obrigatório *"),
  product: z.string().min(1, "campo obrigatório *"),
  quantity: z
    .number({ invalid_type_error: "campo obrigatório *" })
    .min(1, "mínimo 1"),
  price: z
    .string()
    .min(1, "campo obrigatório *")
    .refine(
      (val) => {
        const num = parseFloat(val.replace(",", "."));
        return num > 0;
      },
      { message: "O preço deve ser maior que 0,00" }
    ),
});

const DraftModal = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMarket, setSelectedMarket] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      market: "",
      product: "",
      quantity: 1,
      price: "",
    },
  });

  const { addItem, setMarket, clearDraft } = useDraft();
  const quantityValue = watch("quantity");
  const { closeDraftModal } = useModal();

  useEffect(() => {
    const storedMarket = localStorage.getItem("currentMarket");
    if (storedMarket) {
      setSelectedMarket(storedMarket);
      setValue("market", storedMarket);
      setCurrentStep(2);
    }
  }, [setValue]);

  const formatPriceInput = (value, field) => {
    const numeric = value.replace(/\D/g, "");
    const formatted = (parseFloat(numeric) / 100).toFixed(2).replace(".", ",");
    setValue(field, formatted);
  };

  const handleQuantityChange = (increment) => {
    const currentValue = parseInt(quantityValue) || 0;
    const newValue = Math.max(1, currentValue + increment);
    setValue("quantity", newValue);
  };

  const handleMarketSubmit = () => {
    const marketInput = getValues("market").trim();
    if (!marketInput) return;
    setMarket(marketInput);
    setSelectedMarket(marketInput);
    localStorage.setItem("currentMarket", marketInput);
    setCurrentStep(2);
  };

  const saveDraftItem = (data) => {
    const itemData = {
      product: data.product.trim(),
      quantity: data.quantity,
      price: data.price,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    };
    addItem(itemData);
    reset({
      market: selectedMarket,
      product: "",
      quantity: 1,
      price: "",
    });
    if (typeof closeDraftModal === "function") closeDraftModal();
  };

  const changeMarket = () => {
    clearDraft();
    localStorage.removeItem("currentMarket");
    localStorage.removeItem("draftItems");
    setSelectedMarket("");
    setValue("market", "");
    setCurrentStep(1);
  };

  const handleClose = () => {
    reset({
      market: selectedMarket || "",
      product: "",
      quantity: 1,
      price: "",
    });
    if (typeof closeDraftModal === "function") closeDraftModal();
  };

  return (
    <section className={styles.modalOverlay} role="dialog" aria-modal="true">
      <form
        className={styles.modalBox}
        onSubmit={
          currentStep === 1
            ? (e) => {
                e.preventDefault();
                handleMarketSubmit();
              }
            : handleSubmit(saveDraftItem)
        }
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Fechar modal"
        >
          ×
        </button>

        {currentStep === 1 && (
          <>
            <header className={styles.modalHeader}>
              <h1 className={styles.modalTitle}>Mercado</h1>
              <p className={styles.modalDescription}>
                Informe em qual mercado você está fazendo compras.
              </p>
            </header>

            <fieldset className={styles.fieldset}>
              <div className={styles.inputGroup}>
                <label htmlFor="market">Nome do Mercado</label>
                <input
                  id="market"
                  type="text"
                  placeholder="Ex: Carrefour, Pão de Açúcar, Extra"
                  {...register("market")}
                  className={styles.textInput}
                  autoFocus
                />
                {errors.market && (
                  <span className={styles.error}>{errors.market.message}</span>
                )}
              </div>
            </fieldset>

            <footer className={styles.buttonGroup}>
              <button
                type="button"
                className={`${styles.button} ${styles.cancelButton}`}
                onClick={handleClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={`${styles.button} ${styles.primaryButton}`}
              >
                Continuar
              </button>
            </footer>
          </>
        )}

        {currentStep === 2 && (
          <>
            <header className={styles.modalHeader}>
              <h1 className={styles.modalTitle}>Novo item</h1>
              <div className={styles.marketInfo}>
                <span className={styles.marketLabel}>Mercado:</span>
                <strong className={styles.marketName}>{selectedMarket}</strong>
                <button
                  type="button"
                  onClick={changeMarket}
                  className={styles.changeMarketButton}
                >
                  <i className="fa-solid fa-rotate-right"></i>
                  Trocar
                </button>
              </div>
            </header>

            <fieldset className={styles.fieldset}>
              <div className={styles.inputGroup}>
                <label htmlFor="product">Produto</label>
                <input
                  id="product"
                  type="text"
                  placeholder="Ex: Arroz, Leite, Tomate"
                  {...register("product")}
                  className={styles.textInput}
                  autoFocus
                />
                {errors.product && (
                  <span className={styles.error}>{errors.product.message}</span>
                )}
              </div>
            </fieldset>

            <div className={styles.row}>
              <div className={styles.quantityGroup}>
                <label htmlFor="quantity">Quantidade</label>
                <div className={styles.quantityControl}>
                  <button
                    type="button"
                    className={styles.quantityButton}
                    onClick={() => handleQuantityChange(-1)}
                    aria-label="Diminuir quantidade"
                  >
                    −
                  </button>
                  <span className={styles.quantityValue}>{quantityValue}</span>
                  <button
                    type="button"
                    className={styles.quantityButton}
                    onClick={() => handleQuantityChange(1)}
                    aria-label="Aumentar quantidade"
                  >
                    +
                  </button>
                </div>
                {errors.quantity && (
                  <span className={styles.error}>
                    {errors.quantity.message}
                  </span>
                )}
              </div>

              <div className={styles.priceGroup}>
                <label htmlFor="price">Preço (R$)</label>
                <input
                  id="price"
                  type="text"
                  placeholder="R$ 0,00"
                  className={styles.priceInput}
                  {...register("price")}
                  onChange={(e) => formatPriceInput(e.target.value, "price")}
                />
                {errors.price && (
                  <span className={styles.error}>{errors.price.message}</span>
                )}
              </div>
            </div>

            <footer className={styles.buttonGroup}>
              <button
                type="button"
                className={`${styles.button} ${styles.cancelButton}`}
                onClick={handleClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={`${styles.button} ${styles.primaryButton}`}
              >
                Adicionar Item
              </button>
            </footer>
          </>
        )}
      </form>
    </section>
  );
};

export default DraftModal;
