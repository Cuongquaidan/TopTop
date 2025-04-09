import React, { useState } from "react";

import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import {
    StackedCarousel,
    ResponsiveContainer,
} from "react-stacked-center-carousel";
import ExploreTrendItem from "../components/explore/ExploreTrendItem";
import categories from "../data/Categories";
import Categories from "../components/Categories";
import ExploreItem from "../components/explore/ExploreItem";
const data = [
    {
        postId: 2,
        user: {
            username: "foodie_trung",
            display_name: "Trung Ăn Gì",
            profile_picture:
                "https://images.pexels.com/photos/5984545/pexels-photo-5984545.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        caption: "Bánh tráng nướng xịn xò ở Đà Nẵng 😋 #foodie #danangfood",
        tags: ["foodie", "danangfood"],
        type: "video",
        media: {
            url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/rn4fzag0udfillzhftwm.mp4",
            thumbnail:
                "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
            duration: 20,
        },
        numOfLikes: 890,
        numOfComments: 47,
        numOfSave: 210,
        numOfShare: 36,
    },
    {
        postId: 3,
        user: {
            username: "hanhpham",
            display_name: "Hạnh Phạm",
            profile_picture:
                "https://images.pexels.com/photos/2014027/pexels-photo-2014027.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        caption:
            "Tập yoga buổi sáng để bắt đầu ngày mới 💪🧘‍♀️ #yoga #morningroutine",
        tags: ["yoga", "morningroutine"],
        type: "video",
        media: {
            url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/sth7incmgszhsuzfkswq.mp4",
            thumbnail:
                "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
            duration: 18,
        },
        numOfLikes: 1500123,
        numOfComments: 102,
        numOfSave: 480,
        numOfShare: 92,
    },
    {
        postId: 5,
        user: {
            username: "hoangvu.music",
            display_name: "Hoàng Vũ 🎧",
            profile_picture:
                "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        caption: "Cover bài mới nèee 🎤 #cover #musicchallenge",
        tags: ["cover", "musicchallenge"],
        type: "video",
        media: {
            url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/sth7incmgszhsuzfkswq.mp4",
            thumbnail:
                "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
            duration: 60,
        },
        numOfLikes: 3103120,
        numOfComments: 265312,
        numOfSave: 1200,
        numOfShare: 305,
    },
    {
        postId: 6,
        user: {
            username: "hoangvu.music",
            display_name: "Hoàng Vũ 🎧",
            profile_picture:
                "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        caption: "Cover bài mới nèee 🎤 #cover #musicchallenge",
        tags: ["cover", "musicchallenge"],
        type: "video",
        media: {
            url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/sth7incmgszhsuzfkswq.mp4",
            thumbnail:
                "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
            duration: 60,
        },
        numOfLikes: 3103120,
        numOfComments: 265312,
        numOfSave: 1200,
        numOfShare: 305,
    },
    {
        postId: 7,
        user: {
            username: "hoangvu.music",
            display_name: "Hoàng Vũ 🎧",
            profile_picture:
                "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        caption: "Cover bài mới nèee 🎤 #cover #musicchallenge",
        tags: ["cover", "musicchallenge"],
        type: "video",
        media: {
            url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/sth7incmgszhsuzfkswq.mp4",
            thumbnail:
                "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
            duration: 60,
        },
        numOfLikes: 3103120,
        numOfComments: 265312,
        numOfSave: 1200,
        numOfShare: 305,
    },
    {
        postId: 8,
        user: {
            username: "hoangvu.music",
            display_name: "Hoàng Vũ 🎧",
            profile_picture:
                "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        caption: "Cover bài mới nèee 🎤 #cover #musicchallenge",
        tags: ["cover", "musicchallenge"],
        type: "video",
        media: {
            url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/sth7incmgszhsuzfkswq.mp4",
            thumbnail:
                "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
            duration: 60,
        },
        numOfLikes: 3103120,
        numOfComments: 265312,
        numOfSave: 1200,
        numOfShare: 305,
    },
    {
        postId: 9,
        user: {
            username: "hoangvu.music",
            display_name: "Hoàng Vũ 🎧",
            profile_picture:
                "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        caption: "Cover bài mới nèee 🎤 #cover #musicchallenge",
        tags: ["cover", "musicchallenge"],
        type: "video",
        media: {
            url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/sth7incmgszhsuzfkswq.mp4",
            thumbnail:
                "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
            duration: 60,
        },
        numOfLikes: 3103120,
        numOfComments: 265312,
        numOfSave: 1200,
        numOfShare: 305,
    },
    {
        postId: 10,
        user: {
            username: "hoangvu.music",
            display_name: "Hoàng Vũ 🎧",
            profile_picture:
                "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        caption: "Cover bài mới nèee 🎤 #cover #musicchallenge",
        tags: ["cover", "musicchallenge"],
        type: "video",
        media: {
            url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/sth7incmgszhsuzfkswq.mp4",
            thumbnail:
                "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
            duration: 60,
        },
        numOfLikes: 3103120,
        numOfComments: 265312,
        numOfSave: 1200,
        numOfShare: 305,
    },
];
function Explore() {
    const ref = React.useRef();

    return (
        <div className="p-4 px-10 min-w-0">
            <p className="font-bold italic text-xl ">Thịnh hành hôm nay</p>
            <div
                style={{ width: "90%", position: "relative", height: "30vh" }}
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
            <p className="font-bold italic text-xl mt-10 ">Bạn có thể thích</p>
            <Categories></Categories>
            <div className="grid grid-cols-5 gap-4 mt-4">
                {data.map((item, index) => (
                    <ExploreItem key={index} item={item} />
                ))}
            </div>
        </div>
    );
}

export default Explore;
