import React from "react";
import reportActions from "../../../data/ReportAction";
import reportStatus from "../../../data/ReportStatus";

function ReportRow({ report }) {
  const {
    reporter,
    reportedUser,
    reportedPost,
    reason,
    description,
    status,
    action,
    reviewedBy,
    createdAt,
  } = report;

  const statusColor = {
    pending: "bg-yellow-200 text-yellow-800",
    reviewed: "bg-blue-200 text-blue-800",
    action_taken: "bg-green-200 text-green-800",
  };

  const actionColor = {
    none: "bg-gray-400",
    restrict_post: "bg-yellow-500",
    restrict_user: "bg-yellow-700",
    delete_post: "bg-red-500",
    ban_user: "bg-red-700",
  };

  return (
    <tr className="bg-white border-b">
      <td className="px-4 py-3">
        <p className="font-medium">{reporter.display_name}</p>
        <p className="text-xs text-gray-400">@{reporter.username}</p>
      </td>
      <td className="px-4 py-3">
        <p className="font-medium">{reportedUser.display_name}</p>
        <p className="text-xs text-gray-400">@{reportedUser.username}</p>
      </td>
      <td className="px-4 py-3 max-w-[200px] truncate">{reportedPost.caption}</td>
      <td className="px-4 py-3 capitalize">{reason}</td>
      <td className="px-4 py-3 text-sm max-w-[150px]">{description}</td>
      <td className="px-4 py-3">
        <span className={`${statusColor[status]} px-3 py-1 rounded-full text-md capitalize`}>
          {reportStatus.find((s) => s.value === status)?.label || status}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className={`${actionColor[action]} text-white px-3 py-1 rounded-full text-md capitalize`}>
          {reportActions.find((a) => a.value === action)?.label || action}
        </span>
      </td>
      <td className="px-4 py-3 text-sm">
        {reviewedBy ? (
          <>
            <p>{reviewedBy.username}</p>
          </>
        ) : (
          <p className="text-gray-400 italic">—</p>
        )}
      </td>
      <td className="px-4 py-3 text-sm">{new Date(createdAt).toLocaleString()}</td>
      <td className="px-4 py-3 space-y-1 text-center w-40">
        {reportActions.map((btn) => (
          <button
            key={btn.value}
            className={`${
              action === btn.value ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            } ${actionColor[btn.value]} text-white text-md font-semibold  px-3 py-1 rounded block w-full`}
            disabled={action === btn.value}
          >
            {btn.label}
          </button>
        ))}
      </td>
    </tr>
  );
}

export default ReportRow;
