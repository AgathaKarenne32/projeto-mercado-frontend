import React, { createContext, useContext, useReducer, useEffect } from "react";
import { initialState, purchaseReducer } from "./purchaseReducer";
import { deletePurchase, getAll } from "../../services/nfceService";
import { toast } from "react-toastify";

const PurchaseContext = createContext();

export function PurchaseProvider({ children }) {
  const [state, dispatch] = useReducer(purchaseReducer, initialState);

  // Controle do modal
  const [modal, setModal] = React.useState({ open: false, mode: null, id: null });
  const openModal = (mode, id) => setModal({ open: true, mode, id });
  const closeModal = () => setModal({ open: false, mode: null, id: null });

  // Utilidades
  const getById = (accessKey) =>
    state.find((p) => String(p.accessKey) === String(accessKey));

  const fetchData = async () => {
    try {
      const res = await getAll();
      const result = res.data.data;
      dispatch({ type: "GET_ALL", payload: result ?? [] });
    } catch (err) {
      toast.error("Erro ao listar as compras");
      console.error(err.message);
    }
  };

  const deleteItem = async (accessKey) => {
    try {
      await deletePurchase(accessKey);
      toast.success("Item deletado com sucesso");
      dispatch({ type: "DELETE_ITEM", payload: accessKey });
    } catch (err) {
      toast.error("Erro ao deletar o item");
      console.error(err.message);
    }
  };

  const updateItem = async (accessKey, payload) => {
    try {
      dispatch({ type: "UPDATE_ITEM", accessKey, payload });
      toast.success("Compra Atualizada");
    } catch (err) {
      toast.error("Erro ao atualizar a compra");
      console.error(err.message);
    }
  };

  useEffect(() => {
    localStorage.setItem("purchases", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Aqui o retorno correto, com children
  return (
    <PurchaseContext.Provider
      value={{
        state,
        dispatch,
        deleteItem,
        getById,
        updateItem,
        modal,
        openModal,
        closeModal,
      }}
    >
      {children}
    </PurchaseContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePurchase() {
  return useContext(PurchaseContext);
}

