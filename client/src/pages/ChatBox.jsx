"use client"

import { useState, useRef, useEffect } from "react"
import AvatarHeader from "../components/chatbox/AvatarHeader"
import MessageItem from "../components/chatbox/MessageItem"
import ChatInput from "../components/chatbox/ChatInput"

function ChatBox() {
  const [messages, setMessages] = useState([
    {
      type: "system",
      text: "[Loại tin nhắn này không được hỗ trợ. Hãy tải về ứng dụng TikTok để xem tin nhắn này.]",
      time: "16 Tháng Mười Một 2022 14:55",
    },
    {
      type: "user",
      text: "hi",
      isSender: true,
      time: "10:13 AM",
    },
    {
      type: "user",
      text: "Chào buổi sáng!",
      isSender: false,
      time: "10:14 AM",
    },
  ])

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = (text) => {
    if (!text.trim()) return

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text,
        isSender: true,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ])
  }

  return (
    <div className="flex flex-col h-screen bg-gray-200 p-8">
      <div className="flex h-full w-full mx-auto rounded-lg overflow-hidden shadow-lg bg-white">
        <div className="flex flex-col flex-1">
          <AvatarHeader />
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((msg, index) => (
              <MessageItem key={index} {...msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <ChatInput onSend={handleSend} />
        </div>
      </div>
    </div>
  )
}

export default ChatBox
