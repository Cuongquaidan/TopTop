import React from 'react'
import { FaChevronLeft } from "react-icons/fa";
import { useGlobalContext } from '../../context/AppContext';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
function LoginWithPhone() {
  const {setTypeModal} = useGlobalContext();
  return (
    <div className="space-y-4 py-10 px-6 relative h-full">
      <div className='absolute top-0 left-0 cursor-pointer' onClick={()=>{
        setTypeModal("login");
      }}><FaChevronLeft className='text-gray-700 '/></div>
      <h2 className="text-3xl font-bold text-center">Đăng nhập</h2>

      <label className="text-sm font-medium"></label>
      <div className='flex justify-between items-center '>
        <p className='font-semibold text-md'>Điện thoại</p>
        <p className='text-slate-900 text-sm cursor-pointer hover:underline hover:text-shadow-sm text-shadow-gray-4 ' onClick={()=>{
          setTypeModal("login-with-other");
        }}>Đăng nhập bằng email/username</p>
      </div>
      <div className="flex gap-2 px-2 border rounded bg-[#eee] border-slate-300 text-md font-semibold">
        <button className="cursor-pointer outline-none p-2 border-r-2 border-slate-300">
          VN (+84)
        </button>
        <input type="tel" placeholder="Số điện thoại" className="flex-1 outline-none rounded px-2 py-1 " />
      </div>

      <div className="flex gap-2 px-2 border relative rounded bg-[#eee] border-slate-300 text-lg font-semibold">
        <input type="text" placeholder="Nhập mật khẩu" className="flex-1 outline-none  p-2 " />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
                      <IoMdEye className="text-gray-700" size={20} />
                      {/* <IoMdEyeOff className="text-gray-700" size={20} /> */}
        
                      </div>
        {/* <button className="border-l-2 cursor-pointer p-2 border-slate-300 ">Gửi mã</button> */}
      </div>

      {/* <p className="text-sm cursor-pointer font-semibold hover:underline" onClick={()=>{
        setTypeModal("forgot-password");
      }}>
        Bạn quên mật khẩu?
      </p> */}
      <button className="w-full bg-[#eee] border-slate-300 cursor-pointer font-semibold text-gray-700 py-2 rounded" disabled>Đăng nhập</button>
      
    </div>
  );
}

export default LoginWithPhone