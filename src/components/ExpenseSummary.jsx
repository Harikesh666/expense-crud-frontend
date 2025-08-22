import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// Color palette for pie charts
const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#8dd1e1",
    "#a4de6c",
    "#d0ed57",
    "#ffbb28",
    "#ff7f50",
    "#d8854f",
];

const ExpenseSummary = ({ expenses }) => {
    // console.log("================", expenses);
    // Total expenses
    const totalExpense = expenses.reduce(
        (acc, curr) => acc + Number(curr.amount),
        0
    );

    // Weekly total
    const currentWeekStart = new Date();
    currentWeekStart.setDate(
        currentWeekStart.getDate() - currentWeekStart.getDay()
    );

    const weekTotal = expenses
        .filter((e) => new Date(e.expense_date) >= currentWeekStart)
        .reduce((acc, curr) => acc + Number(curr.amount), 0);

    // Monthly total
    const currentMonth = new Date().getMonth();
    const monthTotal = expenses
        .filter((e) => new Date(e.expense_date).getMonth() === currentMonth)
        .reduce((acc, curr) => acc + Number(curr.amount), 0);

    // Pie chart data (Expenses by category)
    const pieData = Object.values(
        expenses.reduce((acc, curr) => {
            const category = curr.category || "Uncategorized";
            acc[category] = acc[category] || { name: category, value: 0 };
            acc[category].value += Number(curr.amount);
            return acc;
        }, {})
    );

    return (
        <div className="my-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <Card
                    title="Total Expenses"
                    amount={totalExpense}
                    color="text-blue-600"
                />
                <Card
                    title="This Week"
                    amount={weekTotal}
                    color="text-green-600"
                />
                <Card
                    title="This Month"
                    amount={monthTotal}
                    color="text-purple-600"
                />
            </div>

            {/* Pie Chart */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    Expenses by Category
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            labelLine={true}
                            label={({ name, value }) => `${name} (${value})`}
                        >
                            {pieData.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

// Card component for summary blocks
const Card = ({ title, amount, color }) => (
    <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className={`text-sm font-medium text-gray-600 mb-1`}>{title}</h3>
        <p className={`text-2xl font-semibold ${color}`}>
            ₹{amount.toFixed(2)}
        </p>
    </div>
);

export default ExpenseSummary;
