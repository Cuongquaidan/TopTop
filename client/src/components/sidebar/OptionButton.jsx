import React, { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

function OptionButton({ option, onClick, valueCheck="", ...props }) {
    const [isCheck, setIsCheck]= useState(false);
    const value = localStorage.getItem(valueCheck);
    
    useEffect(()=>{
        setIsCheck(value === option.id);
    },[value])
    
    return (
        <div
            {...props}
            className="w-full min-w-[300px] h-10 flex items-center justify-start text-neutral-950 dark:text-white font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-3xl p-2 !cursor-pointer"
        >
            {option.type === "link" && (
                <Link to={option.id}>{option.content}</Link>
            )}
            {option.type === "check" && (
                <button
                    onClick={() => {
                        onClick();
                    }}
                    className="flex items-center justify-between w-full h-full cursor-pointer"
                >
                    <p>{option.content}</p>
                    {
                        isCheck && (
                            <BiCheck className="text-neutral-400 dark:text-neutral-500 ml-8" />
                        )
                    }
                </button>
            )}
            {option.type === "button" && (
                <button
                    onClick={() => {
                        onClick();
                    }}
                    className="flex items-center justify-between w-full h-full"
                >
                    <p>{option.content}</p>
                    <FaChevronRight className="text-neutral-400 dark:text-neutral-500 ml-8" />
                </button>
            )}
        </div>
    );
}

export default OptionButton;