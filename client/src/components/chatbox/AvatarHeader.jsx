import { ArrowLeft, MoreVertical, Phone, Video } from "lucide-react"
import { useGlobalContext } from "../../context/AppContext"

function AvatarHeader() {
  const { currentChat, currentRecipientId } = useGlobalContext()
  const currentRecipient =
    currentChat[0]?.sender._id !== currentRecipientId
      ? currentChat[0]?.receiver
      : currentChat[0]?.sender

  return (
    <div className="flex items-center p-3 border-b border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900">
      <div className="flex items-center flex-1">
        <div className="flex items-center">
          <div className="relative">
            <img
              src={currentRecipient?.profile_picture || "/placeholder.svg?height=40&width=40"}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-neutral-600"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-neutral-800"></span>
          </div>
          <div className="ml-3">
            <div className="font-medium dark:text-white">{currentRecipient?.display_name || "User"}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">@{currentRecipient?.username || "username"}</div>
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-700">
          <Phone size={20} className="dark:text-gray-300"/>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-700">
          <Video size={20} className="dark:text-gray-300"/>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-700">
          <MoreVertical size={20} className="dark:text-gray-300"/>
        </button>
      </div>
    </div>
  )
}

export default AvatarHeader
