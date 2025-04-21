import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineWarning } from "react-icons/ai";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4 text-red-500">
          <AiOutlineWarning size={48} />
        </div>
        <h1 className="text-2xl font-bold mb-2">Opp! Có lỗi xảy ra, vui lòng thử lại</h1>
        <p className="text-gray-600 mb-6">
          Trang bạn tìm không tồn tại hoặc đã bị xóa.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-green-600 text-white px-4 py-2 rounded-lg w-full hover:bg-green-800 font-bold transition cursor-pointer"
        >
          Quay về trang chủ
        </button>
      </div>
    </div>
  );
}