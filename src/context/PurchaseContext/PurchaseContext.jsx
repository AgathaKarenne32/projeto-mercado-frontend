import { createContext, useContext, useReducer, useEffect } from "react";
import { initialState, purchaseReducer } from "./purchaseReducer";

const PurchaseContext = createContext();

export function PurchaseProvider({ children }) {
  const [state, dispatch] = useReducer(purchaseReducer, initialState, () => {
    const stored = localStorage.getItem("purchases");
    return stored ? JSON.parse(stored) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("purchases", JSON.stringify(state));
  }, [state]);

  return <PurchaseContext.Provider value={{ state, dispatch }}>{children}</PurchaseContext.Provider>;
}

export function usePurchase() {
  return useContext(PurchaseContext);
}
