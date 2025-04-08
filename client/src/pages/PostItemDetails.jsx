import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoItemDetails from "../components/post/VideoItemDetails";
import ImagesItem from "../components/post/ImagesItem";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
    FaCircleChevronDown,
    FaCircleChevronUp,
    FaHeart,
} from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { IoIosShareAlt } from "react-icons/io";
import { IoBookmark } from "react-icons/io5";
import { BiSolidMessageRoundedDots } from "react-icons/bi";
import { FiAlertTriangle, FiLink, FiChevronDown } from "react-icons/fi";
import { RiUserFollowLine, RiSendPlaneFill } from "react-icons/ri";
import { AiFillPushpin, AiOutlineLike } from "react-icons/ai";
import { MdAudiotrack } from "react-icons/md";
import { FaRepeat } from "react-icons/fa6";
import { ImEmbed2 } from "react-icons/im";
import { BsSendFill } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import CommentItem from "../components/post/CommentItem";
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
const comments = [
    {
        username: "petdaily",
        display_name: "Pet Daily 🐶🐱",
        profile_picture:
            "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        comment: "Video dễ thương quá 🥰",
        create_time: "2025-04-07T15:32:10Z",
        likes: 145,
        replies: [
            {
                username: "petdaily",
                display_name: "Pet Daily 🐶🐱",
                profile_picture:
                    "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
                comment: "Đồng ý luôn á 🥰",
                create_time: "2025-04-07T15:33:00Z",
                likes: 12,
            },
            {
                username: "petdaily",
                display_name: "Pet Daily 🐶🐱",
                profile_picture:
                    "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
                comment: "Cute xỉu luôn í 😍",
                create_time: "2025-04-07T15:33:21Z",
                likes: 8,
            },
        ],
    },
    {
        username: "petdaily",
        display_name: "Pet Daily 🐶🐱",
        profile_picture:
            "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        comment: "Ai còn nghe bài này năm 2025 không? 😭",
        create_time: "2025-04-07T15:33:45Z",
        likes: 212,
        replies: [
            {
                username: "petdaily",
                display_name: "Pet Daily 🐶🐱",
                profile_picture:
                    "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
                comment: "Tui đây nè 😢",
                create_time: "2025-04-07T15:34:01Z",
                likes: 21,
            },
            {
                username: "petdaily",
                display_name: "Pet Daily 🐶🐱",
                profile_picture:
                    "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
                comment: "Ký ức ùa về luôn á 😭",
                create_time: "2025-04-07T15:34:25Z",
                likes: 17,
            },
        ],
    },
    {
        username: "petdaily",
        display_name: "Pet Daily 🐶🐱",
        profile_picture:
            "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        comment: "Lên xu hướng là đúng rồi 👏",
        create_time: "2025-04-07T15:34:22Z",
        likes: 89,
        replies: [],
    },
    {
        username: "petdaily",
        display_name: "Pet Daily 🐶🐱",
        profile_picture:
            "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        comment: "Nhạc gì vậy mn ơi?",
        create_time: "2025-04-07T15:35:10Z",
        likes: 34,
        replies: [
            {
                username: "petdaily",
                display_name: "Pet Daily 🐶🐱",
                profile_picture:
                    "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
                comment: "Bài: 'Em là kẻ mộng mơ - Hoàng Dũng' á",
                create_time: "2025-04-07T15:35:45Z",
                likes: 26,
            },
        ],
    },
    {
        username: "petdaily",
        display_name: "Pet Daily 🐶🐱",
        profile_picture:
            "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        comment: "Tiktok này chill thật luôn ấy 😌",
        create_time: "2025-04-07T15:35:55Z",
        likes: 178,
        replies: [],
    },
];

