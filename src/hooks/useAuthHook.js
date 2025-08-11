import Axios from "../utils/Axios";

export const registerUser = async (userData) => {
    try {
        const response = await Axios.post("auth/register", userData);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await Axios.post("auth/login", credentials);
        return response.data;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
};
