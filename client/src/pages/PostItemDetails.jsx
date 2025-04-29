import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { pushPostStack } from "../redux/features/postSlice";
import useBackToPreviousPage from "../hooks/useBackToPreviousPage";
import createAxiosInstance from "../libs/axios/AxiosInstance";
import { BASE_URL, SUMMARY_API } from "../shared/Route";
import { MdCancel } from "react-icons/md";
import VideoItemDetails from "../components/post/VideoItemDetails";
import ImagesItem from "../components/post/ImagesItem";
import { CiSearch } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import { IoBookmark } from "react-icons/io5";
import { BiSolidMessageRoundedDots } from "react-icons/bi";
import { FiAlertTriangle } from "react-icons/fi";
import { FaRepeat, FaFacebookF } from "react-icons/fa6";
import { ImEmbed2 } from "react-icons/im";
import { RiSendPlaneFill } from "react-icons/ri";
import { IoIosShareAlt } from "react-icons/io";
import CommentItem from "../components/post/CommentItem";
import { FaPhoneAlt } from "react-icons/fa";
import CommentsSection from "../components/CommentsSection";
import { addLikePost, addSavePost, removeSavePost, removeLikePost } from "../redux/features/userSlice";
// const comments = [
//     {
//         username: "petdaily",
//         display_name: "Pet Daily 🐶🐱",
//         profile_picture:
//             "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//         comment: "Video dễ thương quá 🥰",
//         create_time: "2025-04-07T15:32:10Z",
//         likes: 145,
//         replies: [
//             {
//                 username: "petdaily",
//                 display_name: "Pet Daily 🐶🐱",
//                 profile_picture:
//                     "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//                 comment: "Đồng ý luôn á 🥰",
//                 create_time: "2025-04-07T15:33:00Z",
//                 likes: 12,
//             },
//             {
//                 username: "petdaily",
//                 display_name: "Pet Daily 🐶🐱",
//                 profile_picture:
//                     "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//                 comment: "Cute xỉu luôn í 😍",
//                 create_time: "2025-04-07T15:33:21Z",
//                 likes: 8,
//             },
//         ],
//     },
//     {
//         username: "petdaily",
//         display_name: "Pet Daily 🐶🐱",
//         profile_picture:
//             "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//         comment: "Ai còn nghe bài này năm 2025 không? 😭",
//         create_time: "2025-04-07T15:33:45Z",
//         likes: 212,
//         replies: [
//             {
//                 username: "petdaily",
//                 display_name: "Pet Daily 🐶🐱",
//                 profile_picture:
//                     "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//                 comment: "Tui đây nè 😢",
//                 create_time: "2025-04-07T15:34:01Z",
//                 likes: 21,
//             },
//             {
//                 username: "petdaily",
//                 display_name: "Pet Daily 🐶🐱",
//                 profile_picture:
//                     "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//                 comment: "Ký ức ùa về luôn á 😭",
//                 create_time: "2025-04-07T15:34:25Z",
//                 likes: 17,
//             },
//         ],
//     },
//     {
//         username: "petdaily",
//         display_name: "Pet Daily 🐶🐱",
//         profile_picture:
//             "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//         comment: "Lên xu hướng là đúng rồi 👏",
//         create_time: "2025-04-07T15:34:22Z",
//         likes: 89,
//         replies: [],
//     },
//     {
//         username: "petdaily",
//         display_name: "Pet Daily 🐶🐱",
//         profile_picture:
//             "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//         comment: "Nhạc gì vậy mn ơi?",
//         create_time: "2025-04-07T15:35:10Z",
//         likes: 34,
//         replies: [
//             {
//                 username: "petdaily",
//                 display_name: "Pet Daily 🐶🐱",
//                 profile_picture:
//                     "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//                 comment: "Bài: 'Em là kẻ mộng mơ - Hoàng Dũng' á",
//                 create_time: "2025-04-07T15:35:45Z",
//                 likes: 26,
//             },
//         ],
//     },
//     {
//         username: "petdaily",
//         display_name: "Pet Daily 🐶🐱",
//         profile_picture:
//             "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//         comment: "Tiktok này chill thật luôn ấy 😌",
//         create_time: "2025-04-07T15:35:55Z",
//         likes: 178,
//         replies: [],
//     },
// ];

