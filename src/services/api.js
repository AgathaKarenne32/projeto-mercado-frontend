import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
})


api.interceptors.request.use(
    (config) => {
        try {
            const token = localStorage.getItem("accessToken");
            if (token) {
                if (!config.headers) config.headers = {}
                config.headers.Authorization = `Bearer ${token}`
            }
        } catch (e) {

            console.warn("api: could not read accessToken from localStorage", e)
        }
        return config
    },
    (error) => Promise.reject(error)
)


api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err && err.response && err.response.status === 401) {
            console.warn("api: received 401 response", err.response && err.response.data)
        }
        return Promise.reject(err)
    }
)

