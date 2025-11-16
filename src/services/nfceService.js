import { api } from "./api";

const exampleData = {
  store: "Açougue esquina",
  cnpj: "",
  address: {
    city: "gaurulhos",
    state: "SP",
  },
  date: "2025-10-03",
  accessKey: "123",
  totalPrice: 26.77,
  products: [
    {
      name: "Salsicha perdigao",
      code: "114",
      quantity: 0.3,
      unit: "kg",
      price: 14.99,
    },
    {
      name: "Bisteca da copa",
      code: "74",
      quantity: 1.006,
      unit: "kg",
      price: 21.99
    },
  ],
};

export async function registerManualPurchase(data) {
  return api.post("/api/nfces", data);
}

export async function deletePurchase(accessKey) {
  return api.delete(`/api/nfces/${accessKey}`, 
  )
}

export async function getAll() {
  return api.get("/api/nfces")
}

export async function getAllMarkets() {
  return api.get("/api/supermarkets");
}

export async function getAllCatalogByMarketId(marketId) {
  return api.get(`/api/catalogo/${marketId}`)
}

