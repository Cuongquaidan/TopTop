import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import data from '../../data/SidebarData'
import adminSidebarData from '../../data/AdminSidebarData'

function LayoutAdmin() {
  const location = useLocation();
  const [currentPathname, setCurrentPathname] = useState(location.pathname);
  useEffect(()=>{
      setCurrentPathname(location.pathname);
  },[location.pathname])

  return (
    <div className='grid grid-cols-[250px_1fr] h-screen overflow-hidden'>
      <div className='bg-white flex flex-col gap-4 p-4 text-sm '>
        
               <Link
                    className="flex text-3xl italic font-black text-primary"
                    to={"/"}
                >
                    <h1 className="flex">
                        T
                        <p >
                            opTop
                        </p>
                    </h1>
                </Link>
          {

            adminSidebarData.map((item, index) => {
              return (
                <Link
                  to={item.href}
                  key={index}
                  className={` text-neutral-600 hover:text-neutral-900 hover:bg-slate-100 flex items-center gap-2 p-2 rounded-lg transition-all border border-transparent hover:border-gray-300 ${currentPathname === item.href ? '!border-gray-300 bg-slate-100 text-neutral-900' : ''} `}
                >
                  <div>{item.icon}</div>
                  <p className='text-md font-semibold'>{item.title}</p>
                </Link>
              )
            }
            )
          }
      </div>
      <div
        className='bg-neutral-100 flex flex-col gap-4 p-6 h-full '
      >
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default LayoutAdmin