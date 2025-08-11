import React, { useState, useEffect } from "react";
import { Trash2, Edit2 } from "lucide-react";

const ExpenseTable = ({ data, onEdit, onDelete, itemsPerPage = 5 }) => {
    const [sortedData, setSortedData] = useState([]);
    const [isAmountAsc, setIsAmountAsc] = useState(true);
    const [isDateAsc, setIsDateAsc] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setSortedData(data || []);
        setCurrentPage(1);
    }, [data]);

    const sortByAmount = () => {
        const sorted = [...sortedData].sort((a, b) =>
            isAmountAsc ? a.amount - b.amount : b.amount - a.amount
        );
        setSortedData(sorted);
        setIsAmountAsc(!isAmountAsc);
        setCurrentPage(1);
    };

    const sortByDate = () => {
        const sorted = [...sortedData].sort((a, b) =>
            isDateAsc
                ? new Date(a.expense_date) - new Date(b.expense_date)
                : new Date(b.expense_date) - new Date(a.expense_date)
        );
        setSortedData(sorted);
        setIsDateAsc(!isDateAsc);
        setCurrentPage(1);
    };

    // Pagination calculations
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = sortedData.slice(startIndex, endIndex);

    const goToPrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    if (!sortedData || sortedData.length === 0) {
        return (
            <div className="text-center text-gray-600 py-8 bg-gray-50 rounded-lg">
                <p className="text-base font-medium">No expenses found</p>
                <p className="text-xs text-gray-400 mt-2">
                    Add a new expense to start
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            {/* Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                onClick={sortByAmount}
                                className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100 transition-colors"
                            >
                                Amount {isAmountAsc ? "↑" : "↓"}
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                Category
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                Description
                            </th>
                            <th
                                onClick={sortByDate}
                                className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100 transition-colors"
                            >
                                Date {isDateAsc ? "↑" : "↓"}
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {currentData.map((expense) => (
                            <tr
                                key={expense.id}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                <td className="px-4 py-3 font-medium">
                                    ₹{expense.amount}
                                </td>
                                <td className="px-4 py-3">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-200 text-teal-800">
                                        {expense.category}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-gray-700">
                                    {expense.description}
                                </td>
                                <td className="px-4 py-3 text-gray-600">
                                    {new Date(
                                        expense.expense_date
                                    ).toLocaleDateString("en-GB")}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <button
                                        onClick={() => onEdit(expense)}
                                        className="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded"
                                        title="Edit expense"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(expense.id)}
                                        className="ml-3 text-red-600 hover:text-red-800 transition-colors p-1 rounded"
                                        title="Delete expense"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile view - cards */}
            <div className="md:hidden divide-y divide-gray-100">
                {currentData.map((expense) => (
                    <div
                        key={expense.id}
                        className="p-4 hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-lg font-semibold text-gray-900">
                                ₹{expense.amount}
                            </span>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => onEdit(expense)}
                                    className="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded"
                                    title="Edit expense"
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button
                                    onClick={() => onDelete(expense.id)}
                                    className="text-red-600 hover:text-red-800 transition-colors p-1 rounded"
                                    title="Delete expense"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">
                                    Category:
                                </span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-200 text-teal-800">
                                    {expense.category}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">
                                    Description:
                                </span>
                                <span className="text-sm text-gray-900">
                                    {expense.description}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">
                                    Date:
                                </span>
                                <span className="text-sm text-gray-900">
                                    {new Date(
                                        expense.expense_date
                                    ).toLocaleDateString("en-GB")}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                    {/* Desktop layout */}
                    <div className="hidden sm:flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                            Showing {startIndex + 1} to{" "}
                            {Math.min(endIndex, sortedData.length)} of{" "}
                            {sortedData.length} results
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={goToPrevious}
                                disabled={currentPage === 1}
                                className="px-3 py-1 rounded text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white disabled:text-gray-400 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
                            >
                                Previous
                            </button>
                            <span className="text-sm text-gray-600">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={goToNext}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 rounded text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white disabled:text-gray-400 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </div>

                    {/* Mobile layout */}
                    <div className="sm:hidden space-y-3">
                        <div className="text-sm text-gray-600 text-center">
                            Showing {startIndex + 1} to{" "}
                            {Math.min(endIndex, sortedData.length)} of{" "}
                            {sortedData.length} results
                        </div>
                        <div className="flex items-center justify-center space-x-4">
                            <button
                                onClick={goToPrevious}
                                disabled={currentPage === 1}
                                className="px-4 py-2 rounded text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white disabled:text-gray-400 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors border border-gray-300"
                            >
                                Previous
                            </button>
                            <span className="text-sm text-gray-600 font-medium">
                                {currentPage} / {totalPages}
                            </span>
                            <button
                                onClick={goToNext}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 rounded text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white disabled:text-gray-400 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors border border-gray-300"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExpenseTable;
