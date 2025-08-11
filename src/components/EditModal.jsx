import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditModal = ({ isOpen, onClose, onSubmit, initialData }) => {
    if (!isOpen || !initialData) return null;

    const validationSchema = Yup.object({
        amount: Yup.number()
            .required("Amount is required")
            .positive("Amount must be positive"),
        category: Yup.string().required("Category is required"),
        description: Yup.string().required("Description is required"),
        date: Yup.date().required("Date is required"),
    });

    // Helper function to convert ISO timestamp to YYYY-MM-DD format
    const formatDate = (isoDate) => {
        if (!isoDate) return "";
        const date = new Date(isoDate);
        return date.toISOString().split("T")[0];
    };

    const initialValues = {
        id: initialData?.id || "",
        amount: initialData?.amount || "",
        category: initialData?.category || "",
        description: initialData?.description || "",
        date: formatDate(initialData?.expense_date) || "",
    };

    const handleSubmit = (values) => {
        onSubmit({ ...initialData, ...values });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-sm sm:max-w-md p-5 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-5 text-center">
                    Edit Expense
                </h2>

                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form>
                            {/* Amount */}
                            <div className="mb-4">
                                <label
                                    htmlFor="amount"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Amount
                                </label>
                                <Field
                                    name="amount"
                                    type="number"
                                    step="0.01"
                                    placeholder="Enter amount"
                                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                                        touched.amount && errors.amount
                                            ? "border-red-400 focus:ring-red-400"
                                            : "border-gray-300 focus:ring-teal-500"
                                    }`}
                                />
                                <ErrorMessage
                                    name="amount"
                                    component="div"
                                    id="amount-error"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>

                            {/* Category */}
                            <div className="mb-4">
                                <label
                                    htmlFor="category"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Category
                                </label>
                                <Field
                                    name="category"
                                    as="select"
                                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                                        touched.category && errors.category
                                            ? "border-red-400 focus:ring-red-400"
                                            : "border-gray-300 focus:ring-teal-500"
                                    }`}
                                >
                                    <option value="">Select category</option>
                                    <option value="Food">Food</option>
                                    <option value="Transport">Transport</option>
                                    <option value="Utilities">Utilities</option>
                                    <option value="Entertainment">
                                        Entertainment
                                    </option>
                                    <option value="Shopping">Shopping</option>
                                    <option value="Healthcare">
                                        Healthcare
                                    </option>
                                    <option value="Education">Education</option>
                                    <option value="Others">Others</option>
                                </Field>
                                <ErrorMessage
                                    name="category"
                                    component="div"
                                    id="category-error"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>

                            {/* Description */}
                            <div className="mb-4">
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Description
                                </label>
                                <Field
                                    name="description"
                                    as="textarea"
                                    rows="3"
                                    placeholder="Enter description"
                                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none ${
                                        touched.description &&
                                        errors.description
                                            ? "border-red-400 focus:ring-red-400"
                                            : "border-gray-300 focus:ring-teal-500"
                                    }`}
                                />
                                <ErrorMessage
                                    name="description"
                                    component="div"
                                    id="description-error"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>

                            {/* Date */}
                            <div className="mb-6">
                                <label
                                    htmlFor="date"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Date
                                </label>
                                <Field
                                    name="date"
                                    type="date"
                                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                                        touched.date && errors.date
                                            ? "border-red-400 focus:ring-red-400"
                                            : "border-gray-300 focus:ring-teal-500"
                                    }`}
                                />
                                <ErrorMessage
                                    name="date"
                                    component="div"
                                    id="date-error"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default EditModal;
