import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import ErrorPage from "../pages/ErrorPage";
import App from "../App";
import Home from "../pages/Home";
import PostItemDetails from "../pages/PostItemDetails";
import Explore from "../pages/Explore";
import Follow from "../pages/Follow";
import Friend from "../pages/Friend";
import Upload from "../pages/Upload";

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
                    {
                        path: "/explore",
                        element: <Explore></Explore>,
                    },
                    {
                        path:'/following',
                        element:<Follow/>
                    },
                    {
                        path:'/friends',
                        element:<Friend/>
                    },
                    {
                        path:'/upload',
                        element:<Upload/>
                    }
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