function PostItemDetails() {
    const ratio = 9 / 16;
    const height = window.innerHeight;
    const width = height * ratio;
    const navigate = useNavigate();
    const { id } = useParams();
    const [currentPost, setCurrentPost] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    // Hàm format thời gian
    const formatTimeAgo = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;

        const minutes = Math.floor(diff / 60000);
        if (minutes < 60) return `${minutes} phút trước`;

        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} giờ trước`;

        const days = Math.floor(hours / 24);
        return `${days} ngày trước`;
    };
    const convertNumToString = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M";
        }
        if (num >= 10000) {
            return (num / 1000).toFixed(1) + "K";
        }

        return num;
    };
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
                <div
                    className="fixed top-10 left-[35vw] z-[999] transform -translate-x-1/2 backdrop-blur-2xl flex justify-center"
                    style={{ width: width }}
                >
                    <input
                        type="text"
                        placeholder="Tìm kiếm ..."
                        className="outline-none border-[1px] p-4 rounded-4xl  w-[90%] z-[999 ] text-neutral-50 border-neutral-50 "
                    />
                    <div className="p-3 border-l text-neutral-50 absolute right-[30px] top-1/2 transform -translate-y-1/2 border-neutral-50">
                        <CiSearch size={30} />
                    </div>
                </div>
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
            {currentPost && (
                <div className="relative z-20 flex flex-col p-4 gap-4 text-white w-full bg-black/90 rounded-lg">
                    {/* User Info Section */}
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <img
                                    src={currentPost.user.profile_picture}
                                    alt={currentPost.user.display_name}
                                    className="w-14 h-14 rounded-full object-cover border-2 border-pink-500"
                                />
                                <div>
                                    <div className="flex items-center gap-1">
                                        <span className="font-bold text-lg">
                                            {currentPost.user.display_name}
                                        </span>
                                        {currentPost.user.username ===
                                            "hnh5072" && (
                                            <FiAlertTriangle className="text-yellow-400" />
                                        )}
                                    </div>
                                    <p className="text-sm text-neutral-300">
                                        @{currentPost.user.username}
                                    </p>
                                </div>
                            </div>
                            {/* {currentPost.music && (
                                <div className="flex items-center gap-2 text-sm ml-2">
                                    <MdAudiotrack className="text-pink-500" />
                                    <span>{currentPost.music}</span>
                                </div>
                            )} */}
                        </div>
                        <button className="bg-primary text-white font-semibold px-4 py-1 rounded-lg flex items-center gap-1">
                            Follow
                        </button>
                    </div>
                    <div>
                        {currentPost.caption && (
                            <div>
                                <p className="text-lg text-neutral-300">
                                    {currentPost.caption}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Stats & Link */}
                    <div className="flex justify-between items-center  text-sm">
                        <div className="flex gap-4 text-neutral-300">
                            <div
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => setIsLiked(!isLiked)}
                            >
                                <div
                                    className={`flex items-center justify-center rounded-full  w-8 h-8 bg-neutral-800`}
                                >
                                    <FaHeart
                                        size={16}
                                        className={`${
                                            isLiked ? "text-red-600" : ""
                                        } transition-all duration-200`}
                                    />
                                </div>
                                <p className="text-[12px] font-bold text-neutral-400">
                                    {convertNumToString(currentPost.numOfLikes)}
                                </p>
                            </div>
                            <div className="flex items-center gap-2  cursor-pointer">
                                <div className="flex items-center justify-center rounded-full  w-8 h-8 bg-neutral-800">
                                    <BiSolidMessageRoundedDots size={16} />
                                </div>
                                <p className="text-[12px] font-bold text-neutral-400">
                                    {convertNumToString(
                                        currentPost.numOfComments
                                    )}
                                </p>
                            </div>
                            <div
                                className="flex items-center gap-2  cursor-pointer"
                                onClick={() => setIsSaved(!isSaved)}
                            >
                                <div
                                    className={`flex items-center justify-center rounded-full  w-8 h-8 bg-neutral-800 `}
                                >
                                    <IoBookmark
                                        size={16}
                                        className={`${
                                            isSaved ? "text-orange-400" : ""
                                        }`}
                                    />
                                </div>
                                <p className="text-[12px] font-bold text-neutral-400">
                                    {convertNumToString(currentPost.numOfSave)}
                                </p>
                            </div>
                            {/* <div className="flex items-center gap-2  cursor-pointer">
                                <div className="flex items-center justify-center rounded-full  w-8 h-8 bg-neutral-800">
                                    <IoIosShareAlt size={16} />
                                </div>
                                <p className="text-[12px] font-bold text-neutral-400">
                                    {convertNumToString(currentPost.numOfShare)}
                                </p>
                            </div> */}
                        </div>
                        <div className="flex items-center gap-2 text-white">
                            <div className="w-6 h-6 rounded-full flex items-center cursor-pointer justify-center bg-yellow-400">
                                <FaRepeat size={14}></FaRepeat>
                            </div>
                            <div className="w-6 h-6 rounded-full flex items-center cursor-pointer justify-center bg-neutral-400">
                                <ImEmbed2 size={14}></ImEmbed2>
                            </div>
                            <div className="w-6 h-6 rounded-full flex items-center cursor-pointer justify-center bg-primary">
                                <RiSendPlaneFill size={16}></RiSendPlaneFill>
                            </div>
                            <div className="w-6 h-6 rounded-full flex items-center cursor-pointer justify-center bg-blue-600">
                                <FaFacebookF size={14}></FaFacebookF>
                            </div>
                            <div className="w-6 h-6 rounded-full flex items-center cursor-pointer justify-center bg-green-600">
                                <FaPhoneAlt size={14}></FaPhoneAlt>
                            </div>
                            <div className="w-6 h-6 rounded-full flex items-center cursor-pointer justify-center bg-transparent">
                                <IoIosShareAlt size={14}></IoIosShareAlt>
                            </div>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="mt-4 space-y-4  overflow-y-auto">
                        {comments.map((comment) => (
                            <CommentItem
                                key={comment.create_time}
                                comment={comment}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PostItemDetails;
