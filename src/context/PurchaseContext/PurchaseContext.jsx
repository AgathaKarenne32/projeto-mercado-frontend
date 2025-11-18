import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { initialState, purchaseReducer } from "./purchaseReducer";
import { deletePurchase, getAll } from "../../services/nfceService";
import { toast } from "react-toastify";

const PurchaseContext = createContext();

export function PurchaseProvider({ children }) {
  const [state, dispatch] = useReducer(purchaseReducer, initialState);

  const [totalItems, setTotalItems] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const [ticketMedio, setTicketMedio] = useState(0);

  // ============================
  // 🔥 SISTEMA DE MODAIS (COMPATÍVEL COM OS SEUS MODAIS)
  // ============================
  const [modal, setModal] = useState({
    open: false,
    mode: null, // "view" | "edit"
    id: null,
  });

  function openModal(mode, id) {
    setModal({ open: true, mode, id });
  }

  function closeModal() {
    setModal({ open: false, mode: null, id: null });
  }

  function getById(id) {
    return state.find((p) => p.accessKey === id);
  }

  // ============================
  // 🔥 FUNÇÕES EXISTENTES
  // ============================
  const fetchData = async () => {
    try {
      getAll().then((res) => {
        const result = res.data.data;
        const totalItems = res.data.page.totalElements;

        setTotalItems(totalItems);

        dispatch({ type: "GET_ALL", payload: result != null ? result : [] });
      });
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

  // ============================
  // 🔥 CÁLCULOS AUXILIARES
  // ============================
  useEffect(() => {
    localStorage.setItem("purchases", JSON.stringify(state));
    if (state != null && state.length > 0) {
      const total = state.reduce(
        (acc, item) => acc + Number(item.totalPrice || 0),
        0,
      );
      const ticket = total / state.length;

      setValorTotal(total.toFixed(2));
      setTicketMedio(ticket.toFixed(2));
    } else {
      setValorTotal("0.00");
      setTicketMedio("0.00");
    }
  }, [state]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PurchaseContext.Provider
      value={{
        state,
        dispatch,
        deleteItem,
        updateItem,
        totalItems,
        valorTotal,
        ticketMedio,

        // 🔥 EXPOSTO PARA OS MODAIS
        modal,
        openModal,
        closeModal,
        getById,
      }}
    >
      {children}
    </PurchaseContext.Provider>
  );
}

export function usePurchase() {
  return useContext(PurchaseContext);
}
