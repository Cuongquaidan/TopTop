import React, { useState } from "react";
import OptionButton from "./OptionButton";
import options from "../../data/OptionsData";
import { MdCancel } from "react-icons/md";
import { motion } from "framer-motion";
import LanguageOptions from "./LanguageOptions";
import ToolsForCreators from "./ToolsForCreators";
import ThemeOptions from "./ThemeOptions";
function MoreOptions({ setShowMore }) {
    const [targetMore, setTargetMore] = useState("");
    return (
        <motion.div
            initial={{
                x: "-100%",
                opacity: 0,
            }}
            animate={{
                x: 0,
                opacity: 1,
            }}
            transition={{
                type: "tween",
                duration: 0.5,
            }}
            className="border-x border-neutral-300 p-6 fixed  top-0 left-[80px] bg-white h-screen "
        >
            {targetMore === "" && (
                <div>
                    <div className="flex justify-between mb-10">
                        <p className="font-bold text-xl">Thêm</p>
                        <button className="w-6 h-6 cursor-pointer  text-neutral-300 p-0 rounded-full flex items-center justify-center">
                            <MdCancel
                                size={30}
                                onClick={() => {
                                    setShowMore(false);
                                }}
                            />
                        </button>
                    </div>
                    {options.map((option) => (
                        <OptionButton
                            option={option}
                            key={option.id}
                            onClick={() => {
                                if (option.type === "button") {
                                    setTargetMore(option.id);
                                }
                            }}
                        ></OptionButton>
                    ))}
                </div>
            )}
            {targetMore === "language" && (
                <LanguageOptions
                    setTargetMore={setTargetMore}
                ></LanguageOptions>
            )}
            {targetMore === "tools-for-creators" && (
                <ToolsForCreators
                    setTargetMore={setTargetMore}
                ></ToolsForCreators>
            )}
            {targetMore === "theme" && (
                <ThemeOptions setTargetMore={setTargetMore}></ThemeOptions>
            )}
        </motion.div>
    );
}

export default MoreOptions;
