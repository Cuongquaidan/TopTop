import React from 'react'
import { useGlobalContext } from '../../context/AppContext';
import LoginForm from './LoginForm';
import LoginWithPhone from './LoginWithPhone';
import LoginWithOther from './LoginWithOther';
import ForgotPassword from './ForgotPassword';
import RegisterForm from './RegisterForm';
import RegisterWithPhone from './RegisterWithPhone';
import RegisterWithOther from './RegisterWithOther';

function AuthForm() {
  const { typeModal,setTypeModal } = useGlobalContext();
  return (
    <div className='w-full h-full relative'>
      <div className="text-center mt-6 text-sm absolute bottom-0 z-50 w-full border-t  border-slate-300 py-4 left-1/2 transform -translate-x-1/2">
           <span className="text-gray-700">{
              typeModal.includes("login") ? "Bạn chưa có tài khoản?" : "Bạn đã có tài khoản?"
           } </span>
           <button className="text-primary font-semibold cursor-pointer"
            onClick={() => {
              if (typeModal.includes("login")) {
                setTypeModal("register");
              } else {
                setTypeModal("login");
              }
            }
            }
           >{
            typeModal.includes("login") ? "Đăng ký" : "Đăng nhập"
           }</button>
         </div>
           <div className='h-full w-full px-8'>
           {typeModal === "login" && (
                        <LoginForm></LoginForm>
                    )}
                    {
                        typeModal === "login-with-phone" && (
                            <LoginWithPhone></LoginWithPhone>
                        )

                    }
                    {
                        typeModal === "login-with-other" && (
                            <LoginWithOther></LoginWithOther>
                        )
                    }
                    {
                        typeModal === "forgot-password" && (
                            <ForgotPassword></ForgotPassword>
                        )
                    }
                    {
                        typeModal === "register" && (
                            <RegisterForm></RegisterForm>
                        )
                    }
                    {
                        typeModal === "register-with-phone" && (
                            <RegisterWithPhone></RegisterWithPhone>
                        )
                    }
                    {
                        typeModal === "register-with-other" && (
                            <RegisterWithOther></RegisterWithOther>
                        )
                    }
           </div>
    </div>
  )
}

export default AuthForm