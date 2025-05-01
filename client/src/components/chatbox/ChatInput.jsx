import { useState } from "react"
import { Smile, Paperclip, Send } from "lucide-react"

function ChatInput({ onSend }) {
  const [text, setText] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      onSend(text)
      setText("")
    }
  }

  return (
    <div className="border-t border-gray-300 p-3 bg-white">
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="flex-1 mx-2 relative">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Gửi tin nhắn..."
            className="w-full py-2 px-3 rounded-full border border-gray-300 bg-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <Smile size={20} />
          </button>
        </div>
        <button
          type="submit"
          className={`p-2 rounded-full ${text.trim() ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-500"}`}
          disabled={!text.trim()}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  )
}

export default ChatInput
