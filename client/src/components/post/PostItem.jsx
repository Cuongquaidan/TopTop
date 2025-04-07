import React, { useState } from "react";
import VideoItem from "./VideoItem";
import ImagesItem from "./ImagesItem";
import { FaCirclePlus } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { BiSolidMessageRoundedDots } from "react-icons/bi";
import { IoBookmark } from "react-icons/io5";
import { IoIosShareAlt } from "react-icons/io";
import { Link } from "react-router-dom";
function PostItem({ item, ...props }) {
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const convertNumToString = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M";
        }
        if (num >= 10000) {
            return (num / 1000).toFixed(1) + "K";
        }

        return num;
    };
    return (
        <div
            {...props}
            className="relative flex gap-4 items-end z-50  h-screen p-2.5 post-item"
        >
            <div className="absolute left-10 bottom-10 z-50 ">
                <div className="flex flex-col gap-2 text-slate-100">
                    <h3 className="text-[16px] font-bold ">
                        {item.user.display_name}
                    </h3>
                    <p className="text-[14px] ">{item.caption}</p>
                    <div className="flex gap-2">
                        {item.tags.map((tag, index) => (
                            <span key={index} className="text-[12px] font-bold">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            {item.type === "video" ? (
                <VideoItem media={item.media}></VideoItem>
            ) : (
                <ImagesItem media={item.media}></ImagesItem>
            )}
            <div>
                <div className="relative w-12 h-12 rounded-full">
                    <img
                        src={item.user.profile_picture}
                        alt={item.user.username}
                        className="w-full h-full rounded-full object-cover"
                    />
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                        <FaCirclePlus
                            className="text-primary bg-white rounded-full"
                            size={24}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-4 justify-end py-10">
                    <div
                        className="flex flex-col items-center gap-2 cursor-pointer"
                        onClick={() => setIsLiked(!isLiked)}
                    >
                        <div
                            className={`flex items-center justify-center rounded-full  w-12 h-12 ${
                                isLiked ? "bg-red-200" : "bg-neutral-200"
                            }`}
                        >
                            <FaHeart
                                size={24}
                                className={`${
                                    isLiked ? "text-red-600" : ""
                                } transition-all duration-200`}
                            />
                        </div>
                        <p className="text-[12px] font-bold text-neutral-800">
                            {convertNumToString(item.numOfLikes)}
                        </p>
                    </div>
                    <Link
                        className="flex flex-col items-center gap-2  cursor-pointer"
                        to={`/posts/${item.postId}`}
                    >
                        <div className="flex items-center justify-center rounded-full bg-neutral-200 w-12 h-12">
                            <BiSolidMessageRoundedDots size={24} />
                        </div>
                        <p className="text-[12px] font-bold text-neutral-800">
                            {convertNumToString(item.numOfComments)}
                        </p>
                    </Link>
                    <div
                        className="flex flex-col items-center gap-2  cursor-pointer"
                        onClick={() => setIsSaved(!isSaved)}
                    >
                        <div
                            className={`flex items-center justify-center rounded-full bg-neutral-200 w-12 h-12 ${
                                isSaved ? "bg-orange-100" : ""
                            }`}
                        >
                            <IoBookmark
                                size={24}
                                className={`${
                                    isSaved ? "text-orange-400" : ""
                                }`}
                            />
                        </div>
                        <p className="text-[12px] font-bold text-neutral-800">
                            {convertNumToString(item.numOfSave)}
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-2  cursor-pointer">
                        <div className="flex items-center justify-center rounded-full bg-neutral-200 w-12 h-12">
                            <IoIosShareAlt size={24} />
                        </div>
                        <p className="text-[12px] font-bold text-neutral-800">
                            {convertNumToString(item.numOfShare)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostItem;
