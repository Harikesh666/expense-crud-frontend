import axios from "axios";

const Axios = axios.create({
    // baseURL: "http://localhost:3000",
    baseURL: "https://expense-crud-backend.onrender.com/",
    headers: {
        "Content-Type": "application/json",
    },
});

Axios.interceptors.request.use((config) => {
    const authData = localStorage.getItem("authData");
    const token = authData ? JSON.parse(authData)?.token : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default Axios;
