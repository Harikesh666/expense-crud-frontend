import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../hooks/useAuthHook";
import { useUser } from "../context/UserContext.jsx";

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .max(12, "Password must not exceed 12 characters")
        .required("Password is required"),
});

const initialValues = {
    name: "",
    password: "",
};

const Login = () => {
    const navigate = useNavigate();

    const { login } = useUser();

    const handleSubmit = async (values) => {
        const result = await loginUser(values);

        if (result.error) {
            return;
        }

        // console.log("Login API response:", result);

        if (result?.user && result?.user?.id) {
            localStorage.setItem("user", JSON.stringify(result?.user));
            localStorage.setItem("token", result?.token);
            login(result?.user, result?.token);
        }

        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-sm sm:max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-6">
                    Sign In
                </h2>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ touched, errors }) => (
                        <Form noValidate>
                            {/* Name Field */}
                            <div className="mb-4">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Name
                                </label>
                                <Field
                                    name="name"
                                    type="text"
                                    placeholder="Your name"
                                    className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                                        touched.name && errors.name
                                            ? "border-red-400 focus:ring-red-400"
                                            : "border-gray-300 focus:ring-teal-500"
                                    }`}
                                    aria-invalid={
                                        touched.name && errors.name
                                            ? "true"
                                            : "false"
                                    }
                                    aria-describedby="name-error"
                                />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    id="name-error"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>

                            {/* Password Field */}
                            <div className="mb-6">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Password
                                </label>
                                <Field
                                    name="password"
                                    type="password"
                                    placeholder="Your password"
                                    className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                                        touched.password && errors.password
                                            ? "border-red-400 focus:ring-red-400"
                                            : "border-gray-300 focus:ring-teal-500"
                                    }`}
                                    aria-invalid={
                                        touched.password && errors.password
                                            ? "true"
                                            : "false"
                                    }
                                    aria-describedby="password-error"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    id="password-error"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-teal-500 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-teal-600 transition-colors duration-200"
                            >
                                Sign In
                            </button>
                        </Form>
                    )}
                </Formik>

                {/* Register Link */}
                <p className="mt-4 text-center text-xs sm:text-sm text-gray-600">
                    Don&apos;t have an account?{" "}
                    <button
                        onClick={() => navigate("/register")}
                        className="text-teal-500 hover:text-teal-700 font-medium"
                    >
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
