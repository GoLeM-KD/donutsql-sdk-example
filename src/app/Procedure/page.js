"use client";
import React, { useState } from "react";

export default function page() {
  const [procedureDetails, setProcedureDetails] = useState({
    studentID: "",
    subjectID: "",
  });

  const [executionResult, setExecutionResult] = useState([]);

  // Execution of procedure without parameter
  const executeProcedureWithoutParams = async () => {
    try {
      const req = await fetch("/api/procedure");
      const reqResult = await req.json();

      if (reqResult.success) {
        setExecutionResult(reqResult.result);
      } else {
        alert("EXECUTION FAILED!");
      }
    } catch (err) {
      alert("Oops Something went wrong!");
    }
  };

  // Execution of procedure with parameters
  const executeProcedureWithParams = async () => {
    try {
      const formData = new FormData();
      formData.append("procedureDatas", JSON.stringify(procedureDetails));

      const req = await fetch("/api/procedure", {
        method: "POST",
        body: formData,
      });

      const reqResult = await req.json();

      if (reqResult.success) {
        alert("PROCEDURE EXECUTED!");
      } else {
        alert("EXECUTION FAILED!");
      }
    } catch (err) {
      alert("Oops Something went wrong!");
    }
  };

  return (
    <div className="w-full flex flex-wrap gap-5">
      <div className="border-1 border-black flex flex-col w-[500px] p-2 gap-2">
        <input
          type="text"
          placeholder="studentID to insert user_subject table"
          className="p-2 border-1 border-black bg-white w-full"
          value={procedureDetails.studentID}
          onChange={(e) =>
            setProcedureDetails((prev) => ({
              ...prev,
              studentID: e.target.value,
            }))
          }
        />
        <input
          type="text"
          placeholder="subjectID to insert user_subject table"
          className="p-2 border-1 border-black bg-white w-full"
          value={procedureDetails.subjectID}
          onChange={(e) =>
            setProcedureDetails((prev) => ({
              ...prev,
              subjectID: e.target.value,
            }))
          }
        />

        <button
          type="button"
          className="w-full bg-green-700 text-white cursor-pointer py-2"
          onClick={executeProcedureWithParams}
        >
          Execute
        </button>
      </div>

      {/* Execute procedure without params */}
      <div className="flex flex-col w-[500px]">
        <button
          type="button"
          className="w-full bg-green-700 text-white cursor-pointer py-2"
          onClick={executeProcedureWithoutParams}
        >
          Execute without params
        </button>

        {executionResult.length > 0 && (
          <table>
            <thead>
              <tr>
                {Object.keys(executionResult[0]).map((column, idx) => (
                  <th key={idx}>{column}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {executionResult.map((res, idx) => (
                <tr key={idx}>
                  {Object.keys(executionResult[0]).map((colName) => (
                    <td key={colName}>{res[colName]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
