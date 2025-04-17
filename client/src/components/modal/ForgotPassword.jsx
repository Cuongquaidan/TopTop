import React from 'react'

function ForgotPassword() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center">Đặt lại mật khẩu</h2>

      <label className="text-sm font-medium">Nhập địa chỉ email</label>
      <input type="email" placeholder="Địa chỉ email" className="w-full border rounded px-2 py-1 text-sm" />

      <div className="flex gap-2">
        <input type="text" placeholder="Nhập mã gồm 6 chữ số" className="flex-1 border rounded px-2 py-1 text-sm" />
        <button className="border px-3 py-1 text-sm rounded">Gửi mã</button>
      </div>

      <input type="password" placeholder="Mật khẩu" className="w-full border rounded px-2 py-1 text-sm" />
      <button className="w-full bg-gray-200 text-gray-500 py-2 rounded" disabled>Đăng nhập</button>
    </div>
  );
}

export default ForgotPassword