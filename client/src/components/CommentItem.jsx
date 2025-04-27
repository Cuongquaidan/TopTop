import React, { useState } from 'react'
import { FaEllipsisH } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa6'

function CommentItem({comment, replies, level = 1, setReplyingTo}) {
  

  const [isShowMore, setIsShowMore] = useState(false)
    
    const [likedComments, setLikedComments] = useState({})
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays < 1) {
      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
      return `${diffInHours} giờ trước`
    } else {
      return `${diffInDays} ngày trước`
    }
  }
  const toggleLike = (commentId) => {
    setLikedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }))
  }

  const handleReply = (comment) => {
    setReplyingTo({ id: comment._id, parentId: comment.parentId , username: comment.userId.username })
    

    
  }
  const paddingValue = `${level * 20}px`;
 
  return (
                  <div key={comment._id} className='mt-2' style={{ paddingLeft: paddingValue }}>
                    <div className="flex gap-3">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={comment.userId.profile_picture || "/placeholder.svg"}
                          alt={comment.userId.display_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
    
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            {/* Username and content */}
                            <div className="font-semibold text-sm">{comment.userId.display_name}</div>
                            <div className="text-sm whitespace-pre-line">{comment.content}</div>
    
                            {/* Timestamp and reply button */}
                            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                              <span>{formatTimeAgo(comment.createdAt)}</span>
                              <span>·</span>
                              <button
                                className="hover:underline"
                                onClick={() => handleReply(comment)}
                              >
                                Trả lời
                              </button>
                            </div>
                          </div>
    
                          {/* Like button and more options */}
                          <div className="flex flex-col items-center">
                            <button className="p-1">
                              <FaEllipsisH className="w-4 h-4 text-gray-400" />
                            </button>
                            <button onClick={() => toggleLike(comment._id)} className="p-1">
                              <FaHeart
                                className={`w-4 h-4 ${likedComments[comment._id] ? "text-red-500" : "text-gray-300"}`}
                              />
                            </button>
                            <span className="text-xs text-gray-500">
                              {likedComments[comment._id] ? comment.numOfLikes + 1 : comment.numOfLikes}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {replies && replies.length > 0 && (
        <div className="">
          {/* Hiển thị reply đầu tiên hoặc tất cả */}
          {replies
            .slice(0, isShowMore ? replies.length : 1)
            .map((reply) => (
              <CommentItem
                key={reply._id}
                comment={reply}
                level={level + 1}
                setReplyingTo={setReplyingTo}
              />
            ))}

          {/* Nút hiển thị thêm khi có nhiều hơn 1 reply */}
          {replies.length > 1 && (
            <button
              onClick={() => setIsShowMore(!isShowMore)}
              className="text-xs text-gray-500 hover:underline"
              style={{ marginLeft: `${(level + 1) * 20}px` }}
            >
              {isShowMore
                ? 'Ẩn bớt'
                : `Hiển thị thêm ${replies.length - 1} câu trả lời`}
            </button>
          )}
        </div>
      )}
                    
                  </div>
  )
}

export default CommentItem