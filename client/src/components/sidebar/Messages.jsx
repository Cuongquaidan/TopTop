import React from 'react'
import { MdCancel } from 'react-icons/md';
import { CiUser } from "react-icons/ci";
import { useGlobalContext } from '../../context/AppContext';
import ChatSidebar from '../chatbox/ChatSidebar';

function Messages({option, setOption}) {
  const {currentChats} = useGlobalContext();
  return (
    <>
      { currentChats?.length === 0 ? (
        <div className='w-full min-w-[400px] bg-white dark:bg-neutral-900 dark:text-gray-200'>    
          <div className="flex justify-between px-6 mb-6">
              <p className="text-xl font-bold dark:text-white">Tin nhắn</p>
              <button className="flex items-center justify-center w-6 h-6 p-0 rounded-full cursor-pointer text-neutral-300 dark:text-neutral-400">
                <MdCancel
                  size={30}
                  onClick={() => {
                    setOption(""); }} />
              </button>
          </div>
          <div className="flex flex-col h-full overflow-y-scroll grow hidden-scroll-bar">
            <div className='flex items-center justify-between bg-slate-100 dark:bg-neutral-800'>
              <div className='flex items-center justify-center w-14 h-14'>
                <CiUser size={32} className='text-neutral-500 dark:text-neutral-400'/>
              </div>
              
              <p className='items-center text-sm font-semibold grow dark:text-white'>Chưa có tin nhắn nào</p>
            </div>
          </div>
        </div>
      ):(
        <ChatSidebar></ChatSidebar>
      )}
    </>
  )
}

export default Messages