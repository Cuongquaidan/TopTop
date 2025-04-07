import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoItemDetails from "../components/post/VideoItemDetails";
import ImagesItem from "../components/post/ImagesItem";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaCircleChevronDown, FaCircleChevronUp } from "react-icons/fa6";
const data = [
    {
        postId: 1,
        user: {
            username: "linhnguyen",
            display_name: "Linh Nguyễn",
            profile_picture:
                "https://images.pexels.com/photos/12154987/pexels-photo-12154987.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        caption: "Chuyến đi Đà Lạt thật chill 🍃 #dalat #travel",
        tags: ["dalat", "travel"],
        type: "image",
        media: [
            "https://images.pexels.com/photos/31133725/pexels-photo-31133725/free-photo-of-den-d-ng-gi-a-nh-ng-bong-hoa-anh-dao-n-r-luc-ch-ng-v-ng.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/12154981/pexels-photo-12154981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/12154987/pexels-photo-12154987.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        ],
        numOfLikes: 1200,
        numOfComments: 85,
        numOfSave: 320,
        numOfShare: 75,
    },
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
        postId: 4,
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
        postId: 5,
        user: {
            username: "petdaily",
            display_name: "Pet Daily 🐶🐱",
            profile_picture:
                "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        caption: "Mèo nhà tui nay lại quậy 😼 #catsoftiktok #funnycat",
        tags: ["catsoftiktok", "funnycat"],
        type: "image",
        media: [
            "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/11337083/pexels-photo-11337083.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        ],
        numOfLikes: 1780,
        numOfComments: 134,
        numOfSave: 390,
        numOfShare: 64,
    },
];

function PostItemDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [currentPost, setCurrentPost] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const postIndex = data.findIndex(
            (item) => item.postId.toString() === id
        );
        if (postIndex !== -1) {
            setCurrentPost(data[postIndex]);
            setCurrentIndex(postIndex);
        } else {
            console.error("Post not found");
        }
    }, [id]);
    return (
        <div className="w-screen h-screen grid grid-cols-[70vw_30vw] relative overflow-hidden">
            <div className="relative w-full h-full">
                <div className="fixed top-10 left-10 z-[999]">
                    <MdCancel
                        size={60}
                        className="text-white/80 cursor-pointer"
                        onClick={() => navigate("/")}
                    />
                </div>
                <div className="fixed top-1/2 transform -translate-y-1/2 right-[31vw] z-[999] flex gap-5 flex-col">
                    <FaCircleChevronUp
                        className={`cursor-pointer transition-opacity duration-300 ${
                            currentIndex === 0
                                ? "text-neutral-500/30 pointer-events-none"
                                : "text-neutral-400/90"
                        }`}
                        size={40}
                        onClick={() => {
                            if (currentIndex > 0) {
                                const prevId = data[currentIndex - 1].postId;
                                navigate(`/posts/${prevId}`);
                            }
                        }}
                    />

                    <FaCircleChevronDown
                        className={`cursor-pointer transition-opacity duration-300 ${
                            currentIndex === data.length - 1
                                ? "text-neutral-500/30 pointer-events-none"
                                : "text-neutral-400/90 "
                        }`}
                        size={40}
                        onClick={() => {
                            if (currentIndex < data.length - 1) {
                                const nextId = data[currentIndex + 1].postId;
                                navigate(`/posts/${nextId}`);
                            }
                        }}
                    />
                </div>
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage:
                            currentPost?.type === "video"
                                ? `url(${currentPost.media.thumbnail})`
                                : currentPost?.type === "image"
                                ? `url(${currentPost.media[0]})`
                                : undefined,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "blur(20px)",
                    }}
                />

                <div className="absolute inset-0 bg-black/40 z-10" />

                <div className="relative z-20 flex items-center justify-center">
                    {currentPost &&
                        (currentPost?.type === "video" ? (
                            <VideoItemDetails media={currentPost?.media} />
                        ) : (
                            <ImagesItem media={currentPost?.media} />
                        ))}
                </div>
            </div>

            <div className="relative z-20"></div>
        </div>
    );
}

export default PostItemDetails;
