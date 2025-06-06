
import { useState, useRef, useEffect } from "react"
import AvatarHeader from "../components/chatbox/AvatarHeader"
import MessageItem from "../components/chatbox/MessageItem"
import ChatInput from "../components/chatbox/ChatInput"
import { useGlobalContext } from "../context/AppContext"

function ChatBox() {
  const { setOption } = useGlobalContext();
  const { currentChat, recipientId } = useGlobalContext()

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentChat])

  useEffect(() => {
    setOption("messages")
    return () => {
      setOption("");
    }
  }, [])

  return (
    <div className="flex flex-col h-[100%] overflow-scroll hidden-scroll-bar w-[calc(100%-80px)] ml-auto bg-gray-200 dark:bg-neutral-800 p-8 z-[999] relative">
      <div className="flex h-full w-full mx-auto rounded-lg overflow-hidden shadow-lg bg-white dark:bg-neutral-900">
        {
          !recipientId ? (
            <div className="flex items-center justify-center w-full h-full">
              <p className="text-lg text-gray-600 dark:text-gray-300 font-semibold">
                Select a chat to start messaging
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-col flex-1">
                <AvatarHeader />
                <div className="flex-1 overflow-y-auto hidden-scroll-bar p-4 bg-gray-50 dark:bg-neutral-800">
                  {[...currentChat].map((msg, index) => (
                    <MessageItem key={index} msg={msg} />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <ChatInput />
              </div>
            </>
          )
        }
      </div>
    </div>
  )
}

export default ChatBox
