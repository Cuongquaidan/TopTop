import { FaFacebook, FaLine, FaApple } from "react-icons/fa";
import { SiKakaotalk } from "react-icons/si";
import { HiOutlineUser, HiOutlineQrcode } from "react-icons/hi";
import AuthButton from "./AuthButton";
import { FcGoogle } from "react-icons/fc";
import { useGlobalContext } from "../../context/AppContext";
function LoginForm() {
  const {setTypeModal} = useGlobalContext()
  return (
    <div className="bg-transparent  rounded-xl relative w-full h-full overflow-hidden">
    <div className="p-6 px-2 h-full">
      <h2 className="text-center text-3xl font-bold mb-6">Đăng nhập vào TikTok</h2>

      <div className="flex flex-col gap-3 max-h-[75%] px-2 overflow-auto scrollbar-track-white scrollbar-thin scrollbar-thumb-neutral-200">
        <AuthButton icon={<HiOutlineQrcode />} text="Sử dụng mã QR" />
        <AuthButton icon={<HiOutlineUser  />} text="Sử dụng số điện thoại/email/tên người dùng" onClick={()=>{
          setTypeModal("login-with-phone")
        }} />
        <AuthButton icon={<FaFacebook className="text-blue-500"/>} text="Tiếp tục với Facebook" />
        <AuthButton icon={<FcGoogle  />} text="Tiếp tục với Google"  />
        <AuthButton icon={<FaLine className="text-green-500"  />} text="Tiếp tục với LINE" />
        <AuthButton icon={<SiKakaotalk  className="text-yellow-500 bg-black rounded-full "/>} text="Tiếp tục với KakaoTalk" />
        <AuthButton icon={<FaApple />} text="Tiếp tục với Apple" />
      </div>

      <p className="text-xs text-gray-500  text-center">
        Bằng việc tiếp tục với tài khoản, bạn đồng ý với
        <a href="#" className="text-blue-600 ml-1">Điều khoản dịch vụ</a> và
        <a href="#" className="text-blue-600 ml-1">Chính sách quyền riêng tư</a> của chúng tôi.
      </p>
      </div>
      
      
    </div>
 
  )
}

export default LoginForm