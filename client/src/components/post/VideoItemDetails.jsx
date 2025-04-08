import React, { useEffect, useRef, useState } from "react";
import { GoMute, GoUnmute } from "react-icons/go";
import { FaCirclePlay } from "react-icons/fa6";
import { FaRegCirclePause } from "react-icons/fa6";

function VideoItemDetails({ media, ...props }) {
    const [volume, setVolume] = useState(0.0);
    const videoRef = useRef(null);
    const ratio = 9 / 16;
    const height = window.innerHeight;
    const width = height * ratio;
    const [isPause, setIsPause] = useState(true);
    const [isUserPause, setIsUserPause] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [showPlayIcon, setShowPlayIcon] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const rangeRef = useRef(null);
    const [hovering, setHovering] = useState(false);
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };
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
    useEffect(() => {
        const percent = duration > 0 ? (currentTime / duration) * 100 : 0;

        if (rangeRef.current) {
            rangeRef.current.style.setProperty("--progress", `${percent}%`);
        }
    }, [currentTime, duration]);
    return (
        <div
            {...props}
            style={{
                width: width,
                height: height,
            }}
            className="relative z-[999] overflow-hidden rounded-lg shadow"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
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
            <div className="fixed z-20 cursor-pointer bottom-5 right-[30vw] text-slate-100 flex gap-10 flex-col items-center group">
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={(e) => {
                        e.stopPropagation();
                        const vol = parseFloat(e.target.value);
                        setVolume(vol);
                        if (videoRef.current) {
                            videoRef.current.volume = vol;
                            if (vol > 0) {
                                videoRef.current.muted = false;
                                setIsMuted(false);
                            } else {
                                videoRef.current.muted = true;
                                setIsMuted(true);
                            }
                        }
                    }}
                    className=" w-20 h-1 rotate-270 cursor-pointer appearance-none bg-white/60 accent-white opacity-0 group-hover:opacity-100 rounded-lg"
                />
                <div
                    onClick={(e) => {
                        e.stopPropagation();

                        const newMuted = !isMuted;
                        setIsMuted(newMuted);

                        if (videoRef.current) {
                            videoRef.current.muted = newMuted;

                            if (!newMuted && volume === 0) {
                                videoRef.current.volume = 1;
                                setVolume(1);
                            } else {
                                videoRef.current.volume = 0;
                                setVolume(0);
                            }
                        }
                    }}
                >
                    {isMuted ? <GoMute size={36} /> : <GoUnmute size={36} />}
                </div>
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
                onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
                onLoadedMetadata={(e) => setDuration(e.target.duration)}
            />
            {duration > 0 && (
                <div className="flex gap-4 w-full">
                    <input
                        ref={rangeRef}
                        type="range"
                        min={0}
                        max={duration}
                        step="0.1"
                        value={currentTime}
                        onChange={(e) => {
                            const newTime = parseFloat(e.target.value);
                            if (videoRef.current) {
                                videoRef.current.currentTime = newTime;
                                setCurrentTime(newTime);
                            }
                        }}
                        className={`video-progress absolute bottom-2 left-0 z-[999] w-full ${
                            hovering ? "opacity-100" : "opacity-0"
                        }`}
                    />
                    <div className="absolute bottom-3 right-2 text-white text-sm z-[999] font-mono">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                </div>
            )}

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

export default VideoItemDetails;
