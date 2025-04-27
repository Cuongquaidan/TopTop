import { useEffect, useRef, useState } from "react"
import { FaEllipsisH, FaSmile } from "react-icons/fa"
import { FaAt, FaHeart } from "react-icons/fa6"
import CommentItem from "./CommentItem"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import createAxiosInstance from "../libs/axios/AxiosInstance"
import { BASE_URL, SUMMARY_API } from "../shared/Route"

// Sample creator videos
const creatorVideos = [
  {
    id: "video1",
    thumbnail: "https://source.unsplash.com/random/400x300?sig=10",
    title: "Bài tập giảm mỡ bụng hiệu quả",
    views: "1.2M",
    date: "2025-04-15",
  },
  {
    id: "video2",
    thumbnail: "https://source.unsplash.com/random/400x300?sig=11",
    title: "Chia sẻ bí quyết làm đẹp",
    views: "890K",
    date: "2025-04-10",
  },
  {
    id: "video3",
    thumbnail: "https://source.unsplash.com/random/400x300?sig=12",
    title: "Vlog cuối tuần cùng gia đình",
    views: "560K",
    date: "2025-04-05",
  },
]
export default function CommentsSection({comments=[],setComments=()=>{}}) {
  const {id} = useParams()
  const user = useSelector(state => state.user.user)
  const [replyingTo, setReplyingTo] = useState(null)
  const [newComment, setNewComment] = useState({
    parentId: "",
    content: "",
  })
  const [activeTab, setActiveTab] = useState("comments")
  const [likedComments, setLikedComments] = useState([])
  const inputRef = useRef(null)

  const handleSubmitComment = async() => {
    if (!newComment.content.trim()) return
    
    const AxiosInstance = createAxiosInstance(BASE_URL);
    const resjson =await AxiosInstance.post("/comment/create", {
      postId: id,
      userId: user._id,
      parentId: newComment.parentId,
      content: newComment.content,
    })
    if(resjson.success){
      setComments(prev => [resjson.data, ...prev])
      setNewComment({
        parentId: null,
      content: "",
      })
      setReplyingTo(null)

    }
   
  }
  

  useEffect(()=>{
    if (inputRef.current) {
      inputRef.current.focus()
    }
    setNewComment(prev => ({
      ...prev,
      content: replyingTo ? `@${replyingTo.username} ` : "",
      parentId: replyingTo ? (replyingTo.parentId? replyingTo.parentId: replyingTo.id): null
    }))
  },[replyingTo])

  useEffect(()=>{
    const fetchComment  = async () => {
      const AxiosInstance = createAxiosInstance(BASE_URL);
     const resjson = await AxiosInstance.get(SUMMARY_API.likeComment.get.byUserID.replace(":userID", user._id))
     if(resjson.success){
      setLikedComments(resjson.data)
     }
    }
    fetchComment()
  },[])
   
  

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date)
  }

  return (
    <div className="bg-white w-full mx-auto border border-gray-200 shadow-sm">
      {/* Tabs */}
      <div className="grid grid-cols-2 border-b">
        <button
          className={`py-3 font-semibold ${activeTab === "comments" ? "border-b-2 border-black" : "text-gray-500"}`}
          onClick={() => setActiveTab("comments")}
        >
          Bình luận ({comments.length})
        </button>
        <button
          className={`py-3 font-semibold ${activeTab === "creator" ? "border-b-2 border-black" : "text-gray-500"}`}
          onClick={() => setActiveTab("creator")}
        >
          Video của nhà sáng tạo
        </button>
      </div>

      {/* Comments tab */}
      {activeTab === "comments" && (
        <div className="flex flex-col h-[70vh] relative">
          <div className=" h-full overflow-y-auto pb-20">
            {comments.filter((item)=> item.parentId === null).map((comment) => (
              <CommentItem comment={comment}  replies={
                comments.filter((item) => item.parentId === comment._id)
              } key={comment._id}  setReplyingTo={setReplyingTo} likedComments={likedComments} setLikedComments={setLikedComments} ></CommentItem>
            ))}
          </div>

          {/* Comment input */}
          <div className="p-3 absolute bottom-0 left-0 w-full border-t border-gray-400 mt-auto flex flex-col  items-center gap-2 bg-gray-50">
            <div className="flex w-full">
            <input
              ref={inputRef}
              type="text"
              placeholder="Thêm bình luận..."
              className="flex-1 outline-none bg-gray-200 rounded text-sm p-2"
              value={newComment.content}
              onChange={(e) => setNewComment({...newComment, content: e.target.value})}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmitComment()
                }
              }}
            />
            <div className="flex items-center gap-2">
              <button className="text-gray-500">
                <FaAt className="w-5 h-5" />
              </button>
              <button className="text-gray-500">
                <FaSmile className="w-5 h-5" />
              </button>
              <button
                className={`px-3 py-1 text-sm outline-none ${
                  newComment.content.trim() ? "text-gray-600 hover:text-gray-800 cursor-pointer" : "text-gray-400 cursor-not-allowed"
                }`}
                disabled={!newComment.content.trim()}
                onClick={handleSubmitComment}
              >
                Đăng
              </button>
            </div>
            </div>
            {replyingTo?.username && (
        <div className="p-2 bg-gray-100 w-full text-sm flex justify-between text-gray-500 border-t">
         <p> Đang trả lời bình luận: {replyingTo.username}</p>
          <button className=" text-blue-500 hover:underline" onClick={() => setReplyingTo(null)}>
            Hủy
          </button>
        </div>
      )}
          </div>
       
        </div>
      )}

      {/* Creator videos tab */}
      {activeTab === "creator" && (
        <div className="max-h-[500px] overflow-y-auto p-2">
          {creatorVideos.map((video) => (
            <div key={video.id} className="flex gap-3 p-2 border-b last:border-b-0">
              <div className="w-24 h-16 rounded overflow-hidden flex-shrink-0">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-sm line-clamp-2">{video.title}</h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                  <span>{video.views} lượt xem</span>
                  <span>•</span>
                  <span>{formatDate(video.date)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
