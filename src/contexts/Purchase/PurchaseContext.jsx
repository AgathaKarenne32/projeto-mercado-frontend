import { createContext, useContext, useReducer } from "react";
import { initialState, purchaseReducer } from "./purchaseReducer";

const PurchaseContext = createContext();

export function PurchaseProvider({ children }) {
  const [state, dispatch] = useReducer(purchaseReducer, initialState);

  return <PurchaseContext.Provider value={{ state, dispatch }}>{children}</PurchaseContext.Provider>;
}

export function usePurchase() {
  return useContext(PurchaseContext);
}
