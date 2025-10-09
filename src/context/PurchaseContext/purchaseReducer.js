import { registerManualPurchase } from "../../services/nfceService";

export const initialState = [];

export function purchaseReducer(state, action) {
  switch (action.type) {
    case "ADD_PURCHASE":

      return [action.payload, ...state];

    case "DELETE_PURCHASE":
      return state.filter((purchase) => purchase.id !== action.payload);

    default:
      return state;

    case "GET_ALL":
      return [...action.payload];

    case "DELETE_ITEM":
      return state.filter((purchase) => purchase.accessKey !== action.payload);
  }
}
