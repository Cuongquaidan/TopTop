import React, { useEffect, useState } from "react";
import OptionButton from "./OptionButton";
import options from "../../data/OptionsData";
import { MdCancel } from "react-icons/md";
import { motion } from "framer-motion";
import LanguageOptions from "./LanguageOptions";
import ToolsForCreators from "./ToolsForCreators";
import ThemeOptions from "./ThemeOptions";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/features/userSlice";
function MoreOptions({ setShowMore }) {
    const [targetMore, setTargetMore] = useState("");
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();


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
                duration: 0.3,
            }}
            className="border-x border-neutral-300 px-6 fixed  top-0 left-[80px] w-full flex bg-transparent h-screen "
        >
            
            <div className="h-full p-6 px-4 border-r border-neutral-300 bg-white">
            {targetMore === "" && (
                <div>
                    <div className="flex justify-between mb-10">
                        <p className="text-xl font-bold">Thêm</p>
                        <button className="flex items-center justify-center w-6 h-6 p-0 rounded-full cursor-pointer text-neutral-300">
                            <MdCancel
                                size={30}
                                onClick={() => {
                                    setShowMore(false);
                                }}
                            />
                        </button>
                    </div>
                    {options.map((option,index) => index === options.length - 1 ? (<OptionButton
                            option={option}
                            key={option.id}
                            onClick={() => {
                                if (option.type === "button") {
                                    // setTargetMore(option.id);
                                    setTargetMore("");
                                    setShowMore(false);
                                    dispatch(clearUser());
                                }
                            }}
                        ></OptionButton>):(
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
            </div>
            <div className="bg-transparent opacity-0 grow"
                onClick= {
                    ()=>{
                        setShowMore(false);
                        setTargetMore("");
                    }
                }
                onWheel={()=>{
                    setShowMore(false);
                    setTargetMore("");
                }}
            ></div>
        </motion.div>
    );
}

export default MoreOptions;
