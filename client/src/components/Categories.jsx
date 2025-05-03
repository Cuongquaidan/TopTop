import React, { useEffect, useRef, useState } from "react";
import categories from "../data/Categories";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";

function Categories() {
    const [currentCategory, setCurrentCategory] = useState(categories[0]);
    const ref = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const checkScroll = () => {
        const el = ref.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
    };

    useEffect(() => {
        checkScroll();
    }, []);

    return (
        <div className="w-full">
            <div
                className="flex w-[100%] overflow-x-scroll hidden-scroll-bar mt-5 transition-all"
                ref={ref}
            >
                {categories.map((item, index) => (
                    <button
                        className={`text-md font-semibold p-3 mr-3 shrink-0 cursor-pointer rounded-md ${
                            item !== currentCategory
                                ? "text-black dark:text-white bg-slate-200 dark:bg-neutral-700"
                                : "text-white bg-black dark:bg-primary"
                        }`}
                        key={index}
                        onClick={() => {
                            setCurrentCategory(item);
                        }}
                    >
                        {item}
                    </button>
                ))}
            </div>
            <div className="w-full relative">
                {canScrollLeft && (
                    <button
                        className="absolute left-0 -top-6 transform -translate-y-1/2 z-10 shadow-2xl"
                        onClick={() => {
                            ref.current.scrollBy({
                                left: -400,
                                behavior: "smooth",
                            });
                            setTimeout(checkScroll, 300);
                        }}
                    >
                        <FaCircleChevronLeft
                            size={24}
                            className="bg-slate-700 dark:bg-neutral-700 text-white dark:text-gray-200 rounded-full cursor-pointer shadow-xl"
                        />
                    </button>
                )}
                {canScrollRight && (
                    <button
                        className="absolute right-0 -top-6 transform -translate-y-1/2 z-10 shadow-2xl"
                        onClick={() => {
                            ref.current.scrollBy({
                                left: 400,
                                behavior: "smooth",
                            });
                            setTimeout(checkScroll, 300);
                        }}
                    >
                        <FaCircleChevronRight
                            size={24}
                            className="bg-slate-700 dark:bg-neutral-700 text-white dark:text-gray-200 rounded-full cursor-pointer shadow-xl"
                        />
                    </button>
                )}
            </div>
        </div>
    );
}

export default Categories;
