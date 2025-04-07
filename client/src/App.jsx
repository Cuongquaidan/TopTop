import { useState } from "react";
import { Outlet } from "react-router-dom";
import LiveCustomIcon from "./components/LiveCustomIcon";
import SolidLiveCustomIcon from "./components/SolidLiveCustomIcon";

function App() {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
}

export default App;
