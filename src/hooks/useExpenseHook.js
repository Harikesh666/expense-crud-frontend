import Axios from "../utils/Axios";

export const addExpense = async (expenseData) => {
    try {
        const response = await Axios.post("/expense/add-expense", expenseData);
        return response.data;
    } catch (error) {
        console.error("Error adding expense:", error);
        throw error;
    }
};

export const getExpenses = async (id) => {
    try {
        const response = await Axios.get(`/expense/get-expenses/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching expenses:", error);
        throw error;
    }
};

export const editExpense = async (expenseId, expenseData) => {
    try {
        const response = await Axios.put(
            `/expense/edit-expense/${expenseId}`,
            expenseData
        );
        return response.data;
    } catch (error) {
        console.error("Error editing expense:", error);
        throw error;
    }
};

export const deleteExpense = async (expenseId) => {
    try {
        const response = await Axios.delete(
            `/expense/delete-expense/${expenseId}`
        );
        return response.data;
    } catch (error) {
        console.error("Error deleting expense:", error);
        throw error;
    }
};
