import React, { useState } from "react";
import OptionButton from "./OptionButton";
import { FaChevronLeft } from "react-icons/fa";
import themes from "../../data/Theme";

function ThemeOptions({ setTargetMore }) {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const handleThemeChange = (id) => {
        if (id === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", id);
        setTheme(id); // ⚠️ Trigger re-render để OptionButton update lại
    };
    return (
        <div className="h-full">
            <div className="flex gap-3 items-center mb-10">
                <button
                    onClick={() => {
                        setTargetMore("");
                    }}
                    className="w-6 h-6 cursor-pointer  text-neutral-600 p-0 rounded-full flex items-center justify-center"
                >
                    <FaChevronLeft size={20} />
                </button>
                <p className="font-bold text-xl">Chế độ</p>
            </div>
            <div className="flex flex-col grow overflow-y-scroll h-full hidden-scroll-bar">
                {themes.map((option) => (
                    <OptionButton
                        option={{
                            type: "check",
                            ...option,
                        }}
                        key={option.id}
                        valueCheck="theme"
                        onClick={() => handleThemeChange(option.id)}
                    ></OptionButton>
                ))}
            </div>
        </div>
    );
}

export default ThemeOptions;
