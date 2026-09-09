"use client";
import React, { useState } from "react";

export default function Page() {
  const [transactionData, setTransactionData] = useState({
    table1: {
      id: "",
      name: "",
      age: "",
    },
    table2: {
      subName: "",
      id: "",
    },
  });

  const transaction = async () => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(transactionData));
      const req = await fetch("/api/transaction", {
        method: "POST",
        body: formData,
      });

      const reqResult = await req.json();

      if (reqResult.success) {
        alert("Success!");
      } else {
        alert(`ERROR: ${reqResult.message}`);
      }
    } catch (err) {
      console.log("TRANSACTION ERROR...", err);
      alert("Something went wrong!");
    }
  };
  return (
    <div className="w-full flex flex-wrap gap-5">
      {/* Inputs for student */}
      <div className="px-2 py-4 border-1 border-black flex flex-col gap-2">
        <p>student</p>
        <input
          type="text"
          placeholder="Name"
          className="w-[300px] h-[30px] border-1 border-black bg-[#FFFFFF] text-black"
          value={transactionData.table1.name}
          onChange={(e) =>
            setTransactionData((prev) => ({
              ...prev,
              table1: { ...prev.table1, name: e.target.value },
            }))
          }
        />

        <input
          type="text"
          placeholder="age"
          className="w-[300px] h-[30px] border-1 border-black bg-[#FFFFFF] text-black"
          value={transactionData.table1.age}
          onChange={(e) =>
            setTransactionData((prev) => ({
              ...prev,
              table1: { ...prev.table1, age: e.target.value },
            }))
          }
        />
      </div>

      {/* Inputs for subject */}
      <div className="px-2 py-4 border-1 border-black flex flex-col gap-2">
        <p>subject</p>
        <input
          type="text"
          placeholder="Subject"
          className="w-[300px] h-[30px] border-1 border-black bg-[#FFFFFF] text-black"
          value={transactionData.table2.subject}
          onChange={(e) =>
            setTransactionData((prev) => ({
              ...prev,
              table2: { ...prev.table2, subName: e.target.value },
            }))
          }
        />

        <input
          type="text"
          placeholder="ID to delete from subject table"
          className="w-[300px] h-[30px] border-1 border-black bg-[#FFFFFF] text-black"
          value={transactionData.table2.teacher}
          onChange={(e) =>
            setTransactionData((prev) => ({
              ...prev,
              table2: { ...prev.table2, id: e.target.value },
            }))
          }
        />
      </div>

      <button
        type="button"
        className="px-4 py-2 bg-green-400 text-white hover:bg-green-500 cursor-pointer rounded-sm"
        onClick={transaction}
      >
        DO TRANSACTION
      </button>

      <p>
        It's okay if a transaction fails. Nothing will happen to your database
        because all changes made during the transaction will be rolled back.
      </p>
    </div>
  );
}
