import React, { useState } from "react";
import OptionButton from "./OptionButton";
import options from "../../data/OptionsData";
import { MdCancel } from "react-icons/md";
import { motion } from "framer-motion";
import LanguageOptions from "./LanguageOptions";
import ToolsForCreators from "./ToolsForCreators";
import ThemeOptions from "./ThemeOptions";
import Messages from "./Messages";
import Activities from "./Activities";
function OtherOptions({ option, setOption }) {
    
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
            className="border-x border-neutral-300 p-0 fixed  top-0 left-[80px] w-full flex bg-transparent h-screen "
        >
            
            <div className="h-full p-6 px-0 border-r border-neutral-300 shrink-0">
            {option === "messages" && (
               <Messages option={option} setOption={option}></Messages>
            )}
            {
              option === "activities" && (
                <Activities option={option} setOption={setOption}></Activities>
              )
            }
            
            </div>
            <div className="bg-transparent opacity-0 grow"
                onClick= {
                    ()=>{
                        setOption("");
                    }
                }
                onWheel={()=>{
                    setOption("");
                }}
            ></div>
        </motion.div>
    );
}

export default OtherOptions;
