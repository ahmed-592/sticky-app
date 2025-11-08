
import { Navigate } from "react-router-dom";



export default function AuthProtectedRoute({children}) {
  
    const isLogged = localStorage.getItem("token");

  return !isLogged? children : <Navigate to={"/"}/>
}
