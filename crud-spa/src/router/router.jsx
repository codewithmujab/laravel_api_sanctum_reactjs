import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "../views/dashboard/Dashboard.jsx";
import DefaultLayout from "../components/DefaultLayout.jsx";
import GuestLayout from "../components/GuestLayout.jsx";
import Login from "../views/auth/Login.jsx";
import NotFound from "../views/error/NotFound.jsx";
import Signup from "../views/auth/Signup.jsx";
import Users from "../views/user/Users.jsx";
import UserForm from "../views/user/UserForm.jsx";
import ForgotPassword from "../views/auth/ForgotPassword.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/users" />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/users',
        element: <Users />
      },
      {
        path: '/users/new',
        element: <UserForm key="userCreate" />
      },
      {
        path: '/users/:id',
        element: <UserForm key="userUpdate" />
      }
    ]
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
])

export default router;
