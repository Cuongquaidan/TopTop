import React from 'react'
import { MdCancel } from 'react-icons/md';
import { CiUser } from "react-icons/ci";

function Messages({option, setOption}) {
  return (
    <div className='w-full min-w-[400px] bg-white'>    
    <div className="flex justify-between px-6 mb-6">
        <p className="text-xl font-bold">Tin nhắn</p>
          <button className="flex items-center justify-center w-6 h-6 p-0 rounded-full cursor-pointer text-neutral-300">
            <MdCancel
              size={30}
              onClick={() => {
                setOption(""); }} />
                </button>
     </div>
     <div className="flex flex-col h-full overflow-y-scroll grow hidden-scroll-bar">
                <div className='flex items-center justify-between bg-slate-100'>
                  <div className='flex items-center justify-center w-14 h-14'>
                    <CiUser size={32} className='text-neutral-500'/>
                  </div>
                  
                  <p className='items-center text-sm font-semibold grow'>Chưa có tin nhắn nào</p>
                </div>

     </div>
                  
    </div>
  )
}

export default Messages