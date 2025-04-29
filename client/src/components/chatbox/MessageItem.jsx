function MessageItem({ type, text, isSender, time }) {
  if (type === "system") {
    return (
      <div className="flex justify-center my-4">
        <div className="bg-gray-100 text-gray-600 text-xs px-3 py-2 rounded-md max-w-[80%] text-center">
          {text}
          {time && <div className="text-[10px] text-gray-400 mt-1">{time}</div>}
        </div>
      </div>
    )
  }

  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-3`}>
      {!isSender && (
        <div className="mr-2 flex-shrink-0">
          <img src="/placeholder.svg?height=32&width=32" alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
        </div>
      )}
      <div className="flex flex-col">
        <div
          className={`px-3 py-2 rounded-2xl max-w-[240px] break-words ${
            isSender ? "bg-gray-200 text-gray-800 rounded-tr-none" : "bg-white border border-gray-300 text-gray-800 rounded-tl-none"
          }`}
        >
          {text}
        </div>
        {time && (
          <div className={`text-[10px] text-gray-400 mt-1 ${isSender ? "text-right" : "text-left"}`}>{time}</div>
        )}
      </div>
    </div>
  )
}

export default MessageItem