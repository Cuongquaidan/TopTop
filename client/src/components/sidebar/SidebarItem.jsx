import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
function SidebarItem({
    item,
    currentPathname,
    showMore,
    setShowMore,
    ...props
}) {
    const isActive = currentPathname === item.href;
    return (
        <Link
            className={`${
                isActive && !showMore && "text-primary bg-primary/20 "
            } p-2 rounded-lg hover:text-primary transition-all w-[200px] font-semibold flex gap-2 items-center text-md`}
            {...props}
            to={item.href}
            onClick={() => {
                if (showMore) setShowMore(false);
            }}
        >
            <div>{isActive && !showMore ? item.iconActive : item.icon}</div>
            <motion.p
                animate={{
                    opacity: showMore ? 0 : 1,
                }}
            >
                {item.title}
            </motion.p>
        </Link>
    );
}

export default SidebarItem;
