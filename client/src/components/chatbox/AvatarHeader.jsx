import { ArrowLeft, MoreVertical, Phone, Video } from "lucide-react"

function AvatarHeader() {
  return (
    <div className="flex items-center p-3 border-b border-gray-300">
      <div className="flex items-center flex-1">
        <div className="flex items-center">
          <div className="relative">
            <img
              src="/placeholder.svg?height=40&width=40"
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover border border-gray-300"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </div>
          <div className="ml-3">
            <div className="font-medium">2222222222</div>
            <div className="text-xs text-gray-500">@thereisnothingthere01</div>
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <MoreVertical size={20} />
        </button>
      </div>
    </div>
  )
}

export default AvatarHeader
