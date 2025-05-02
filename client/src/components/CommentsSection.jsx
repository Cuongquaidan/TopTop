import { useEffect, useRef, useState } from "react"
import { FaEllipsisH, FaSmile } from "react-icons/fa"
import { FaAt, FaHeart } from "react-icons/fa6"
import CommentItem from "./CommentItem"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import createAxiosInstance from "../libs/axios/AxiosInstance"
import { BASE_URL, SUMMARY_API } from "../shared/Route"
import { toast } from "react-toastify"
import CreatorVideoItem from "./CreatorVideoItem"

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
  const [creatorVideos,setCreatorVideos]=useState([])
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

    const fetchcCreatorVideos=async()=>{
      try {
        const axiosInstance=createAxiosInstance(BASE_URL)
        const resCreator=await axiosInstance.get(SUMMARY_API.post.get.byID.replace(":postID",id))
        const resCreatorPosts=await axiosInstance.get(SUMMARY_API.post.get.byUser.replace(":user",resCreator.data.user._id))
        let creatorVideos=resCreatorPosts.data.filter(item=>item.type==="video")
        setCreatorVideos(creatorVideos)
      } catch (error) {
        toast.error(error.message||"Lỗi khi fetchCreaterVideos")
      }
    }
    fetchcCreatorVideos()
  },[])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date)
  }

  return (
    <div className="bg-white dark:bg-neutral-900 w-full mx-auto border border-gray-200 dark:border-neutral-700 shadow-sm">
      <div className="grid grid-cols-2 border-b dark:border-neutral-700">
        <button className={`py-3 font-semibold ${activeTab === "comments" ? "border-b-2 border-black dark:border-white" : "text-gray-500 dark:text-gray-400"}`} onClick={() => setActiveTab("comments")}>Bình luận ({comments.length})</button>
        <button className={`py-3 font-semibold ${activeTab === "creator" ? "border-b-2 border-black dark:border-white" : "text-gray-500 dark:text-gray-400"}`} onClick={() => setActiveTab("creator")}>Video của nhà sáng tạo</button>
      </div>

      {activeTab === "comments" && (
        <div className="flex flex-col h-[70vh] relative">
          <div className="h-full overflow-y-auto pb-20 hidden-scroll-bar">
            {comments.filter((item)=> item.parentId === null).map((comment) => (
              <CommentItem comment={comment}  replies={comments.filter((item) => item.parentId === comment._id)} key={comment._id}  setReplyingTo={setReplyingTo} likedComments={likedComments} setLikedComments={setLikedComments} />
            ))}
          </div>

          <div className="p-3 absolute bottom-0 left-0 w-full border-t border-gray-400 dark:border-gray-600 mt-auto flex flex-col items-center gap-2 bg-gray-50 dark:bg-neutral-800">
            <div className="flex w-full">
              <input ref={inputRef} type="text" placeholder="Thêm bình luận..." className="flex-1 outline-none bg-gray-200 dark:bg-neutral-700 dark:text-white rounded text-sm p-2" value={newComment.content} onChange={(e) => setNewComment({...newComment, content: e.target.value})} onKeyDown={(e) => { if (e.key === "Enter") { handleSubmitComment() }}} />
              <div className="flex items-center gap-2">
                <button className="text-gray-500 dark:text-gray-300"><FaAt className="w-5 h-5" /></button>
                <button className="text-gray-500 dark:text-gray-300"><FaSmile className="w-5 h-5" /></button>
                <button className={`px-3 py-1 text-sm outline-none ${newComment.content.trim() ? "text-gray-600 hover:text-gray-800 dark:text-white dark:hover:text-primary cursor-pointer" : "text-gray-400 dark:text-gray-500 cursor-not-allowed"}`} disabled={!newComment.content.trim()} onClick={handleSubmitComment}>Đăng</button>
              </div>
            </div>
            {replyingTo?.username && (
              <div className="p-2 bg-gray-100 dark:bg-neutral-700 w-full text-sm flex justify-between text-gray-500 dark:text-gray-300 border-t dark:border-neutral-600">
                <p>Đang trả lời bình luận: {replyingTo.username}</p>
                <button className="text-blue-500 hover:underline" onClick={() => setReplyingTo(null)}>Hủy</button>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "creator" && (
        <div className="max-h-[500px] flex flex-wrap w-full overflow-y-auto p-2 gap-3">
          {creatorVideos.map((video,index) => (
            <CreatorVideoItem key={index} item={video}/>
          ))}
        </div>
      )}
    </div>
  )
}
