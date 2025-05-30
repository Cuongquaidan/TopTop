import React, { useState, useEffect } from "react";
import VideoItem from "./VideoItem";
import ImagesItem from "./ImagesItem";
import {  FaCheck, FaCheckCircle, FaHeart } from "react-icons/fa";
import { BiSolidMessageRoundedDots } from "react-icons/bi";
import { IoBookmark } from "react-icons/io5";
import { IoIosShareAlt } from "react-icons/io";
import { Link,useNavigate } from "react-router-dom";
import convertNumToString from "../../helper/convertNumToString";
import { useSelector, useDispatch } from "react-redux";
import { setUser,setSelectedUser } from "../../redux/features/userSlice";
import createAxiosInstance from "../../libs/axios/AxiosInstance";
import { BASE_URL, SUMMARY_API } from "../../shared/Route";
import { toast } from "react-toastify";
import { FaCirclePlus } from "react-icons/fa6";

function FriendPostItem({ item, ...props }) {
    const navigate= useNavigate()
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        if (user && user.friends.includes(item.user._id)) {
            setIsFollowing(true);
        } else {
            setIsFollowing(false);
        }
    }, [user, item.user._id]);

    const AvatarClickHandler=()=>{
        dispatch(setSelectedUser({
            selectedUser:item.user
        }))
        navigate(`/profile/${item.user.username}`)
    }

    return (
        <div
            {...props}
            className="relative flex gap-4 items-end z-50 h-screen p-2.5 post-item"
        >
            <div className="absolute left-10 bottom-10 z-50">
                <div className="flex flex-col gap-2 text-slate-100">
                    <h3 className="text-[16px] font-bold">
                        {item.user.display_name}
                    </h3>
                    <p className="text-[14px]">{item.caption}</p>
                </div>
            </div>

            {item.type === "video" ? (
                <VideoItem media={item.media} />
            ) : (
                <ImagesItem media={item.media} />
            )}

            <div>
                <div className="relative w-12 h-12 rounded-full">
                    <img
                        src={item.user.profile_picture}
                        alt={item.user.username}
                        className="w-full h-full rounded-full object-cover cursor-pointer"
                        onClick={AvatarClickHandler}
                    />
                    <div
                        className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 cursor-pointer"
                    >
                        {isFollowing ? (
                            <FaCheckCircle className="text-primary bg-white rounded-full" size={24} />
                        ) : (
                            <FaCirclePlus className="text-primary bg-white rounded-full" size={24} />
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-4 justify-end py-10">
                    <div
                        className="flex flex-col items-center gap-2 cursor-pointer"
                        onClick={() => setIsLiked(!isLiked)}
                    >
                        <div
                            className={`flex items-center justify-center rounded-full w-12 h-12 ${
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
                        className="flex flex-col items-center gap-2 cursor-pointer"
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
                        className="flex flex-col items-center gap-2 cursor-pointer"
                        onClick={() => setIsSaved(!isSaved)}
                    >
                        <div
                            className={`flex items-center justify-center rounded-full w-12 h-12 ${
                                isSaved ? "bg-orange-100" : "bg-neutral-200"
                            }`}
                        >
                            <IoBookmark
                                size={24}
                                className={isSaved ? "text-orange-400" : ""}
                            />
                        </div>
                        <p className="text-[12px] font-bold text-neutral-800">
                            {convertNumToString(item.numOfSave)}
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-2 cursor-pointer">
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

export default FriendPostItem;
