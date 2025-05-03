import React, { useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useForm } from 'react-hook-form';
import { useGlobalContext } from '../../context/AppContext';
import createAxiosInstance from '../../libs/axios/AxiosInstance';
import { toast } from 'react-toastify';
import { BASE_URL, SUMMARY_API } from '../../shared/Route';

function RegisterWithOther() {
  const { setTypeModal } = useGlobalContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = useForm({
    defaultValues: {
      emailOrUsername: "",
      password: "",
      confirmPassword: ""
    }
  });

  const submit = async (data) => {
    const value = data.emailOrUsername;
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const payload = { password: data.password };

    if (isEmail) {
      payload.email = value;
    } else {
      payload.username = value;
    }

    try {
      const axiosInstance = createAxiosInstance(BASE_URL);
      const res = await axiosInstance.post(SUMMARY_API.auth.register, payload);
      if (res.success) {
        toast.success(res.message || "Đăng ký thành công!");
        setTypeModal("login-with-other");
        reset();
      }
    } catch (error) {
      console.log(error.response?.data?.message || "Đăng ký thất bại!");
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="relative h-full px-6 py-10 space-y-4">
      <div className="absolute top-0 left-0 cursor-pointer" onClick={() => setTypeModal("register")}>
        <FaChevronLeft className="text-gray-700 dark:text-white" />
      </div>

      <h2 className="text-3xl font-bold text-center dark:text-white">Đăng kí</h2>

      <div className="flex items-center justify-between">
        <p className="font-semibold text-md dark:text-white">Email/Username</p>
        <p
          className="text-sm cursor-pointer text-slate-900 dark:text-gray-300 hover:underline"
          onClick={() => setTypeModal("register-with-phone")}
        >
          Đăng kí bằng số điện thoại
        </p>
      </div>

      <div className="flex gap-2 px-2 border rounded bg-[#eee] dark:bg-neutral-700 border-slate-300 dark:border-neutral-600 text-lg font-semibold">
        <input
          type="text"
          placeholder="Email hoặc Username"
          className="flex-1 p-2 rounded outline-none bg-transparent text-black dark:text-white"
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

      <div className="flex gap-2 px-2 border relative rounded bg-[#eee] dark:bg-neutral-700 border-slate-300 dark:border-neutral-600 text-lg font-semibold">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Nhập mật khẩu"
          className="flex-1 p-2 outline-none bg-transparent text-black dark:text-white"
          {...register("password", {
            required: "Vui lòng nhập mật khẩu",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,10}$/,
              message: "8-10 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
            }
          })}
        />
        <div
          className="absolute transform -translate-y-1/2 cursor-pointer right-2 top-1/2 text-gray-700 dark:text-gray-300"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
        </div>
      </div>
      {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

      <div className="flex gap-2 px-2 border relative rounded bg-[#eee] dark:bg-neutral-700 border-slate-300 dark:border-neutral-600 text-lg font-semibold">
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Nhập lại mật khẩu"
          className="flex-1 p-2 outline-none bg-transparent text-black dark:text-white"
          {...register("confirmPassword", {
            required: "Vui lòng nhập lại mật khẩu",
            validate: value =>
              value === watch("password") || "Mật khẩu không khớp"
          })}
        />
        <div
          className="absolute transform -translate-y-1/2 cursor-pointer right-2 top-1/2 text-gray-700 dark:text-gray-300"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
        </div>
      </div>
      {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}

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

export default RegisterWithOther;