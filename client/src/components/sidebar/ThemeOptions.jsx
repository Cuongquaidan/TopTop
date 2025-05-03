import React, { useState } from "react";
import OptionButton from "./OptionButton";
import { FaChevronLeft } from "react-icons/fa";
import themes from "../../data/Theme";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();
    return (
        <div className="h-full">
            <div className="flex items-center gap-3 mb-10">
                <button
                    onClick={() => {
                        setTargetMore("");
                    }}
                    className="flex items-center justify-center w-6 h-6 p-0 rounded-full cursor-pointer text-neutral-600"
                >
                    <FaChevronLeft size={20} />
                </button>
                <p className="text-xl font-bold">{t("theme.title")}</p>
            </div>
            <div className="flex flex-col h-full overflow-y-scroll grow hidden-scroll-bar">
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