function PostItemDetails() {
    const { id } = useParams();
    const postStack = useSelector((state) => state.post.postStack);
    const goBack = useBackToPreviousPage();
  
    const [currentPost, setCurrentPost] = useState(null);
    const [comments,setComments] = useState([])
        const dispatch = useDispatch();
        const user = useSelector(state => state.user.user);
        const likePosts = useSelector(state => state.user.likePosts);
        const savePosts = useSelector(state => state.user.savePosts);
        const isLiked = likePosts?.some(likePost => likePost.postId === currentPost?._id);
        const isSaved = savePosts?.some(savePost => savePost.postId === currentPost?._id);
        const [numOfLikes, setNumOfLikes] = useState(0);
        const [numOfSave, setNumOfSave] = useState(0);
  
    const ratio = 9 / 16;
    const height = window.innerHeight;
    const width = height * ratio;
  

  
    useEffect(() => {
      const fetchData = async () => {
        const res = await createAxiosInstance(BASE_URL).get(
          SUMMARY_API.post.get.byID.replace(":postID", id)
        );
        setCurrentPost(res.data);
        
      setNumOfLikes(res.data.numOfLikes);
      setNumOfSave(res.data.numOfSave);
      };
      fetchData();


      const fetchComment = async ()=>{
        const res = await createAxiosInstance(BASE_URL).get(
          SUMMARY_API.comment.get.byPostID.replace(":postID", id)
        );
        setComments(res.data);
        console.log(res.data)
      }
      fetchComment();
    }, [id]);
  
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
      if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
      if (num >= 10000) return (num / 1000).toFixed(1) + "K";
      return num;
    };
    const handleLikePost = async ()=>{
      const AxiosInstance = createAxiosInstance(BASE_URL);
      const resjson = await AxiosInstance.post(SUMMARY_API.likePost.post.click,{
      userId: user._id,
      postId: currentPost._id,
     })
     if(resjson.success){
      if(likePosts.some(likePost => likePost.postId === currentPost._id)){
          dispatch(removeLikePost(currentPost._id))
          setNumOfLikes(numOfLikes - 1);
     }else{
          dispatch(addLikePost(resjson.data))
          setNumOfLikes(numOfLikes + 1);
     }
    }
  }
  const handleSavePost = async ()=>{
      const AxiosInstance = createAxiosInstance(BASE_URL);
      const resjson = await AxiosInstance.post(SUMMARY_API.savePost.post.click,{
          userId: user._id,
          postId: currentPost._id,
      })
      if(resjson.success){
          if(savePosts.some(savePost => savePost.postId === currentPost._id)){
              dispatch(removeSavePost(currentPost._id))
              setNumOfSave(numOfSave - 1);
          }else{
              dispatch(addSavePost(resjson.data))
              setNumOfSave(numOfSave + 1);
          }
      }
  }
  
    return (
      <div className="w-screen h-screen grid grid-cols-[70vw_30vw] relative overflow-hidden">
        {/* Left Side: Video or Images */}
        <div className="relative w-full h-full">
          <div
            className="fixed top-10 left-[35vw] z-[999] transform -translate-x-1/2 backdrop-blur-2xl flex justify-center"
            style={{ width: width }}
          >
            <input
              type="text"
              placeholder="Tìm kiếm ..."
              className="outline-none border-[1px] p-4 rounded-4xl w-[90%] text-neutral-50 border-neutral-50"
            />
            <div className="p-3 border-l text-neutral-50 absolute right-[30px] top-1/2 transform -translate-y-1/2 border-neutral-50">
              <CiSearch size={30} />
            </div>
          </div>
  
          <div className="fixed top-10 left-10 z-[999]">
            <MdCancel
              size={60}
              className="text-white/80 cursor-pointer"
              onClick={goBack} // Dùng hook gọn
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
          <div className="absolute inset-0 bg-black/80 z-10" />
  
          <div className="relative z-20 flex items-center justify-center">
            {currentPost &&
              (currentPost?.type === "video" ? (
                <VideoItemDetails media={currentPost?.media} />
              ) : (
                <ImagesItem media={currentPost?.media} />
              ))}
          </div>
        </div>
  
        {/* Right Side: Info */}
        {currentPost && (
          <div className="relative z-20 flex flex-col p-4 gap-4 text-black w-full bg-white rounded-lg">
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
                      {currentPost.user.username === "hnh5072" && (
                        <FiAlertTriangle className="text-yellow-400" />
                      )}
                    </div>
                    <p className="text-sm text-neutral-700">
                      @{currentPost.user.username}
                    </p>
                  </div>
                </div>
              </div>
              <button className="bg-primary text-white font-semibold px-4 py-1 rounded-lg">
                Follow
              </button>
            </div>
  
            {currentPost.caption && (
              <p className="text-lg text-neutral-900">{currentPost.caption}</p>
            )}
  
            <div className="flex justify-between items-center text-sm">
              <div className="flex gap-4 text-neutral-900">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => handleLikePost()}
                >
                  <div className="flex items-center justify-center rounded-full w-8 h-8 bg-neutral-200">
                    <FaHeart
                      size={16}
                      className={isLiked ? "text-red-600" : ""}
                    />
                  </div>
                  <p className="text-[12px] font-bold text-neutral-900">
                    {convertNumToString(numOfLikes)}
                  </p>
                </div>
  
                <div className="flex items-center gap-2 cursor-pointer">
                  <div className="flex items-center justify-center rounded-full w-8 h-8 bg-neutral-200">
                    <BiSolidMessageRoundedDots size={16} />
                  </div>
                  <p className="text-[12px] font-bold text-neutral-900">
                    {convertNumToString(currentPost.numOfComments)}
                  </p>
                </div>
  
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => handleSavePost()}
                >
                  <div className="flex items-center justify-center rounded-full w-8 h-8 bg-neutral-200">
                    <IoBookmark
                      size={16}
                      className={isSaved ? "text-orange-400" : ""}
                    />
                  </div>
                  <p className="text-[12px] font-bold text-neutral-900">
                    {convertNumToString(numOfSave)}
                  </p>
                </div>
              </div>
  
              <div className="flex items-center gap-2 text-white">
                <div className="w-6 h-6 rounded-full flex items-center cursor-pointer justify-center bg-yellow-400">
                  <FaRepeat size={14} />
                </div>
                <div className="w-6 h-6 rounded-full flex items-center cursor-pointer justify-center bg-neutral-400">
                  <ImEmbed2 size={14} />
                </div>
                <div className="w-6 h-6 rounded-full flex items-center cursor-pointer justify-center bg-primary">
                  <RiSendPlaneFill size={16} />
                </div>
                <div className="w-6 h-6 rounded-full flex items-center cursor-pointer justify-center bg-blue-600">
                  <FaFacebookF size={14} />
                </div>
                <div className="w-6 h-6 rounded-full flex items-center cursor-pointer justify-center bg-green-600">
                  <FaPhoneAlt size={14} />
                </div>
                <div className="w-6 h-6 rounded-full flex items-center cursor-pointer justify-center bg-transparent">
                  <IoIosShareAlt size={14} />
                </div>
              </div>
            </div>
  
            <CommentsSection comments={comments} setComments={setComments}></CommentsSection>
          </div>
        )}
      </div>
    );
  }

export default PostItemDetails;
