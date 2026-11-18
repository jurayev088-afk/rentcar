import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // .env.local faylidagi manzil
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
console.log("BASE URL:", api.defaults.baseURL);

// So'rov ketishidan oldin tokenni biriktirish
api.interceptors.request.use(
  (config) => {
    // Next.js da window/localStorage faqat browser muhitida mavjud
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("bizdaAccessTokin");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Serverdan javob kelganda xatolikni ushlash
api.interceptors.response.use(
  (response) => response,
  async (err) => {
    if (err.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("bizdaAccessTokin");
        localStorage.removeItem("bizdaRefreshTokin");
      }
    }
    return Promise.reject(err);
  }
);

export default api;