import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useSmartPrefetch from "../../hooks/useSmartRefetch";
import { useTranslation } from "react-i18next";

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
    const {t} = useTranslation()
    return (
        <Link
            className={`${
                isActive && !showMore && !option ? "text-primary" : "dark:text-gray-200"
            } p-2 rounded-lg hover:text-primary transition-all w-[200px] font-semibold dark:font-semibold dark:hover:text-primary flex gap-2 items-center text-md`}
            {...props}
            to={item.href}
            onClick={() => {
                if (showMore) setShowMore(false);
                if (item.option) {
                        setOption("");
                }
            }}
            onMouseEnter={item.preloadUrl ? useSmartPrefetch(item.preloadUrl).onMouseEnter : ()=>{}}
        >
            <div>{isActive && !showMore && !option ? item.iconActive : item.icon}</div>
            <motion.p
                animate={{
                    opacity: showMore || option ? 0 : 1,
                }}
            >
                   {t(item.title)}
            </motion.p>
        </Link>
    );
}

export default SidebarItem;