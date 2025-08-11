import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../hooks/useAuthHook";

const validationSchema = Yup.object({
    name: Yup.string()
        .required("Name is required")
        .min(2, "Name must be at least 2 characters"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .max(12, "Password cannot exceed 12 characters")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
});

const initialValues = {
    name: "",
    password: "",
    confirmPassword: "",
};

const Register = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        const result = await registerUser(values);
        if (result) {
            navigate("/");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-sm sm:max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8">
                <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-6">
                    Create Account
                </h1>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form noValidate>
                            {/* Name */}
                            <div className="mb-4">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Name
                                </label>
                                <Field
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Your name"
                                    autoComplete="name"
                                    className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                                        touched.name && errors.name
                                            ? "border-red-400 focus:ring-red-400"
                                            : "border-gray-300 focus:ring-teal-500"
                                    }`}
                                />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    id="name-error"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-4">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Password
                                </label>
                                <Field
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Your password"
                                    autoComplete="new-password"
                                    maxLength={12}
                                    className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                                        touched.password && errors.password
                                            ? "border-red-400 focus:ring-red-400"
                                            : "border-gray-300 focus:ring-teal-500"
                                    }`}
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    id="password-error"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className="mb-6">
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Confirm Password
                                </label>
                                <Field
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm password"
                                    autoComplete="new-password"
                                    maxLength={12}
                                    className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                                        touched.confirmPassword &&
                                        errors.confirmPassword
                                            ? "border-red-400 focus:ring-red-400"
                                            : "border-gray-300 focus:ring-teal-500"
                                    }`}
                                />
                                <ErrorMessage
                                    name="confirmPassword"
                                    component="div"
                                    id="confirmPassword-error"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-teal-500 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-teal-600 transition-colors duration-200"
                            >
                                Register
                            </button>
                        </Form>
                    )}
                </Formik>

                {/* Login Link */}
                <p className="mt-4 text-center text-xs sm:text-sm text-gray-600">
                    Already have an account?{" "}
                    <button
                        onClick={() => navigate("/")}
                        className="text-teal-500 hover:text-teal-700 font-medium"
                    >
                        Sign in
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Register;
