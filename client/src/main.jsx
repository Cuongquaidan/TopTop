import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./router/index.jsx";
import { AppProvider } from "./context/AppContext.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ToastContainer></ToastContainer>
        <AppProvider>
        <RouterProvider router={router}></RouterProvider>
        </AppProvider>
    </StrictMode>
);
