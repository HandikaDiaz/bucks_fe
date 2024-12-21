import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "../features/auth/form/login-form";
import RegisterForm from "../features/auth/form/register-form";
import AuthRouter from "./auth/auth-router";
import HomeRouter from "./home/home-router";
import HomePage from "../features/home/pages/home-page";
import AddProduct from "../features/home/pages/add-product";
import DetailProduct from "../features/home/pages/detail-product";
import Profile from "../features/home/pages/profile";

export function AppRouter() {
    const router = createBrowserRouter([
        {
            element: <AuthRouter />,
            children: [
                {
                    path: "register",
                    element: <RegisterForm />
                },
                {
                    path: "login",
                    element: <LoginForm />
                }
            ]
        },
        {
            element: <HomeRouter />,
            children: [
                {
                    index: true,
                    element: <HomePage />
                },
                {
                    path: "add-product",
                    element: <AddProduct />
                },
                {
                    path: "detail-product/:id",
                    element: <DetailProduct />
                },
                {
                    path: "profile",
                    element: <Profile />
                }
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}