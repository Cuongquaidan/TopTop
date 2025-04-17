import React, { useState, useRef } from "react";
import { FaVolumeMute } from "react-icons/fa";
import { GoUnmute } from "react-icons/go";
import { CiHeart } from "react-icons/ci";
import convertNumToString from "../helper/convertNumToString";
import { Link } from "react-router-dom";
import ExploreCategoryVideo from "../components/explore/ExploreCategoryVideo"

const FollowerItem=({item})=>{
    const data = item;
    const { media, numOfLikes } = data;
    const [isHover, setIsHover] = useState(false);
    return (
        <div
            style={{
                height: 400,
                userSelect: "none",
            }}
            className="min-w-[300px] max-w-[300px] md:max-w-[300px] sm:max-w-[300px] rounded-2xl relative flex flex-col justify-center items-center"
            onMouseEnter={() => {
                setIsHover(true);
            }}
            onMouseLeave={() => {
                setIsHover(false);
            }}
        >
            {isHover ? (
                <video
                    src={media.url}
                    muted={true}
                    playsInline
                    controls={false}
                    className="object-cover w-full h-full rounded-2xl"
                    loop={true}
                    autoPlay={true}
                    onClick={(e) => {}}
                />
            ) : (
                <img
                    style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                    }}
                    draggable={false}
                    src={media.thumbnail}
                    className="rounded-2xl shadow-2xl"
                />
            )}
            <div className="absolute flex flex-col items-center w-[80%] transform top-2/5 ">
                <img src={data.user.profile_picture} className="rounded-full w-[70px] h-[70px] object-cover"/>
                <p className="text-white text-xl font-bold mt-4">{data.user.display_name}</p>
                <p className="text-white text-lg font-bold">{data.user.username}</p>
                <button 
                    onClick={()=>{}} 
                    className="bg-red-600 p-2 w-full rounded-lg mt-3 text-white text-2xl font-semibold"
                >
                    Follow
                </button>
            </div>
        </div>
    );
};

export default FollowerItem;
