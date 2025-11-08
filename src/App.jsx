import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainLayout from './Components/MainLayout';
import AuthLayout from './Components/AuthLayout';
import NotesPage from './Pages/NotesPage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ProtectedRoute from "./Components/ProtectedRoute";
import AuthProtectedRoute from "./Components/AuthProtectedRoute";


function App() {
  const router = createBrowserRouter([
    {
      path: "/", element: <MainLayout />, children: [
        { index: true, element: <ProtectedRoute><NotesPage /></ProtectedRoute> },

      ]
    },
    {
      path: "/", element: <AuthLayout />, children: [
        { path: "/login", element: <AuthProtectedRoute><Login /></AuthProtectedRoute> },
        { path: "/register", element: <AuthProtectedRoute><Register /> </AuthProtectedRoute> },
      ]
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
