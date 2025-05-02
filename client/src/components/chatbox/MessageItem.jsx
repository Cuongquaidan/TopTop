import { useSelector } from "react-redux";
import formatTimestamp from "../../helper/formatTimestamps";

function MessageItem({ msg }) {
  const currentUserId = useSelector((state) => state.user.user._id);
  const isSender = msg?.sender?._id == currentUserId;
  console.log(msg, currentUserId, isSender);
  return (
    msg && (
      <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-3`}>
        {!isSender && (
          <div className="mr-2 flex-shrink-0">
            <img
              src={msg.sender?.profile_picture || "/placeholder.svg"}
              alt="Avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
        )}
        <div className="flex flex-col">
          <div
            className={`px-3 py-2 rounded-2xl max-w-[240px] break-words ${
              isSender
                ? "bg-gray-200 text-gray-800 rounded-tr-none"
                : "bg-white border border-gray-300 text-gray-800 rounded-tl-none"
            }`}
          >
            {msg.content}
          </div>
          {msg.createdAt && (
            <div
              className={`text-[10px] text-gray-400 mt-1 ${
                isSender ? "text-right" : "text-left"
              }`}
            >
              {formatTimestamp(msg.createdAt)}
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default MessageItem;
