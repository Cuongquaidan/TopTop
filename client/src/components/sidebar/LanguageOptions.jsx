import React from "react";
import languages from "../../data/LanguageData";
import OptionButton from "./OptionButton";
import { FaChevronLeft } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
function LanguageOptions({ setTargetMore }) {
    const { i18n, t } = useTranslation();
    
    const handleChangeLanguage = (code) => {
        i18n.changeLanguage(code);
    };

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
                <p className="text-xl font-bold">{t("options.language")}</p>
            </div>
            <div className="flex flex-col h-full overflow-y-scroll grow hidden-scroll-bar">
                {languages.map((option) => (
                    <OptionButton
                        option={{
                            type: "check",
                            content: option.name,
                            ...option,
                        }}
                        key={option.code}
                        onClick={() => {
                            handleChangeLanguage(option.code);
                        }}
                        currentLanguage={i18n.language}
                        valueCheck="language"
                    ></OptionButton>
                ))}
            </div>
        </div>
    );
}

export default LanguageOptions;
