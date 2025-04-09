import React, { useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { FaVolumeMute } from "react-icons/fa";
import { GoUnmute } from "react-icons/go";
import convertNumToString from "../../helper/convertNumToString";
import { CiHeart } from "react-icons/ci";
const ExploreCategoryVideo = React.memo(function (props) {
    const { data } = props;
    const { media, numOfLikes } = data;
    const [isHover, setIsHover] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    return (
        <div
            style={{
                width: "100%",
                height: 400,
                userSelect: "none",
            }}
            className="my-slide-component rounded-2xl relative"
            onMouseEnter={() => {
                setIsHover(true);
            }}
            onMouseLeave={() => {
                setIsHover(false);
                setIsMuted(true);
            }}
        >
            {isHover ? (
                <video
                    src={media.url}
                    muted={isMuted}
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
            {isHover && (
                <div
                    className="absolute bottom-4 cursor-pointer right-3 text-white text-2xl z-50"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsMuted((prev) => !prev);
                    }}
                >
                    {isMuted ? (
                        <FaVolumeMute></FaVolumeMute>
                    ) : (
                        <GoUnmute></GoUnmute>
                    )}
                </div>
            )}
            <p className="flex text-neutral-100 absolute rounded-b-2xl w-full cursor-pointer bottom-0 p-4 left-0 gap-2 bg-linear-to-t from-black/80 to-black/10 ">
                <CiHeart size={24}></CiHeart>
                <span>{convertNumToString(numOfLikes)}</span>
            </p>
        </div>
    );
});

export default ExploreCategoryVideo;
