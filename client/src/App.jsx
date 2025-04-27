import { useState } from "react";
import { Outlet } from "react-router-dom";
import LiveCustomIcon from "./components/LiveCustomIcon";
import SolidLiveCustomIcon from "./components/SolidLiveCustomIcon";
import usePageCacheManager from "./hooks/usePageCacheManager";

function App() {
    usePageCacheManager()
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
}

export default App;
