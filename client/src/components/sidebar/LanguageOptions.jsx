import React from "react";
import languages from "../../data/LanguageData";
import OptionButton from "./OptionButton";
import { FaChevronLeft } from "react-icons/fa";
function LanguageOptions({ setTargetMore }) {
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
                <p className="font-bold text-xl">Ngôn ngữ</p>
            </div>
            <div className="flex flex-col grow overflow-y-scroll h-full hidden-scroll-bar">
                {languages.map((option) => (
                    <OptionButton
                        option={{
                            type: "check",
                            content: option.name,
                            ...option,
                        }}
                        key={option.code}
                        onClick={() => {}}
                    ></OptionButton>
                ))}
            </div>
        </div>
    );
}

export default LanguageOptions;
