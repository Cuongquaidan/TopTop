import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
function SidebarItem({
    item,
    currentPathname,
    showMore,
    setShowMore,
    option,
    setOption,
    ...props
}) {
    const isActive = currentPathname === item.href;
    return (
        <Link
            className={`${
                isActive && !showMore && !option && "text-primary "
            } p-2 rounded-lg hover:text-primary transition-all w-[200px] font-semibold flex gap-2 items-center text-md`}
            {...props}
            to={item.href}
            onClick={() => {
                if (showMore) setShowMore(false);
                if (item.option) {
                        setOption("");
               
                }
            }}
        >
            <div>{isActive && !showMore && !option ? item.iconActive : item.icon}</div>
            <motion.p
                animate={{
                    opacity: showMore || option ? 0 : 1,
                }}
            >
                {item.title}
            </motion.p>
        </Link>
    );
}

export default SidebarItem;
