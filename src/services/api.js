import axios from "axios";

const host = window.location.hostname;
export const api = axios.create({
  baseURL: `http://localhost:8080`,
  headers: { "Content-Type": "application/json" },
});

const refreshApi = axios.create({
  baseURL: `http://localhost:8080`,
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
let queue = [];

let isRedirecting = false;

const processQueue = (error, newToken) => {
  queue.forEach(({ resolve, reject }) =>
    error ? reject(error) : resolve(newToken)
  );
  queue = [];
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (config.url.includes("/auth/refresh-token")) return config;

    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const status = error.response?.status;

    if (
      status !== 401 ||
      original.url.includes("/auth/refresh-token") ||
      original.url.includes("/auth/login")
    ) {
      return Promise.reject(error);
    }

    if (status === 401 && !original._retry) {
      original._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        })
          .then((token) => {
            original.headers.Authorization = `Bearer ${token}`;
            return api(original);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const storedRefreshToken = localStorage.getItem("refreshToken");
        if (!storedRefreshToken) {
          throw new Error("No refresh token found");
        }

        const { data } = await refreshApi.post("/auth/refresh-token", {
          refreshToken: storedRefreshToken,
        });

        const newAccessToken = data.accessToken || data.token;
        const newRefreshToken = data.refreshToken || data.refreshTokenId;

        if (!newAccessToken || !newRefreshToken) {
          throw new Error("Invalid refresh token response");
        }

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        original.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(original);
      } catch (err) {
        processQueue(err, null);

        if (!isRedirecting) {
          isRedirecting = true;
          localStorage.clear();

          window.location.href = "/login";
        }

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
