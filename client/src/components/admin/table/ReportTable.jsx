import React from "react";
import ReportRow from "./ReportRow";
import reports from "../../../data/DataReports";

function ReportTable() {
  return (
    <table className="w-full text-sm text-left text-gray-600  h-full">
      <thead className="text-xs text-gray-700 font-bold bg-slate-300 uppercase">
        <tr>
          <th className="px-4 py-3">Reporter</th>
          <th className="px-4 py-3">Reported User</th>
          <th className="px-4 py-3">Post</th>
          <th className="px-4 py-3">Reason</th>
          <th className="px-4 py-3">Description</th>
          <th className="px-4 py-3">Status</th>
          <th className="px-4 py-3">Action</th>
          <th className="px-4 py-3">Reviewed By</th>
          <th className="px-4 py-3">Time</th>
          <th className="px-4 py-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((report) => (
          <ReportRow key={report._id} report={report} />
        ))}
      </tbody>
    </table>
  );
}

export default ReportTable;
