import React from "react";
import tools from "../../data/ToolsData";
import { FaChevronLeft } from "react-icons/fa";
import OptionButton from "./OptionButton";
import { useTranslation } from "react-i18next";

function ToolsForCreators({ setTargetMore }) {
    const {t} = useTranslation()
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
                <p className="font-bold text-xl max-w-[300px] text-wrap px-8">
                    {t("options.tools_for_creators")}
                </p>
            </div>
            <div className="flex flex-col h-full overflow-y-scroll grow hidden-scroll-bar">
                {tools.map((option) => (
                    <OptionButton
                        option={{
                            type: "link",
                            ...option,
                        }}
                        key={option.id}
                    ></OptionButton>
                ))}
            </div>
        </div>
    );
}

export default ToolsForCreators;
