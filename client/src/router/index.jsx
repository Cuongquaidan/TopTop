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
import AdminRoute from "../components/admin/AdminRoute";
import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Posts from "../pages/admin/Posts";
import Reports from "../pages/admin/Reports";
import Profile from "../pages/Profile";
import FollowerProfile from "../pages/FollowerProfile";

const router = createBrowserRouter([
    {
        path: "/admin",
        element: <AdminRoute />,
        errorElement: <ErrorPage></ErrorPage>,
        children:[
            {
                path: "/admin/dashboard",
                element: <Dashboard></Dashboard>
            },
            {
                path: "/admin/users",
                element: <Users></Users>
            },{
                path: "/admin/posts",
                element: <Posts></Posts>
            },{
                path: "/admin/reports",
                element: <Reports></Reports>
            }
        ]
    },
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
                    },
                    {
                        path:'/profile',
                        element:<Profile/>
                    }
                    ,{
                        path:"/profile/:username",
                        element:<FollowerProfile></FollowerProfile>
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
