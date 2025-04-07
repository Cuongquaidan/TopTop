import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
function Layout() {
    return (
        <div className="w-screen h-screen p-4 grid grid-cols-[240px_1fr]">
            <Sidebar></Sidebar>
            <Outlet></Outlet>
        </div>
    );
}

export default Layout;
