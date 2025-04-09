import React from "react";
import tools from "../../data/ToolsData";
import { FaChevronLeft } from "react-icons/fa";
import OptionButton from "./OptionButton";

function ToolsForCreators({ setTargetMore }) {
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
                <p className="font-bold text-xl max-w-[300px] text-wrap px-8">
                    Công cụ dành cho nhà sáng tạo
                </p>
            </div>
            <div className="flex flex-col grow overflow-y-scroll h-full hidden-scroll-bar">
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
