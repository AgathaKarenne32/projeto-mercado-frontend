import { createContext, useContext, useReducer, useEffect } from "react";
import { initialState, purchaseReducer } from "./purchaseReducer";
import { deletePurchase, getAll } from "../../services/nfceService";
import { toast } from "react-toastify";

const PurchaseContext = createContext();

export function PurchaseProvider({ children }) {
  const [state, dispatch] = useReducer(purchaseReducer, initialState);

  const fetchData = async () => {
    try {
      getAll().then(res => {
        const result = res.data.data;
        dispatch({ type: "GET_ALL", payload: (result != null ? result : []) })
      })
    } catch (err) {
      toast.error("Erro ao listar as compras")
      console.error(err.message)
    }
  }

  const deleteItem = async (accessKey) => {
    try {
      const response = await deletePurchase(accessKey)
      toast.success("Item deletado com sucesso")
      dispatch({ type: "DELETE_ITEM", payload: accessKey })
    } catch (err) {
      toast.error("Erro ao deletar o item")
      console.error(err.message)
    }
  }


  useEffect(() => {
    localStorage.setItem("purchases", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    fetchData()
  }, [])

  return <PurchaseContext.Provider value={{ state, dispatch, deleteItem }}>{children}</PurchaseContext.Provider>;
}

export function usePurchase() {
  return useContext(PurchaseContext);
}
