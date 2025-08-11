import { Suspense, lazy } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";
import ProtectedRoute from "../routes/ProtectedRoute.jsx";
import { LoadingSpinner } from "../components/LoadingSpinner.jsx";

const Login = lazy(() => import("../Pages/Login"));
const Register = lazy(() => import("../Pages/Register"));
const Dashboard = lazy(() => import("../Pages/Dashboard"));

const Navigation = () => {
    const { user } = useUser();
    const userId = user?.id;

    return (
        <Router>
            <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            userId ? (
                                <Navigate to="/dashboard" replace />
                            ) : (
                                <Login />
                            )
                        }
                    />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default Navigation;
