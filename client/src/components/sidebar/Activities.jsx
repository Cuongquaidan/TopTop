import React from 'react'
import notifications from '../../data/NotificationsData';
import { MdCancel } from 'react-icons/md';

function Activities({option, setOption}) {
  return (
      <div className='w-[400px] bg-white'>    
        <div className="flex justify-between px-6 mb-6">
            <p className="text-xl font-bold">Thông báo hệ thống</p>
              <button className="flex items-center justify-center w-6 h-6 p-0 rounded-full cursor-pointer text-neutral-300">
                <MdCancel
                  size={30}
                  onClick={() => {
                    setOption(""); }} />
                    </button>
         </div>
         <div className="flex flex-col h-full gap-4 px-5 overflow-y-scroll grow hidden-scroll-bar">
         {notifications.map((noti) => (
  <div
    key={noti.id}
    className="bg-[#f8f8f8] border border-neutral-200 rounded-md shadow-sm p-4 space-y-2 max-w-sm"
  >
    <div className="flex items-center gap-2 pb-1 font-semibold border-b text-neutral-700 border-neutral-300">
 
      <p className="font-bold text-md">{noti.title}</p>
    </div>

    <p className="text-sm font-medium text-neutral-800">{noti.content}</p>

    
    <p className="text-sm leading-5 text-neutral-700">{noti.description}</p>

   
    {noti.footer && (
      <p className="text-sm text-gray-500">{noti.footer}</p>
    )}

    
    <p className="text-xs text-gray-400">{noti.date}</p>
  </div>
))}


         </div>
                      
        </div>
  )
}

export default Activities