import React, { useState, useEffect } from "react";
import styles from "./EditDraftModal.module.css";
import { useDraft } from "../../contexts/DraftContext";
import { toast } from "react-toastify";

const EditDraftModal = ({ draft, onClose }) => {
  const { updateDraft } = useDraft();
  const [mercado, setMercado] = useState("");
  const [items, setItems] = useState([]);

  
  useEffect(() => {
    if (draft) {
      console.log('EU SOU O RASCUNHO QUE ESTA CHEGANDO', draft)
      setMercado(draft.mercado || "");

      try {
        const parsedItems =
          typeof draft.conteudo === "string"
            ? JSON.parse(draft.conteudo)
            : Array.isArray(draft.conteudo)
            ? draft.conteudo
            : [];
console.log('como esta dentro do modal', parsedItems)
        const normalizedItems = parsedItems.map((item) => {
          console.log('ITEM A SER ESTUDADO', item)
          let priceValue = item.preco || "0,00";
          if (typeof priceValue === "number") {
            priceValue = priceValue.toFixed(2).replace(".", ",");
          } else if (typeof priceValue === "string") {
            if (!priceValue.includes(",") && priceValue.includes(".")) {
              priceValue = priceValue.replace(".", ",");
            }
          }

          return {
            produto: item.produto || "",
            quantidade: item.quantidade || 1,
            preco: priceValue,
          };
        });

        setItems(normalizedItems);
        console.log('FINAL', normalizedItems)
      } catch (error) {
        console.error("Erro ao parsear conteúdo do rascunho:", error);
        setItems([]);
      }
    }
  }, [draft]);

  
  const formatPriceInput = (value, index) => {
    const numeric = value.replace(/\D/g, "");
    const formatted = (parseFloat(numeric) / 100).toFixed(2).replace(".", ",");
    const newItems = [...items];
    newItems[index].price = formatted;
    setItems(newItems);
  };

  
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  
  const handleQuantityChange = (index, increment) => {
    const newItems = [...items];
    const currentValue = parseInt(newItems[index].quantidade) || 0;
    newItems[index].quantidade = Math.max(1, currentValue + increment);
    setItems(newItems);
  };

 
  const handleAddItem = () => {
    setItems([...items, { produto: "", quantidade: 1, price: "0,00" }]);
  };

  
  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  
  const handleSave = async () => {
    if (!draft?.id) {
      toast.error("ID do rascunho não encontrado.");
      return;
    }

    try {
      const success = await updateDraft(draft.id, { mercado, conteudo: items });
      if (success) onClose();
    } catch (error) {
      console.error("Erro ao salvar edição:", error);
      toast.error("Erro ao salvar o rascunho.");
    }
  };

  if (!draft) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Editar Rascunho</h2>

        <label>Mercado:</label>
        <input
          type="text"
          value={mercado}
          onChange={(e) => setMercado(e.target.value)}
          placeholder="Nome do mercado"
        />

        <div className={styles.items}>
          <h3>Itens</h3>
          {items.map((item, index) => (
            <div key={index} className={styles.itemRow}>
              <input
                type="text"
                placeholder="Produto"
                value={item.produto}
                onChange={(e) => handleItemChange(index, "produto", e.target.value)}
              />

              <div className={styles.quantityContainer}>
                <button
                  type="button"
                  className={styles.quantityButton}
                  onClick={() => handleQuantityChange(index, -1)}
                  aria-label="Diminuir quantidade"
                >
                  -
                </button>
                <input
                  type="number"
                  placeholder="Qtd."
                  value={item.quantidade}
                  onChange={(e) =>
                    handleItemChange(index, "quantidade", Math.max(1, Number(e.target.value)))
                  }
                />
                <button
                  type="button"
                  className={styles.quantityButton}
                  onClick={() => handleQuantityChange(index, 1)}
                  aria-label="Aumentar quantidade"
                >
                  +
                </button>
              </div>

              <input
                type="text"
                placeholder="R$ 0,00"
                value={item.preco}
                onChange={(e) => formatPriceInput(e.target.value, index)}
              />

              <button
                onClick={() => handleRemoveItem(index)}
                className={styles.btnRemove}
                title="Remover item"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          ))}

          <button onClick={handleAddItem} className={styles.btnAdd}>
            + Adicionar Item
          </button>
        </div>

        <div className={styles.buttons}>
          <button onClick={handleSave} className={styles.btnSave}>
            Salvar
          </button>
          <button onClick={onClose} className={styles.btnCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDraftModal;
