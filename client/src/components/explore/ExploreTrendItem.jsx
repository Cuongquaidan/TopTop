import React, { useState, useRef } from "react";
import { FaVolumeMute } from "react-icons/fa";
import { GoUnmute } from "react-icons/go";
import { CiHeart } from "react-icons/ci";
import convertNumToString from "../../helper/convertNumToString";
import { Link } from "react-router-dom";

const ExploreTrendItem = React.memo(function (props) {
    const { data, dataIndex } = props;
    const { media, numOfLikes, _id } = data[dataIndex];
    const [isHover, setIsHover] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);

    const handleToggleMute = (e) => {
        e.stopPropagation(); // tránh bị click vào <Link>
        e.preventDefault(); // tránh redirect

        const video = videoRef.current;
        if (video) {
            video.muted = !video.muted;
            setIsMuted(video.muted);
        }
    };

    return (
        <div
            style={{
                width: "100%",
                height: 300,
                userSelect: "none",
            }}
            className="my-slide-component rounded-2xl relative"
            onMouseEnter={() => {
                setIsHover(true);
            }}
            onMouseLeave={() => {
                setIsHover(false);
                setIsMuted(true);
                if (videoRef.current) videoRef.current.muted = true;
            }}
        >
            <Link
                to={`/posts/${_id}`}
                className="absolute inset-0 z-10"
                style={{ borderRadius: "1rem" }}
                state={{
                    from: "/explore",
                }}
            ></Link>

            {isHover ? (
                <video
                    ref={videoRef}
                    src={media.url}
                    muted={isMuted}
                    playsInline
                    controls={false}
                    className="object-cover w-full h-full rounded-2xl"
                    loop
                    autoPlay
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

            {/* Nút bật/tắt tiếng */}
            {isHover && (
                <div
                    className="absolute bottom-4 right-3 cursor-pointer text-white text-2xl z-50"
                    onClick={handleToggleMute}
                >
                    {isMuted ? <FaVolumeMute /> : <GoUnmute />}
                </div>
            )}

            {/* Like count */}
            <p className="flex text-neutral-100 absolute rounded-b-2xl w-full cursor-pointer bottom-0 p-4 left-0 gap-2 bg-gradient-to-t from-black/80 to-black/10 z-20">
                <CiHeart size={24} />
                <span>{convertNumToString(numOfLikes)}</span>
            </p>
        </div>
    );
});

export default ExploreTrendItem;
