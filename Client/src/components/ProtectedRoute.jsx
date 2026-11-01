import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, adminOnly }) => {
    const { isLoggedIn, isAdmin } = useAuth();

    // not logged in → send to login
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    // logged in but not admin on an admin page → send home
    if (adminOnly && !isAdmin) {
        return <Navigate to="/" replace />;
    }
    return children;
};
export default ProtectedRoute;
