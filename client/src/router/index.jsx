import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import ErrorPage from "../pages/ErrorPage";
import App from "../App";
import Home from "../pages/Home";
import PostItemDetails from "../pages/PostItemDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                element: <Layout></Layout>,
                children: [
                    {
                        path: "/",
                        element: <Home></Home>,
                    },
                ],
            },
            {
                path: "/posts/:id",
                element: <PostItemDetails></PostItemDetails>,
            },
        ],
    },
]);

export default router;
