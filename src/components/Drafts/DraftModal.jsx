import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./DraftModal.module.css";
import { useDraft } from "../../contexts/DraftContext";
import { useModal } from "../../contexts/ModalContext";

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
            timestamp: new Date().toISOString()
        };

        addItem(itemData);


        const currentDraftItems = JSON.parse(localStorage.getItem("draftItems") || "[]");
        const updatedDraftItems = [...currentDraftItems, itemData];
        localStorage.setItem("draftItems", JSON.stringify(updatedDraftItems));


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


    const handleCreateNewDraft = () => {
        clearDraft();
        localStorage.removeItem("currentMarket");
        localStorage.removeItem("draftItems");
        setSelectedMarket("");
        setValue("market", "");
        setValue("product", "");
        setValue("quantity", 1);
        setValue("price", "");
        setCurrentStep(1);
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


                {currentStep === 2 && (
                    <button
                        type="button"
                        onClick={handleCreateNewDraft}
                        style={{
                            position: "absolute",
                            top: "16px",
                            right: "50px",
                            padding: "4px 12px",
                            fontSize: "12px",
                            cursor: "pointer",
                            background: "#f0f0f0",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    >
                        Novo Rascunho
                    </button>
                )}


                {currentStep === 1 && (
                    <>
                        <header className={styles.modalHeader}>
                            <h1 className={styles.modalTitle}>Selecione o Mercado</h1>
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
                                    {...register("market", { required: "campo obrigatório *" })}
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
                                className={`${styles.button} ${styles.compareButton}`}
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
                            <p className={styles.modalDescription}>
                                Mercado: <strong>{selectedMarket}</strong>
                                <button
                                    type="button"
                                    onClick={changeMarket}
                                    style={{
                                        marginLeft: "8px",
                                        padding: "2px 8px",
                                        fontSize: "12px",
                                        cursor: "pointer",
                                        background: "none",
                                        border: "1px solid #ccc",
                                        borderRadius: "4px",
                                    }}
                                >
                                    Trocar
                                </button>
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
                                    autoFocus
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
                                onClick={handleClose}
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
                    </>
                )}
            </form>
        </section>
    );
};

export default DraftModal;