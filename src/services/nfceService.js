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
  return api.post("/api/nfce/register-manual", data);
}

export async function deletePurchase(accessKey) {
  console.log(accessKey)
  const reqData = {
    accessKey: accessKey
  }
  console.log(reqData)
  return api.delete(`/api/nfce/delete`, 
    {
      data: reqData,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}

export async function getAll() {
  return api.get("/api/nfce/all")
}

export async function getAllMarkets() {
  console.log("veioaqui")
  return api.get("/api/mercado");
}

export async function getAllCatalogByMarketId(marketId) {
  return api.get(`/api/catalogo/${marketId}`)
}

