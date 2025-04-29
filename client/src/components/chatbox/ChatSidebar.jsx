import { Search, Settings } from "lucide-react"

function ChatSidebar() {
  const conversations = [
    { id: 1, name: "Jane Cooper", message: "Hey! How are you?", time: "2m", unread: 3 },
    { id: 2, name: "Wade Warren", message: "I'll be there soon", time: "1h", unread: 0 },
    { id: 3, name: "Esther Howard", message: "Thanks for your help", time: "2h", unread: 0 },
    { id: 4, name: "Cameron Williamson", message: "Did you see the news?", time: "1d", unread: 1 },
  ]

  return (
    <div className="w-80 border-r bg-white hidden md:block">
      <div className="p-3 border-b">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold">Messages</h2>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Settings size={20} />
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search conversations"
            className="w-full py-2 pl-9 pr-3 rounded-full border focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div className="overflow-y-auto h-[calc(100%-73px)]">
        {conversations.map((chat) => (
          <div key={chat.id} className="flex items-center p-3 border-b hover:bg-gray-50 cursor-pointer">
            <div className="relative mr-3">
              <img
                src={`/placeholder.svg?height=48&width=48&text=${chat.name.charAt(0)}`}
                alt={chat.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {chat.unread > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {chat.unread}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <h3 className="font-medium truncate">{chat.name}</h3>
                <span className="text-xs text-gray-500">{chat.time}</span>
              </div>
              <p className="text-sm text-gray-500 truncate">{chat.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatSidebar
