import React, { useState } from 'react';
import { FaChevronLeft } from "react-icons/fa";
import { useGlobalContext } from '../../context/AppContext';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import createAxiosInstance from '../../libs/axios/AxiosInstance';
import { BASE_URL, SUMMARY_API } from '../../shared/Route';
function RegisterWithPhone() {
  const { setTypeModal } = useGlobalContext();

  // State to toggle password visibility for both password fields
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {register, handleSubmit, watch, reset,formState:{errors,isSubmitting,isSubmitSuccessful}} = useForm({
    defaultValues:{
      phone: "",
      password: "",
      confirmPassword: ""
    }
  });
  const submit = async (data) => {
    try {
      const axiosInstance = createAxiosInstance(BASE_URL);
      const data =  await axiosInstance.post(SUMMARY_API.auth.register, {
        phone: data.phone,
        password: data.password
      });
      
       if(data.success) {
        toast.success(data.message || "Đăng ký thành công!");
        setTypeModal("login-with-phone");
        reset();
      }
     
    } catch (error) {
      // toast.error(error.response?.data?.message || "Đăng ký thất bại!");
      console.log(error.response?.data?.message || "Đăng ký thất bại!");
    }
  };
  return (
    <form className="relative h-full px-6 py-10 space-y-4" onSubmit={handleSubmit((data)=>{
        submit(data)
    })}>
      <div className='absolute top-0 left-0 cursor-pointer' onClick={() => {
        setTypeModal("register");
      }}>
        <FaChevronLeft className='text-gray-700 '/>
      </div>
      <h2 className="text-3xl font-bold text-center">Đăng ký</h2>

      <label className="text-sm font-medium"></label>
      <div className='flex items-center justify-between '>
        <p className='font-semibold text-md'>Điện thoại</p>
        <p className='text-sm cursor-pointer text-slate-900 hover:underline hover:text-shadow-sm text-shadow-gray-400 ' onClick={() => {
          setTypeModal("register-with-other");
        }}>
          Đăng ký bằng email/username
        </p>
      </div>
      <div className="flex gap-2 px-2 border rounded bg-[#eee] border-slate-300 text-md font-semibold">
        <button type='button' className="p-2 border-r-2 outline-none cursor-pointer border-slate-300">
          VN (+84)
        </button>
        <input type="text" placeholder="Số điện thoại" className="flex-1 px-2 py-1 rounded outline-none " 
          {...register("phone",{required:{
            value:true,
            message:"Vui lòng nhập số điện thoại"
          }, pattern:{
            value:/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
            message:"Số điện thoại không hợp lệ"
          }})}
        />
      </div>
      {errors.phone && <p className='text-sm text-red-500'>{errors.phone.message}</p>}


      {/* Password Input with show/hide functionality */}
      <div className="flex gap-2 px-2 border relative rounded bg-[#eee] border-slate-300 text-lg font-semibold">
        <input 
          type={showPassword ? "text" : "password"} 
          placeholder="Nhập mật khẩu" 
          className="flex-1 p-2 outline-none " 
          {...register("password",{required:{
            value:true,
            message:"Vui lòng nhập mật khẩu"
          }, pattern:{
            value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/,
            message:"Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special charact"
          }})}
        />
        <div 
          className="absolute transform -translate-y-1/2 cursor-pointer right-2 top-1/2"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <IoMdEyeOff className="text-gray-700" size={20} />
          ) : (
            <IoMdEye className="text-gray-700" size={20} />
          )}
        </div>
      </div>
      {errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}

      {/* Confirm Password Input with show/hide functionality */}
      <div className="flex gap-2 px-2 border relative rounded bg-[#eee] border-slate-300 text-lg font-semibold">
        <input 
          type={showConfirmPassword ? "text" : "password"} 
          placeholder="Nhập lại mật khẩu" 
          className="flex-1 p-2 outline-none " 
          {...register("confirmPassword",{required:{
            value:true,
            message:"Vui lòng nhập lại mật khẩu"
          }, validate:(value)=>{
            if(value !== watch("password")){
              return "Mật khẩu không khớp"
            }
          }})}
        />
        <div 
          className="absolute transform -translate-y-1/2 cursor-pointer right-2 top-1/2"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? (
            <IoMdEyeOff className="text-gray-700" size={20} />
          ) : (
            <IoMdEye className="text-gray-700" size={20} />
          )}
        </div>
      </div>
      {errors.confirmPassword && (
        <p className='text-sm text-red-500'>{errors.confirmPassword.message}</p>
      )}

      <button
  type="submit"
  className={`w-full py-2 rounded font-semibold text-white ${
    isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
  }`}
  disabled={isSubmitting}
>
  {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
</button>
    </form>
  );
}

export default RegisterWithPhone;
