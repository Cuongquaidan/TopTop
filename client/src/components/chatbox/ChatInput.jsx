import { useState } from "react"
import { MdSend, MdAttachFile, MdEmojiEmotions } from "react-icons/md"
import { useGlobalContext } from "../../context/AppContext"
import createAxiosInstance from "../../libs/axios/AxiosInstance"
import { BASE_URL, SUMMARY_API } from "../../shared/Route"

function ChatInput() {
  const { setCurrentChat, setNewMessage, newMessage, socket, setCurrentChats } = useGlobalContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const axiosInstance = createAxiosInstance(BASE_URL);
      const resjson = await axiosInstance.post(
        SUMMARY_API.messages.post.send.replace(":userId", newMessage.sender).replace(":otherUserId", newMessage.receiver),
        {
          content: newMessage.content,
          sender: newMessage.sender,
          receiver: newMessage.receiver,
        }
      )
      if(resjson.success){
        setCurrentChat((prev) => [...prev, resjson.data])
        setNewMessage({ ...newMessage, content: "" })
        socket.emit("sendMessage", resjson.data)
        setCurrentChats((prev) => {
          const indexN = prev.findIndex(chat => chat.user._id === resjson.data.receiver._id);
          if (indexN !== -1) {
            const updated = [...prev];
            updated[indexN] = {
              ...updated[indexN],
              message: {
                ...updated[indexN].message,
                content: resjson.data.content,
                createdAt: resjson.data.createdAt,
              },
            };
            return updated;
          }
        })
      }
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  return (
    <div className="border-t border-gray-300 dark:border-neutral-700 p-3 bg-white dark:bg-neutral-900">
      <form onSubmit={handleSubmit} className="flex items-center">
        <button
          type="button"
          className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-neutral-700"
        >
          <MdAttachFile size={20} />
        </button>
        <div className="flex-1 mx-2 relative">
          <input
            type="text"
            value={newMessage.content}
            onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
            placeholder="Gửi tin nhắn..."
            className="w-full py-2 px-3 rounded-full border border-gray-300 dark:border-neutral-600 bg-gray-100 dark:bg-neutral-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-neutral-500"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <MdEmojiEmotions size={20} />
          </button>
        </div>
        <button
          type="submit"
          className={`p-2 rounded-full ${
            newMessage.content.trim()
              ? "bg-gray-800 text-white dark:bg-neutral-700"
              : "bg-gray-200 text-gray-500 dark:bg-neutral-800 dark:text-gray-400"
          }`}
          disabled={!newMessage.content.trim()}
        >
          <MdSend size={20} />
        </button>
      </form>
    </div>
  )
}

export default ChatInput
