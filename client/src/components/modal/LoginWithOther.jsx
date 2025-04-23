import React, { useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useForm } from 'react-hook-form';
import { useGlobalContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import createAxiosInstance from '../../libs/axios/AxiosInstance';
import { BASE_URL, SUMMARY_API } from '../../shared/Route';
import { useDispatch } from 'react-redux';
import {setUser} from "../../redux/features/userSlice"
import { useNavigate } from 'react-router-dom';
function LoginWithOther() {
  const { setTypeModal } = useGlobalContext();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { 
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = useForm({
    defaultValues: {
      emailOrUsername: "",
      password: ""
    }
  });

  const onSubmit = async (data) => {
    const value = data.emailOrUsername;
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const payload = {
      password: data.password
    };

    if (isEmail) {
      payload.email = value;
    } else {
      payload.username = value;
    }

    try {
      const axiosInstance = createAxiosInstance(BASE_URL);
      const resjson =  await axiosInstance.post(SUMMARY_API.auth.login.other, payload);
      if(resjson.success){
        toast.success("Đăng nhập thành công!");
        reset();
        dispatch(setUser({
          user: resjson.data,
        }))
        navigate("/");

      }else{
        toast.error(resjson.message || "Đăng nhập thất bại!");
      }
    } catch (error) {
      console.error(error.response?.data?.message || "Đăng nhập thất bại!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative h-full px-6 py-10 space-y-4">
      <div className='absolute top-0 left-0 cursor-pointer' onClick={() => setTypeModal("login")}>
        <FaChevronLeft className='text-gray-700' />
      </div>

      <h2 className="text-3xl font-bold text-center">Đăng nhập</h2>

      <div className='flex items-center justify-between'>
        <p className='font-semibold text-md'>Email/Username</p>
        <p
          className='text-sm cursor-pointer text-slate-900 hover:underline'
          onClick={() => setTypeModal("login-with-phone")}
        >
          Đăng nhập bằng số điện thoại
        </p>
      </div>

      <div className="flex gap-2 px-2 border rounded bg-[#eee] border-slate-300 text-lg font-semibold">
        <input
          type="text"
          placeholder="Email/username"
          className="flex-1 p-2 rounded outline-none"
          {...register("emailOrUsername", {
            required: "Vui lòng nhập email hoặc username",
            minLength: {
              value: 4,
              message: "Tối thiểu 4 ký tự"
            }
          })}
        />
      </div>
      {errors.emailOrUsername && <p className="text-sm text-red-500">{errors.emailOrUsername.message}</p>}

      <div className="flex gap-2 px-2 border relative rounded bg-[#eee] border-slate-300 text-lg font-semibold">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Nhập mật khẩu"
          className="flex-1 p-2 outline-none"
          {...register("password", {
            required: "Vui lòng nhập mật khẩu",
            minLength: {
              value: 6,
              message: "Mật khẩu tối thiểu 6 ký tự"
            }
          })}
        />
        <div
          className="absolute transform -translate-y-1/2 cursor-pointer right-2 top-1/2"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
        </div>
      </div>
      {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

      <button
        type="submit"
        className={`w-full py-2 rounded font-semibold text-white ${
          isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
      </button>
    </form>
  );
}

export default LoginWithOther;
