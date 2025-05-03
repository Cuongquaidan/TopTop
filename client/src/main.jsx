import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./router/index.jsx";
import { AppProvider } from "./context/AppContext.jsx";
import { ToastContainer } from "react-toastify";
import {Provider} from "react-redux"
import  store  from "./redux/store.jsx";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './i18n';
const persistor = persistStore(store);
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <ToastContainer></ToastContainer>
        <AppProvider>
        <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>
        </AppProvider>
        </PersistGate>
        </Provider>
    </StrictMode>
);
