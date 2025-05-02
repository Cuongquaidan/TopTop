import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLikePostsByUserID, fetchSavePostsByUserID } from "./redux/features/userSlice";
import usePageCacheManager from "./hooks/usePageCacheManager";

function App() {
    usePageCacheManager();
    const user = useSelector((state) => state.user.user);
    const loading = useSelector((state) => state.user.loading); // lấy loading
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) return;
        const userId = user._id;
        dispatch(fetchLikePostsByUserID(userId));
        dispatch(fetchSavePostsByUserID(userId));
    }, [user, dispatch]);
    useEffect(()=>{
        if(localStorage.getItem("theme") === "dark"){
            document.documentElement.classList.add("dark");
        }else{
            document.documentElement.classList.remove("dark");
        }

    },[])


    return (
        <div className="relative min-h-screen">
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
            <Outlet />
        </div>
    );
}

export default App;
