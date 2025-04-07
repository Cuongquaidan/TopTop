import React from "react";
import { Link } from "react-router-dom";

function SidebarItem({ item, currentPathname, ...props }) {
    const isActive = currentPathname === item.href;
    console.log(item.href, location, isActive);
    return (
        <Link
            className={`${
                isActive && "text-primary bg-primary/20 "
            } p-2 rounded-lg hover:text-primary hover:bg-primary/20 transition-all w-[200px] font-semibold flex gap-2 items-center text-md`}
            {...props}
            to={item.href}
        >
            <div>{isActive ? item.iconActive : item.icon}</div>
            <p>{item.title}</p>
        </Link>
    );
}

export default SidebarItem;
