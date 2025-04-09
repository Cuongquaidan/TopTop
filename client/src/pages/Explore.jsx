import React, { useState } from "react";

import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import {
    StackedCarousel,
    ResponsiveContainer,
} from "react-stacked-center-carousel";
import ExploreTrendItem from "../components/video/ExploreTrendItem";
import categories from "../data/Categories";
import Categories from "../components/Categories";
const videos = [
    {
        postID: 1,
        thumbnail: "https://images6.alphacoders.com/679/thumb-1920-679459.jpg",
        numOfLikes: 666666666,
        url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/rn4fzag0udfillzhftwm.mp4",
    },
    {
        postID: 2,
        thumbnail: "https://images2.alphacoders.com/851/thumb-1920-85182.jpg",
        numOfLikes: 66666,
        url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/rn4fzag0udfillzhftwm.mp4",
    },
    {
        postID: 3,
        thumbnail: "https://images6.alphacoders.com/875/thumb-1920-875570.jpg",
        numOfLikes: 99999,
        url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/rn4fzag0udfillzhftwm.mp4",
    },
    {
        postID: 4,
        thumbnail: "https://images2.alphacoders.com/738/thumb-1920-738176.png",
        numOfLikes: 66666,
        url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/rn4fzag0udfillzhftwm.mp4",
    },
    {
        postID: 5,
        thumbnail: "https://images2.alphacoders.com/631/thumb-1920-631095.jpg",
        numOfLikes: 66666,
        url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/rn4fzag0udfillzhftwm.mp4",
    },
    {
        postID: 6,
        thumbnail: "https://images2.alphacoders.com/738/thumb-1920-738176.png",
        numOfLikes: 66666,
        url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/rn4fzag0udfillzhftwm.mp4",
    },
    {
        postID: 7,
        thumbnail: "https://images2.alphacoders.com/738/thumb-1920-738176.png",
        numOfLikes: 66666,
        url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/rn4fzag0udfillzhftwm.mp4",
    },
    {
        postID: 8,
        thumbnail: "https://images8.alphacoders.com/100/thumb-1920-1005531.jpg",
        numOfLikes: 66666,
        url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/rn4fzag0udfillzhftwm.mp4",
    },
    {
        postID: 9,
        thumbnail: "https://images2.alphacoders.com/582/thumb-1920-582804.png",
        numOfLikes: 66666,
        url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/rn4fzag0udfillzhftwm.mp4",
    },
];
function Explore() {
    const ref = React.useRef();

    return (
        <div className="p-4 max-w-[calc(100vw-300px)]">
            <p className="font-bold italic text-xl ">Thịnh hành hôm nay</p>
            <div
                style={{ width: "80%", position: "relative", height: "30vh" }}
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
                        if (parentWidth <= 1440) currentVisibleSlide = 9;
                        if (parentWidth <= 1080) currentVisibleSlide = 7;
                        return (
                            <StackedCarousel
                                ref={carouselRef}
                                slideComponent={ExploreTrendItem}
                                slideWidth={200}
                                carouselWidth={parentWidth}
                                data={videos}
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
            <p className="font-bold italic text-xl mt-10 ">Bạn có thể thích</p>
            <Categories></Categories>
        </div>
    );
}

export default Explore;
