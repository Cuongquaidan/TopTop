import React, { useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import {
    StackedCarousel,
    ResponsiveContainer,
} from "react-stacked-center-carousel";
const videos = [
    {
        thumbnail: "https://via.placeholder.com/220x360?text=Video+1",
        likes: "66.6K",
        url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/rn4fzag0udfillzhftwm.mp4",
    },
    {
        thumbnail: "https://via.placeholder.com/220x360?text=Video+2",
        likes: "78.3K",
        url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/rn4fzag0udfillzhftwm.mp4",
    },
    {
        thumbnail: "https://via.placeholder.com/220x360?text=Video+3",
        likes: "1.5K",
        url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/rn4fzag0udfillzhftwm.mp4",
    },
    {
        thumbnail: "https://via.placeholder.com/220x360?text=Video+4",
        likes: "63",
        url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/rn4fzag0udfillzhftwm.mp4",
    },
    {
        thumbnail: "https://via.placeholder.com/220x360?text=Video+5",
        likes: "226.7K",
        url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/rn4fzag0udfillzhftwm.mp4",
    },
    {
        thumbnail: "https://via.placeholder.com/220x360?text=Video+6",
        likes: "88.5K",
        url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/rn4fzag0udfillzhftwm.mp4",
    },
    {
        thumbnail: "https://via.placeholder.com/220x360?text=Video+6",
        likes: "88.5K",
        url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/rn4fzag0udfillzhftwm.mp4",
    },
    {
        thumbnail: "https://via.placeholder.com/220x360?text=Video+6",
        likes: "88.5K",
        url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/rn4fzag0udfillzhftwm.mp4",
    },
    {
        thumbnail: "https://via.placeholder.com/220x360?text=Video+6",
        likes: "88.5K",
        url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/rn4fzag0udfillzhftwm.mp4",
    },
    {
        thumbnail: "https://via.placeholder.com/220x360?text=Video+6",
        likes: "88.5K",
        url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/rn4fzag0udfillzhftwm.mp4",
    },
];
export const data = [
    {
        cover: "https://images6.alphacoders.com/679/thumb-1920-679459.jpg",
        title: "Interstaller",
    },
    {
        cover: "https://images2.alphacoders.com/851/thumb-1920-85182.jpg",
        title: "Inception",
    },
    {
        cover: "https://images6.alphacoders.com/875/thumb-1920-875570.jpg",
        title: "Blade Runner 2049",
    },
    {
        cover: "https://images6.alphacoders.com/114/thumb-1920-1141749.jpg",
        title: "Icon man 3",
    },
    {
        cover: "https://images3.alphacoders.com/948/thumb-1920-948864.jpg",
        title: "Venom",
    },
    {
        cover: "https://images2.alphacoders.com/631/thumb-1920-631095.jpg",
        title: "Steins Gate",
    },
    {
        cover: "https://images4.alphacoders.com/665/thumb-1920-665242.png",
        title: "One Punch Man",
    },
    {
        cover: "https://images2.alphacoders.com/738/thumb-1920-738176.png",
        title: "A Silent Voice",
    },
    {
        cover: "https://images8.alphacoders.com/100/thumb-1920-1005531.jpg",
        title: "Demon Slayer",
    },
    {
        cover: "https://images2.alphacoders.com/582/thumb-1920-582804.png",
        title: "Attack On Titan",
    },
];

function Explore() {
    const ref = React.useRef();
    return (
        <div>
            <div
                style={{ width: "70%", position: "relative", height: "30vh" }}
                className="mx-auto"
            >
                <ResponsiveContainer
                    carouselRef={ref}
                    render={(parentWidth, carouselRef) => {
                        // If you want to use a ref to call the method of StackedCarousel, you cannot set the ref directly on the carousel component
                        // This is because ResponsiveContainer will not render the carousel before its parent's width is determined
                        // parentWidth is determined after your parent component mounts. Thus if you set the ref directly it will not work since the carousel is not rendered
                        // Thus you need to pass your ref object to the ResponsiveContainer as the carouselRef prop and in your render function you will receive this ref object
                        let currentVisibleSlide = 9;
                        if (parentWidth <= 1440) currentVisibleSlide = 7;
                        if (parentWidth <= 1080) currentVisibleSlide = 5;
                        return (
                            <StackedCarousel
                                ref={carouselRef}
                                slideComponent={Card}
                                slideWidth={200}
                                carouselWidth={parentWidth}
                                data={data}
                                currentVisibleSlide={currentVisibleSlide}
                                maxVisibleSlide={9}
                                useGrabCursor
                            />
                        );
                    }}
                />
                <>
                    <div
                        style={{
                            position: "absolute",
                            top: "40%",
                            left: 40,
                            zIndex: 10,
                        }}
                        onClick={() => {
                            ref.current?.goBack();
                        }}
                        className="text-white cursor-pointer bg-black/20 rounded-full p-2"
                    >
                        <FaChevronLeft />
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            top: "40%",
                            right: 40,
                            zIndex: 10,
                        }}
                        onClick={() => {
                            ref.current?.goNext(6);
                        }}
                        className="text-white cursor-pointer bg-black/20 rounded-full p-2"
                    >
                        <FaChevronRight />
                    </div>
                </>
            </div>
        </div>
    );
}

export default Explore;
export const Card = React.memo(function (props) {
    const { data, dataIndex } = props;
    const { cover } = data[dataIndex];
    return (
        <div
            style={{
                width: "100%",
                height: 300,
                userSelect: "none",
            }}
            className="my-slide-component rounded-2xl shadow"
        >
            <img
                style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                }}
                draggable={false}
                src={cover}
                className="rounded-2xl shadow"
            />
            <p className="flex text-neutral-100 absolute rounded-bl-2xl cursor-pointer bottom-0 p-4 left-0 gap-2 bg-black/50 backdrop-blur-md">
                <FaHeart size={24}></FaHeart>
                <span>100K</span>
            </p>
        </div>
    );
});
