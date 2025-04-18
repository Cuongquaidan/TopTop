import React from 'react'

function UserRow({user}) {
  const isActive = user.state === "active";
  const isBanned = user.state === "banned";
  const isRestricted = user.state === "restricted";
  return (
    <tr key={user.username} className="bg-white border-slate-400 border-b">
      <td className="px-6 py-4">{user.username}</td>
      <td className="px-6 py-4">{user.display_name}</td>
      <td className="px-6 py-4">{user.email}</td>
      <td className="px-6 py-4">{user.phone}</td>
      <td className={`px-6 py-4 capitalize`}>
        <p className={`${user.state === "active"?"bg-green-200 text-green-700": user.state === "restricted"? "text-yellow-700 bg-amber-200":"text-red-700 bg-red-200"   } inline p-1 px-3 rounded-2xl`}>{user.state}</p>
      </td>
      <td className="px-6 py-4 text-right space-x-2">
        <button
          className={`bg-red-600 cursor-pointer text-white font-semibold py-1 px-3 rounded ${
            isBanned ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isBanned}
        >
          Ban
        </button>
        <button
          className={`bg-yellow-600  text-white font-semibold py-1 px-3 rounded ${
            isRestricted ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isRestricted}
        >
          Restrict
        </button>
        <button
          className={`bg-green-600  text-white font-semibold py-1 px-3 rounded ${
            isActive ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isActive}
        >
          Activate
        </button>
      </td>
    </tr>
  );
}

export default UserRow