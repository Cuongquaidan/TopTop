import React, { useState } from "react";
import { BiCheck } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
function OptionButton({ option, onClick, ...props }) {
    return (
        <div
            {...props}
            className="w-full min-w-[300px]  h-10 flex items-center justify-start text-neutral-950 font-semibold hover:bg-neutral-100 rounded-3xl p-2 !cursor-pointer"
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
                    <BiCheck className="text-neutral-800 ml-8"></BiCheck>
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
                    <FaChevronRight className="text-neutral-400 ml-8" />
                </button>
            )}
        </div>
    );
}

export default OptionButton;
