

import { MdSearch, MdSettings } from "react-icons/md"
import { useGlobalContext } from "../../context/AppContext"
import formatTimestamp from "../../helper/formatTimestamps"


function ChatSidebar() {
  const { currentChats, setRecipientId, recipientId } = useGlobalContext()
 

  // Format timestamp to relative time (e.g., "2 hours ago")



  return (
    <div className="w-full min-w-[400px] md:w-80  bg-white">
      <div className="p-3 border-b border-gray-300">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Messages</h2>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <MdSettings size={20} className="text-gray-600" />
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full py-2 px-9 rounded-full border border-gray-300 bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
          <MdSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-80px)]">
        {currentChats.map((chat) => (
          <div
            key={chat.user._id}
            onClick={() => setRecipientId(chat.user._id)}
            className={`flex items-center p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
              recipientId === chat.user._id ? "bg-gray-100" : ""
            }`}
          >
            <div className="relative mr-3">
              <img
                src={chat.user.profile_picture || "/placeholder.svg?height=48&width=48"}
                alt={chat.user.display_name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <p className="font-medium truncate">{chat.user.display_name}</p>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {formatTimestamp(chat.message.createdAt)}
                </span>
              </div>
              <p className="text-sm text-gray-500 truncate">{chat.message.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatSidebar
