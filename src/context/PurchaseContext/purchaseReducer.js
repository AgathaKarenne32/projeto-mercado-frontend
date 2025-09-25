export const initialState = [];

export function purchaseReducer(state, action) {
  switch (action.type) {
    case "ADD_PURCHASE":
      return [...state, action.payload];

    case "DELETE_PURCHASE":
      return state.filter((purchase) => purchase.id !== action.payload);

    default:
      return state;
  }
}
