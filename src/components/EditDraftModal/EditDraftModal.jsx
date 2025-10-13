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
      setMercado(draft.mercado || "");
      try {
        let parsedItems = [];
        if (typeof draft.conteudo === "string") {
          parsedItems = JSON.parse(draft.conteudo);
        } else if (Array.isArray(draft.conteudo)) {
          parsedItems = draft.conteudo;
        }
        // Garante que cada item tenha os campos corretos
        parsedItems = parsedItems.map((item) => ({
          produto: item.produto || item.name || "",
          quantidade: item.quantidade || 1,
          price: item.price || 0,
        }));
        setItems(parsedItems);
      } catch {
        setItems([]);
      }
    }
  }, [draft]);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, { produto: "", quantidade: 1, price: 0 }]);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      const conteudoJSON = JSON.stringify(items);
      const success = await updateDraft(draft.id, { mercado, conteudo: items });
      if (success) {
        toast.success("Rascunho salvo com sucesso!");
        onClose();
      }
    } catch {
      toast.error("Erro ao salvar rascunho.");
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
              <input
                type="number"
                placeholder="Quantidade"
                value={item.quantidade}
                onChange={(e) => handleItemChange(index, "quantidade", Number(e.target.value))}
              />
              <input
                type="number"
                placeholder="Preço"
                step="0.01"
                value={item.price}
                onChange={(e) => handleItemChange(index, "price", Number(e.target.value))}
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
