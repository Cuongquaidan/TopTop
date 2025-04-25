import React, { useState, useEffect } from "react";
import titokIcon from '../assets/tiktok-icon.png';
import createAxiosInstance from "../libs/axios/AxiosInstance";
import { BASE_URL, SUMMARY_API } from "../shared/Route";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser, setUser } from "../redux/features/userSlice";
import { useNavigate } from "react-router-dom";

const Followeruser = ({ item }) => {
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const [media, setMedia] = useState(null);
    const [isHover, setIsHover] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [followingState, setFollowingState] = useState(false);

    const user = useSelector((state) => state.user.user);

    const followClickHandler = async (e) => {
        e.stopPropagation()
        if (isLoading) return;
        setIsLoading(true);

        try {
            const axiosInstance = createAxiosInstance(BASE_URL);
            let updateFolloweds = [...user.followeds];
            let updateNumOfFolloweds = user.numOfFolloweds;

            if (updateFolloweds.includes(item._id)) {
                // Unfollow
                updateFolloweds = updateFolloweds.filter(id => id !== item._id);
                updateNumOfFolloweds--;
            } else {
                // Follow
                updateFolloweds.push(item._id);
                updateNumOfFolloweds++;
            }

            const res = await axiosInstance.put(SUMMARY_API.user.put.update, {
                user: user,
                followeds: updateFolloweds,
                numOfFolloweds: updateNumOfFolloweds
            });

            dispatch(setUser({ user: res.data }));
            setFollowingState(updateFolloweds.includes(item._id));
        } catch (error) {
            toast.error(error.message || "Lỗi khi follow/unfollow");
        } finally {
            setIsLoading(false);
        }
    };

    const clickUserHandler=()=>{
        dispatch(setSelectedUser({
            selectedUser:item
        }))
        navigate(`/profile/${item.username}`)
    }

    useEffect(()=>{
        const fetchRandomPost=async()=>{
            try {
                const axiosInstance = createAxiosInstance(BASE_URL);
                const res = await axiosInstance.get(SUMMARY_API.post.get.byUser.replace(":user", item._id));

                if (res.data.length === 0) return;

                const randomPost = res.data.find(post => post.type === "video");
                if (randomPost && randomPost.media) {
                    setMedia(randomPost.media);
                }

                setFollowingState(user.followeds.includes(item._id));
            } catch (error) {
                toast.error(error.message || "Lỗi fetchRandomPost FollowerItem");
            }
        };

        fetchRandomPost();
    }, [item._id, user.followeds]);

    return (
        <div
            style={{ height: 400, userSelect: "none" }}
            className="min-w-[280px] max-w-[300px] rounded-2xl relative flex flex-col justify-center items-center"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={clickUserHandler}
        >
            {isHover ? (
                <video
                    src={media ? media.url : null}
                    muted
                    playsInline
                    controls={false}
                    className={`object-cover w-full h-full rounded-2xl ${media ? 'block' : 'none'}`}
                    loop
                    autoPlay
                />
            ) : (
                <img
                    style={{ height: "100%", width: "100%", objectFit: "cover" }}
                    draggable={false}
                    src={media ? media.thumbnail : "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="}
                    className="rounded-2xl shadow-2xl"
                />
            )}

            <div className="absolute flex flex-col items-center w-[80%] transform top-2/5">
                <img
                    src={item.profile_picture || titokIcon}
                    className="rounded-full w-[70px] h-[70px] object-cover"
                    alt="user"
                />
                <p className="text-white text-xl font-bold mt-2">{item.display_name}</p>
                <p className="text-white text-lg font-bold -mt-1">{item.username}</p>

                <button
                    onClick={followClickHandler}
                    disabled={isLoading}
                    className={`bg-primary p-2 w-full rounded-lg cursor-pointer mt-3 text-white text-xl font-semibold ${
                        isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {isLoading
                        ? "Đang xử lý..."
                        : followingState
                            ? "Đã follow"
                            : "Follow"}
                </button>
            </div>
        </div>
    );
};

export default Followeruser;
