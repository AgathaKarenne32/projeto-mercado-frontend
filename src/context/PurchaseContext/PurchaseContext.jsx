import { createContext, useContext, useReducer, useEffect } from "react";
import { initialState, purchaseReducer } from "./purchaseReducer";
import { deletePurchase, getAll } from "../../services/nfceService";

const PurchaseContext = createContext();

export function PurchaseProvider({ children }) {
  /**
   * @version: backend-0.0.1
   * @typedef {Purchase}
   * @property {Purchase.store} storeName;
   * @property {Purchase.cnpj} storeCnpj;
   * @property {Purchase.address} {city, state};
   * @property {Purchase.date} yyyy-mm-dd;
   * @property {Purchase.accessKey} purchase ID;
   * @property {Purchase.totalPrice} totalPrice;
   * @property {Purchase.products} {};
   */
  const [state, dispatch] = useReducer(purchaseReducer, initialState);

  const fetchData = async () => {
    try {
      const response = await getAll();
      const result = await response.data.data;
      dispatch({type: "GET_ALL", payload: result})
    } catch (err) {
      console.error(err.message)
    }
  }

  const deleteItem = async (accessKey) => {
    try {
      const response = await deletePurchase(accessKey)
      /**
       * @todo verificar se foi um sucesso pra depois deletar o item
       */
      dispatch({type: "DELETE_ITEM", payload: accessKey})
    } catch (err) {
      console.error(err.message)
    }
  }


  useEffect(() => {
    console.log(state)
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
