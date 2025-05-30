import React, { useState, useEffect } from "react";
import VideoItem from "./VideoItem";
import ImagesItem from "./ImagesItem";
import { FaCheck, FaCheckCircle, FaHeart } from "react-icons/fa";
import { BiSolidMessageRoundedDots } from "react-icons/bi";
import { IoBookmark } from "react-icons/io5";
import { IoIosShareAlt } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import convertNumToString from "../../helper/convertNumToString";
import { useSelector, useDispatch } from "react-redux";
import {
  setUser,
  setSelectedUser,
  addLikePost,
  removeLikePost,
  removeSavePost,
  addSavePost,
} from "../../redux/features/userSlice";
import createAxiosInstance from "../../libs/axios/AxiosInstance";
import { BASE_URL, SUMMARY_API } from "../../shared/Route";
import { toast } from "react-toastify";
import { FaCirclePlus } from "react-icons/fa6";

function PostItem({ item, ...props }) {
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const likePosts = useSelector((state) => state.user.likePosts);
  const savePosts = useSelector((state) => state.user.savePosts);
  const isLiked = likePosts?.some((likePost) => likePost.postId === item._id);
  const isSaved = savePosts?.some((savePost) => savePost.postId === item._id);
  const [numOfLikes, setNumOfLikes] = useState(item.numOfLikes);
  const [numOfSave, setNumOfSave] = useState(item.numOfSave);

  useEffect(() => {
    if (user && user.followeds.includes(item.user._id)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [user, item.user._id]);

  const AvatarClickHandler = () => {
    dispatch(
      setSelectedUser({
        selectedUser: item.user,
      })
    );
    navigate(`/profile/${item.user.username}`);
  };

  const followClickHandler = async (e) => {
    e.stopPropagation();
    try {
      const axiosInstance = createAxiosInstance(BASE_URL);
      let updateFolloweds = [...user.followeds];
      let updateNumOfFolloweds = user.numOfFolloweds;
      let updateFriends = [...user.friends];
      let updateNumOfFriends = user.numOfFriends;
      let updateItemFollowers = [...item.user.followers];
      let updateItemNumOfFollowers = item.user.numOfFollowers;
      let updateItemFriends = [...item.user.friends];
      let updateItemNumOfFriends = item.user.numOfFriends;

      let checkUpdateFriendStatus = false;

      if (updateFolloweds.includes(item.user._id)) {
        updateFolloweds = updateFolloweds.filter((id) => id !== item.user._id);
        updateNumOfFolloweds--;
        updateItemFollowers = updateItemFollowers.filter((id) => id !== user._id);
        updateItemNumOfFollowers--;
        if (item.user.followeds.includes(user._id)) {
          checkUpdateFriendStatus = true;
          updateFriends = updateFriends.filter((id) => id !== item.user._id);
          updateItemFriends = updateItemFriends.filter((id) => id !== user._id);
          updateNumOfFriends--;
          updateItemNumOfFriends--;
        }
      } else {
        updateFolloweds.push(item.user._id);
        updateNumOfFolloweds++;
        updateItemFollowers.push(user._id);
        updateItemNumOfFollowers++;
        if (item.user.followeds.includes(user._id)) {
          checkUpdateFriendStatus = true;
          updateFriends.push(item.user._id);
          updateItemFriends.push(user._id);
          updateNumOfFriends++;
          updateItemNumOfFriends++;
        }
      }

      const res = await axiosInstance.put(SUMMARY_API.user.put.update, {
        user: user,
        followeds: updateFolloweds,
        numOfFolloweds: updateNumOfFolloweds,
      });
      await axiosInstance.put(SUMMARY_API.user.put.update, {
        user: item.user,
        followers: updateItemFollowers,
        numOfFollowers: updateItemNumOfFollowers,
      });

      if (checkUpdateFriendStatus) {
        await axiosInstance.put(SUMMARY_API.user.put.update, {
          user: user,
          friend: updateFriends,
          numOfFriends: updateNumOfFriends,
        });
        await axiosInstance.put(SUMMARY_API.user.put.update, {
          user: item.user,
          friend: updateItemFriends,
          numOfFriends: updateItemNumOfFriends,
        });
      }

      dispatch(setUser({ user: res.data }));
      setIsFollowing(updateFolloweds.includes(item.user._id));
    } catch (error) {
      toast.error(error.message || "Lỗi khi follow/unfollow");
    }
  };

  const handleLikePost = async () => {
    const AxiosInstance = createAxiosInstance(BASE_URL);
    const resjson = await AxiosInstance.post(SUMMARY_API.likePost.post.click, {
      userId: user._id,
      postId: item._id,
    });
    if (resjson.success) {
      if (likePosts.some((likePost) => likePost.postId === item._id)) {
        dispatch(removeLikePost(item._id));
        setNumOfLikes(numOfLikes - 1);
      } else {
        dispatch(addLikePost(resjson.data));
        setNumOfLikes(numOfLikes + 1);
      }
    }
  };

  const handleSavePost = async () => {
    const AxiosInstance = createAxiosInstance(BASE_URL);
    const resjson = await AxiosInstance.post(SUMMARY_API.savePost.post.click, {
      userId: user._id,
      postId: item._id,
    });
    if (resjson.success) {
      if (savePosts.some((savePost) => savePost.postId === item._id)) {
        dispatch(removeSavePost(item._id));
        setNumOfSave(numOfSave - 1);
      } else {
        dispatch(addSavePost(resjson.data));
        setNumOfSave(numOfSave + 1);
      }
    }
  };

  return (
    <div
      {...props}
      className="relative flex gap-4 items-end z-50 h-screen p-2.5 post-item"
    >
      <div className="absolute left-10 bottom-10 z-50">
        <div className="flex flex-col gap-2 text-slate-100 dark:text-white">
          <h3 className="text-[16px] font-bold">{item.user.display_name}</h3>
          <p className="text-[14px]">{item.caption}</p>
        </div>
      </div>

      {item.type === "video" ? (
        <VideoItem media={item.media} />
      ) : (
        <ImagesItem media={item.media} />
      )}

      <div>
        <div className="relative w-12 h-12 rounded-full">
          <img
            src={item.user.profile_picture}
            alt={item.user.username}
            className="w-full h-full rounded-full object-cover cursor-pointer"
            onClick={AvatarClickHandler}
          />
          <div
            className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 cursor-pointer"
            onClick={followClickHandler}
          >
            {isFollowing ? (
              <FaCheckCircle className="text-primary bg-white dark:bg-neutral-800 rounded-full" size={24} />
            ) : (
              <FaCirclePlus className="text-primary bg-white dark:bg-neutral-800 rounded-full" size={24} />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 justify-end py-10">
          <div
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => handleLikePost()}
          >
            <div
              className={`flex items-center justify-center rounded-full w-12 h-12 ${
                isLiked ? "bg-red-200 dark:bg-red-300" : "bg-neutral-200 dark:bg-neutral-700"
              }`}
            >
              <FaHeart
                size={24}
                className={`${
                  isLiked ? "text-red-600" : "dark:text-gray-300"
                } transition-all duration-200`}
              />
            </div>
            <p className="text-[12px] font-bold text-neutral-800 dark:text-gray-200">
              {convertNumToString(numOfLikes)}
            </p>
          </div>

          <Link
            className="flex flex-col items-center gap-2 cursor-pointer"
            to={`/posts/${item._id}`}
          >
            <div className="flex items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-700 w-12 h-12">
              <BiSolidMessageRoundedDots size={24} className="dark:text-gray-300" />
            </div>
            <p className="text-[12px] font-bold text-neutral-800 dark:text-gray-200">
              {convertNumToString(item.numOfComments)}
            </p>
          </Link>

          <div
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => handleSavePost()}
          >
            <div
              className={`flex items-center justify-center rounded-full w-12 h-12 ${
                isSaved ? "bg-orange-100 dark:bg-orange-200" : "bg-neutral-200 dark:bg-neutral-700"
              }`}
            >
              <IoBookmark
                size={24}
                className={isSaved ? "text-orange-400" : "dark:text-gray-300"}
              />
            </div>
            <p className="text-[12px] font-bold text-neutral-800 dark:text-gray-200">
              {convertNumToString(numOfSave)}
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 cursor-pointer">
            <div className="flex items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-700 w-12 h-12">
              <IoIosShareAlt size={24} className="dark:text-gray-300" />
            </div>
            <p className="text-[12px] font-bold text-neutral-800 dark:text-gray-200">
              {convertNumToString(item.numOfShare)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
