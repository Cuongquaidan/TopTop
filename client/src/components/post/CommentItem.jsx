import React, { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";

function CommentItem({ comment }) {
    const [visibleReplies, setVisibleReplies] = useState(1);
    const convertNumToString = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M";
        }
        if (num >= 10000) {
            return (num / 1000).toFixed(1) + "K";
        }

        return num;
    };
    const formatTime = (timestamp) => {
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
    return (
        <div className="flex gap-3">
            <img
                src={comment.profile_picture}
                className="w-10 h-10 rounded-full object-cover"
                alt={comment.username}
            />
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">
                        {comment.username}
                    </span>
                    <span className="text-xs text-neutral-400">
                        {formatTime(comment.create_time)}
                    </span>
                </div>
                <p className="text-sm">{comment.comment}</p>

                {/* Comment Actions */}
                <div className="flex items-center gap-4 mt-1">
                    <button className="text-neutral-400 hover:text-white text-xs flex items-center gap-1">
                        <AiOutlineLike /> {convertNumToString(comment.likes)}
                    </button>
                </div>

                {/* Replies */}
                {comment?.replies?.length > 0 && (
                    <div className="mt-2 ml-2 border-l-2 border-white/10 pl-4">
                        {comment.replies
                            .slice(0, visibleReplies)
                            .map((reply) => (
                                <CommentItem
                                    key={reply.create_time}
                                    comment={reply}
                                    formatTime={formatTime}
                                />
                            ))}
                        {comment.replies.length > visibleReplies && (
                            <button
                                className="text-pink-400 text-xs mt-2 flex items-center gap-1"
                                onClick={() =>
                                    setVisibleReplies((prev) => prev + 2)
                                }
                            >
                                Xem thêm{" "}
                                {comment.replies.length - visibleReplies} câu
                                trả lời
                                <FiChevronDown />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommentItem;
