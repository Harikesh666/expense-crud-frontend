import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";

const ProtectedRoute = ({ children }) => {
    const { user } = useUser();
    const location = useLocation();

    if (!user?.id) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
