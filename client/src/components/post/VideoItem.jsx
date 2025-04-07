import React, { useEffect, useRef, useState } from "react";
import { GoMute, GoUnmute } from "react-icons/go";
import { FaCirclePlay } from "react-icons/fa6";
import { FaRegCirclePause } from "react-icons/fa6";
function VideoItem({ media, ...props }) {
    const videoRef = useRef(null);
    const ratio = 9 / 16;
    const height = window.innerHeight;
    const width = height * ratio;
    const [isPause, setIsPause] = useState(true);
    const [isUserPause, setIsUserPause] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [showPlayIcon, setShowPlayIcon] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const video = entry.target;
                if (entry.intersectionRatio >= 0.51) {
                    video.play();
                    setIsPause(false);
                } else {
                    video.pause();
                    setIsPause(true);
                }
            },
            {
                threshold: Array.from({ length: 101 }, (_, i) => i / 100),
            }
        );

        const currentVideo = videoRef.current;
        if (currentVideo) observer.observe(currentVideo);

        return () => {
            if (currentVideo) observer.unobserve(currentVideo);
        };
    }, []);

    return (
        <div
            {...props}
            style={{
                width: width,
                height: height - 20,
            }}
            className="relative z-10 overflow-hidden rounded-lg shadow"
        >
            <div className="absolute transform top-1/2 left-1/2 -translate-1/2">
                <div className="relative">
                    <FaCirclePlay
                        size={80}
                        className={`transition-all absolute top-0 left-0 transform -translate-1/2 duration-500 cursor-pointer text-white ${
                            isUserPause
                                ? "scale-100 opacity-100"
                                : "scale-0 opacity-0"
                        }`}
                    />
                    <FaRegCirclePause
                        size={80}
                        className={`transition-all absolute top-0 left-0 transform -translate-1/2 duration-500 cursor-pointer text-white ${
                            showPlayIcon
                                ? "scale-100 opacity-100"
                                : "scale-0 opacity-0"
                        }`}
                    />
                </div>
            </div>
            <div
                className="absolute z-20 cursor-pointer top-5 left-5 text-slate-100"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted((prev) => !prev);
                }}
            >
                {isMuted ? <GoMute size={36} /> : <GoUnmute size={36} />}
            </div>
            <video
                ref={videoRef}
                src={media.url}
                muted={isMuted}
                playsInline
                controls={false}
                className="object-cover w-full h-full rounded-lg"
                loop={true}
                onClick={(e) => {
                    e.stopPropagation();
                    if (isUserPause) {
                        videoRef.current.play();
                        setIsUserPause(false);
                        setShowPlayIcon(true);
                        setTimeout(() => {
                            setShowPlayIcon(false);
                        }, 1000);
                    } else {
                        videoRef.current.pause();
                        setIsUserPause(true);
                    }
                }}
            />

            {isPause && (
                <img
                    src={media.thumbnail}
                    alt="video"
                    className="absolute top-0 left-0 z-10 object-cover w-full h-full rounded-lg"
                />
            )}
        </div>
    );
}

export default VideoItem;
