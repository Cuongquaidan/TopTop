import React from "react";
const actionButtons = [
  { label: "Normal", state: "normal", color: "bg-cyan-600" },
  { label: "Restrict", state: "restricted", color: "bg-yellow-500" },
  { label: "Ban", state: "banned", color: "bg-red-600" },
  { label: "Recommend", state: "recommended", color: "bg-green-600" },
];
function PostRow({ post }) {
  const { user, caption, tags, type, numOfLikes, numOfComments, numOfSave, numOfShare, state } = post;

  const typeColor =
    type === "video"
      ? "bg-cyan-600 text-white"
      : type === "image"
      ? "bg-indigo-600 text-white"
      : "bg-gray-500 text-white";

  const stateColorMap = {
    normal: "bg-cyan-100 text-cyan-700",
    restricted: "bg-yellow-200 text-yellow-700",
    banned: "bg-red-200 text-red-700",
    recommended: "bg-green-200 text-green-700",
  };

  return (
    <tr className="bg-white border-slate-400 border-b">
      <td className="px-4 flex justify-between h-full items-center gap-2">
        <img src={user.profile_picture} alt={user.username} className="w-8 h-8 rounded-full" />
        <div>
          <p className="font-medium">{user.display_name}</p>
          <p className="text-xs text-gray-400">@{user.username}</p>
        </div>
      </td>
      <td className="px-4 py-3 max-w-[200px] truncate">{caption}</td>
      <td className="px-4 py-3">
        {tags.slice(0,3).map((tag, i) => (
          <span key={i} className="bg-slate-200 text-xs text-gray-700 px-2 py-1 rounded mr-1 inline-block">
            #{tag}
          </span>
        ))}
      </td>
      <td className="px-4 py-3">
        <span className={`${typeColor} text-xs font-semibold px-3 py-1 rounded-full capitalize`}>
          {type}
        </span>
      </td>
      <td className="px-4 py-3">{numOfLikes}</td>
      <td className="px-4 py-3">{numOfComments}</td>
      <td className="px-4 py-3">{numOfSave}</td>
      <td className="px-4 py-3">{numOfShare}</td>
      <td className="px-4 py-3">
        <span className={`${stateColorMap[state]} px-3 py-1 rounded-full text-xs capitalize`}>
          {state}
        </span>
      </td>
      <td className="px-4 py-3 space-x-2 text-center">
  {actionButtons.map((btn) => (
    <button
      key={btn.state}
      className={`${btn.color} text-white font-semibold px-3 py-1 rounded cursor-pointer text-md ${
        state === btn.state ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={state === btn.state}
    >
      {btn.label}
    </button>
  ))}
</td>
    </tr>
  );
}

export default PostRow;