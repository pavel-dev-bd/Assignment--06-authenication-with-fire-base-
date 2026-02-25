import { Navigate, Outlet} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  // const navigate = useNavigate();
  if (!user) {
    // navigate("/login");
    return <Navigate to="/login" replace />;
  }
  return <Outlet/>;
}