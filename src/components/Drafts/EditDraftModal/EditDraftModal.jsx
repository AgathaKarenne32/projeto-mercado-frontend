import React, { useEffect } from "react";
import styles from "./EditDraftModal.module.css";
import { useDraft } from "../../../contexts/DraftContext";
import { toast } from "react-toastify";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const itemSchema = z.object({
  product: z.string().min(1, "O nome do produto é obrigatório"),
  quantity: z
    .number({ invalid_type_error: "Quantidade deve ser um número" })
    .min(1, "Quantidade deve ser maior que zero"),
  price: z
    .string()
    .regex(/^[0-9]+(,[0-9]{2})?$/, "Preço inválido (ex: 12,50)")
    .refine((val) => val !== "0,00" && val !== "0", {
      message: "O preço não pode ser 0,00",
    }),
});

const draftSchema = z.object({
  mercado: z.string().min(1, "O nome do mercado é obrigatório"),
  items: z.array(itemSchema).min(1, "Adicione pelo menos um item"),
});

const EditDraftModal = ({ draft, onClose }) => {
  const { updateDraft } = useDraft();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(draftSchema),
    defaultValues: {
      mercado: "",
      items: [{ product: "", quantity: 1, price: "0,00" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const items = watch("items");

  useEffect(() => {
    if (draft) {
      setValue("mercado", draft.mercado || "");
      try {
        const parsed =
          typeof draft.conteudo === "string"
            ? JSON.parse(draft.conteudo)
            : draft.conteudo || [];
        const normalized = parsed.map((item) => ({
          product: item.product || "",
          quantity: Number(item.quantity) || 1,
          price:
            typeof item.price === "number"
              ? item.price.toFixed(2).replace(".", ",")
              : item.price || "0,00",
        }));
        setValue("items", normalized);
      } catch {
        setValue("items", []);
      }
    }
  }, [draft, setValue]);

  const formatPriceInput = (value, index) => {
    const numeric = value.replace(/\D/g, "");
    const formatted = (parseFloat(numeric || 0) / 100)
      .toFixed(2)
      .replace(".", ",");
    setValue(`items.${index}.price`, formatted);
  };

  const handleQuantityChange = (index, increment) => {
    const currentQuantity = items[index]?.quantity || 1;
    const newQuantity = Math.max(1, currentQuantity + increment);
    setValue(`items.${index}.quantity`, newQuantity);
  };

  const onSubmit = async (data) => {
    try {
      const success = await updateDraft(draft.id, {
        mercado: data.mercado,
        conteudo: data.items,
      });
      if (success) onClose();
    } catch {
      toast.error("Erro ao salvar o rascunho.");
    }
  };

  if (!draft) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Editar Rascunho</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Nome do mercado</h3>
            <div className={styles.inputGroup}>
              <input
                {...register("mercado")}
                placeholder="Digite o nome do mercado"
                className={errors.mercado ? styles.errorInput : ""}
              />
              {errors.mercado && (
                <p className={styles.error}>{errors.mercado.message}</p>
              )}
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Itens</h3>

            {fields.map((item, index) => (
              <div key={item.id} className={styles.itemRow}>
                <div className={`${styles.inputGroup} ${styles.productInput}`}>
                  <label htmlFor={`product-${index}`}>Produto</label>
                  <input
                    id={`product-${index}`}
                    {...register(`items.${index}.product`)}
                    placeholder="Nome do produto"
                    className={
                      errors.items?.[index]?.product ? styles.errorInput : ""
                    }
                  />
                  {errors.items?.[index]?.product && (
                    <p className={styles.error}>
                      {errors.items[index].product.message}
                    </p>
                  )}
                </div>

                <div className={`${styles.inputGroup} ${styles.quantityGroup}`}>
                  <label>Quantidade</label>
                  <div className={styles.quantityControl}>
                    <button
                      type="button"
                      className={styles.quantityButton}
                      onClick={() => handleQuantityChange(index, -1)}
                      aria-label="Diminuir quantidade"
                    >
                      −
                    </button>
                    <span className={styles.quantityValue}>
                      {items[index]?.quantity || 1}
                    </span>
                    <button
                      type="button"
                      className={styles.quantityButton}
                      onClick={() => handleQuantityChange(index, 1)}
                      aria-label="Aumentar quantidade"
                    >
                      +
                    </button>
                  </div>
                  {errors.items?.[index]?.quantity && (
                    <p className={styles.error}>
                      {errors.items[index].quantity.message}
                    </p>
                  )}
                </div>

                <div className={`${styles.inputGroup} ${styles.priceGroup}`}>
                  <label htmlFor={`price-${index}`}>Preço (R$)</label>
                  <input
                    id={`price-${index}`}
                    {...register(`items.${index}.price`)}
                    placeholder="R$ 0,00"
                    value={items[index]?.price || ""}
                    onChange={(e) => formatPriceInput(e.target.value, index)}
                    className={
                      errors.items?.[index]?.price ? styles.errorInput : ""
                    }
                  />
                  {errors.items?.[index]?.price && (
                    <p className={styles.error}>
                      {errors.items[index].price.message}
                    </p>
                  )}
                </div>

                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className={styles.btnRemove}
                    aria-label="Remover item"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                append({ product: "", quantity: 1, price: "0,00" })
              }
              className={styles.btnAdd}
            >
              + Adicionar Item
            </button>
          </div>

          {/* Botões de Ação */}
          <div className={styles.buttons}>
            <button
              type="button"
              onClick={onClose}
              className={styles.btnCancel}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.btnSave}>
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDraftModal;
