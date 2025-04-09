import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
function Layout() {
    return (
        <div className="w-screen h-screen p-4 grid grid-cols-[400px_1fr] overflow-x-hidden">
            <Sidebar></Sidebar>
            <div></div>
            <Outlet></Outlet>
        </div>
    );
}

export default Layout;
