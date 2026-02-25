import { Navigate,Outlet} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedAuth() {
  const { user ,loading } = useAuth();
    // if (user) {
    //    return <Navigate to="/" replace />;
    // }
  // if (user) {
  //    return <Navigate to="/" replace />;
  // // return  navigate("/");
  // } else {
   return (<Outlet />); 
  
}