import { useForm } from "react-hook-form";
import styles from "./DraftModal.module.css";
import { useDraft } from "../../contexts/DraftContext";
import { useModal } from "../../contexts/ModalContext";

const DraftModal = () => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            product: "",
            quantity: 1,
            price: "",
        },
    });

    const { addItem } = useDraft();
    const quantityValue = watch("quantity");

    const { closeDraftModal } = useModal();

    const formatPriceInput = (value, field) => {
        const numeric = value.replace(/\D/g, "");
        const formatted = (parseFloat(numeric) / 100)
            .toFixed(2)
            .replace(".", ",");
        setValue(field, formatted);
    };

    const handleQuantityChange = (increment) => {
        const currentValue = parseInt(quantityValue) || 0;
        const newValue = Math.max(1, currentValue + increment);
        setValue("quantity", newValue);
    };

    const saveDraftItem = (data) => {
        addItem(data);
        reset();
        if (typeof closeDraftModal === "function") closeDraftModal();
    };
    const onClear = () => {
        reset();
    };

    return (
        <section className={styles.modalOverlay} role="dialog" aria-modal="true">
            <form className={styles.modalBox} onSubmit={handleSubmit(saveDraftItem)}>
                <button
                    type="button"
                    className={styles.closeButton}
                    onClick={() => {
                        if (typeof closeDraftModal === "function") closeDraftModal();
                    }}
                    aria-label="Fechar modal"
                >
                    ×
                </button>

                <header className={styles.modalHeader}>
                    <h1 className={styles.modalTitle}>Novo item</h1>
                    <p className={styles.modalDescription}>
                        Adicione o item de compra enquanto está no mercado.
                    </p>
                </header>

                <fieldset className={styles.fieldset}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="product">Produto</label>
                        <input
                            id="product"
                            type="text"
                            placeholder="Ex: Arroz, Leite, Tomate"
                            {...register("product", { required: "campo obrigatório *" })}
                            className={styles.textInput}
                        />
                        {errors.product && (
                            <span className={styles.error}>{errors.product.message}</span>
                        )}
                    </div>
                </fieldset>

                <fieldset className={styles.fieldset}>
                    <div className={styles.inputGroupQuantity}>
                        <label htmlFor="quantity">Quantidade</label>
                        <div className={styles.quantityContainer}>
                            <button
                                type="button"
                                className={styles.quantityButton}
                                onClick={() => handleQuantityChange(-1)}
                                aria-label="Diminuir quantidade"
                            >
                                -
                            </button>

                            <input
                                id="quantity"
                                type="number"
                                className={`${styles.textInput} ${styles.quantityInput}`}
                                {...register("quantity", {
                                    required: "campo obrigatório *",
                                    min: { value: 1, message: "Valor mínimo é 1" },
                                    valueAsNumber: true,
                                })}
                                value={quantityValue}
                                onChange={(e) =>
                                    setValue("quantity", Math.max(1, Number(e.target.value)))
                                }
                            />

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
                            <span className={styles.error}>{errors.quantity.message}</span>
                        )}
                    </div>

                    <div className={styles.inputGroupPrice}>
                        <label htmlFor="price">Preço (R$)</label>
                        <input
                            id="price"
                            type="text"
                            placeholder="R$ 0,00"
                            className={styles.textInputPrice}
                            {...register("price", {
                                required: "campo obrigatório *",
                            })}
                            onChange={(e) => formatPriceInput(e.target.value, "price")}
                        />
                        {errors.price && (
                            <span className={styles.error}>{errors.price.message}</span>
                        )}
                    </div>
                </fieldset>

                <footer className={styles.buttonGroup}>
                    <button
                        type="button"
                        className={`${styles.button} ${styles.cancelButton}`}
                        onClick={() => {
                            onClear();
                            if (typeof closeDraftModal === "function") closeDraftModal();
                        }}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className={`${styles.button} ${styles.compareButton}`}

                    >
                        Salvar
                    </button>
                </footer>
            </form>
        </section>
    );
};

export default DraftModal;
