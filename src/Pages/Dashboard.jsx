import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CreateModal from "../components/CreateModal";
import EditModal from "../components/EditModal";
import ExpenseTable from "../components/ExpenseTable";
import ExpenseSummary from "../components/ExpenseSummary";
import {
    getExpenses,
    deleteExpense,
    editExpense,
    addExpense,
} from "../hooks/useExpenseHook";
import { useUser } from "../context/UserContext";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const { user, logout } = useUser();
    const navigate = useNavigate();

    // const userId = localStorage.getItem("userId");
    const userId = user?.id;
    const queryClient = useQueryClient();

    // Fetch expenses
    const {
        data: expenses = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["expenses", userId],
        queryFn: () => getExpenses(userId).then((res) => res.expenses || []),
    });

    // Mutations
    const addExpenseMutation = useMutation({
        mutationFn: (expense) => addExpense({ ...expense, user_id: userId }),
        onSuccess: () => {
            queryClient.invalidateQueries(["expenses", userId]);
            setShowModal(false);
        },
    });

    const editExpenseMutation = useMutation({
        mutationFn: ({ id, ...expenseData }) => editExpense(id, expenseData),
        onSuccess: () => {
            queryClient.invalidateQueries(["expenses", userId]);
            setShowEditModal(false);
            setSelectedExpense(null);
        },
    });

    const deleteExpenseMutation = useMutation({
        mutationFn: (id) => deleteExpense(id),
        onSuccess: () => {
            queryClient.invalidateQueries(["expenses", userId]);
        },
    });

    // Handlers
    const handleAddExpense = (expense) => addExpenseMutation.mutate(expense);
    const handleEditExpense = (expense) => editExpenseMutation.mutate(expense);
    const handleDeleteExpense = (id) => deleteExpenseMutation.mutate(id);

    const handleEditClick = (expense) => {
        setSelectedExpense(expense);
        setShowEditModal(true);
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Expenses
                        </h1>
                        <p className="text-gray-500 mt-1 text-sm">
                            Manage your expenses with ease.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-teal-500 text-white px-5 py-2.5 rounded-full hover:bg-teal-600 transition-colors duration-200 shadow-sm hover:shadow-md w-full sm:w-auto text-sm font-medium"
                    >
                        Add Expense
                    </button>
                </div>

                <CreateModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onSubmit={handleAddExpense}
                />

                <EditModal
                    isOpen={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    onSubmit={handleEditExpense}
                    initialData={selectedExpense}
                />

                {expenses.length > 0 ? (
                    <>
                        {/* Analytics/Summary first */}
                        <div className="mb-8">
                            <ExpenseSummary expenses={expenses} />
                        </div>

                        {/* Detailed table below */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Expense Details
                            </h2>
                            <ExpenseTable
                                data={expenses}
                                onEdit={handleEditClick}
                                onDelete={handleDeleteExpense}
                            />
                        </div>
                    </>
                ) : (
                    /* No data */
                    <div className="text-center py-12">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg
                                className="w-12 h-12 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01m3 0h.01M9 11h.01m3 0h.01m3 0h.01M20 7l-2 1m2-1l-2-1m2 1v2.4M20 7V5.6C20 5.26863 19.7314 5 19.4 5H4.6C4.26863 5 4 5.26863 4 5.6v10.8C4 16.7314 4.26863 17 4.6 17h7.4"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No expenses yet
                        </h3>
                        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                            Start tracking your expenses by adding your first
                            expense. You'll see summaries and analytics here
                            once you have some data.
                        </p>
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-teal-500 text-white px-6 py-3 rounded-full hover:bg-teal-600 transition-colors duration-200 shadow-sm hover:shadow-md font-medium"
                        >
                            Add Your First Expense
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
