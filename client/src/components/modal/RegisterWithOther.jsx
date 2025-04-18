import React, { useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { useGlobalContext } from '../../context/AppContext';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

function RegisterWithOther() {
  const { setTypeModal } = useGlobalContext();

  // State to toggle password visibility for both password fields
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="space-y-4 py-10 px-6 relative h-full">
      <div className='absolute top-0 left-0 cursor-pointer' onClick={() => {
        setTypeModal("register");
      }}>
        <FaChevronLeft className='text-gray-700 '/>
      </div>
      <h2 className="text-3xl font-bold text-center">Đăng kí</h2>

      <label className="text-sm font-medium"></label>
      <div className='flex justify-between items-center '>
        <p className='font-semibold text-md'>Email/Username</p>
        <p className='text-slate-900 text-sm cursor-pointer hover:underline hover:text-shadow-sm text-shadow-gray-400 ' onClick={() => {
          setTypeModal("register-with-phone");
        }}>
          Đăng kí bằng số điện thoại
        </p>
      </div>
      <div className="flex gap-2 px-2 border rounded bg-[#eee] border-slate-300 text-lg font-semibold">
        <input type="text" placeholder="Email/username" className="flex-1 outline-none rounded p-2  " />
      </div>

      {/* Password Input with show/hide functionality */}
      <div className="flex gap-2 px-2 border relative rounded bg-[#eee] border-slate-300 text-lg font-semibold">
        <input 
          type={showPassword ? "text" : "password"} 
          placeholder="Nhập mật khẩu" 
          className="flex-1 outline-none  p-2 " 
        />
        <div 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <IoMdEyeOff className="text-gray-700" size={20} />
          ) : (
            <IoMdEye className="text-gray-700" size={20} />
          )}
        </div>
      </div>

      {/* Confirm Password Input with show/hide functionality */}
      <div className="flex gap-2 px-2 border relative rounded bg-[#eee] border-slate-300 text-lg font-semibold">
        <input 
          type={showConfirmPassword ? "text" : "password"} 
          placeholder="Nhập lại mật khẩu" 
          className="flex-1 outline-none  p-2 " 
        />
        <div 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? (
            <IoMdEyeOff className="text-gray-700" size={20} />
          ) : (
            <IoMdEye className="text-gray-700" size={20} />
          )}
        </div>
      </div>

      <button className="w-full bg-[#eee] border-slate-300 cursor-pointer font-semibold text-gray-700 py-2 rounded" disabled>Đăng kí</button>
    </div>
  );
}

export default RegisterWithOther;
