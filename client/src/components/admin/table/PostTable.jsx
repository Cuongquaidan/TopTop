import React from "react";
import PostRow from "./PostRow";

function PostTable({ posts }) {
  return (
    <table className="w-full text-sm text-left text-gray-600 h-full overflow-y-auto dark:text-gray-300">
      <thead className="text-xs text-gray-700 font-bold bg-slate-300 uppercase dark:bg-gray-700 dark:text-gray-200">
        <tr>
          <th className="px-4 py-3">User</th>
          <th className="px-4 py-3">Caption</th>
          <th className="px-4 py-3">Tags</th>
          <th className="px-4 py-3">Type</th>
          <th className="px-4 py-3">Likes</th>
          <th className="px-4 py-3">Comments</th>
          <th className="px-4 py-3">Saves</th>
          <th className="px-4 py-3">Shares</th>
          <th className="px-4 py-3">State</th>
          <th className="px-4 py-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <PostRow key={post._id} post={post} />
        ))}
      </tbody>
    </table>
  );
}

export default PostTable;