"use client"
import React, { useState } from "react";

export default function Page() {
  const [transactionData, setTransactionData] = useState({
    table1: {
      id: "",
      name: "",
    },
    table2: {
      subject: "",
      teacher: "",
    },
  });

  const transaction = async () => {
    try {
        const formData = new FormData();
        formData.append('data', JSON.stringify(transactionData))
        const req = await fetch('/api/transaction', {
            method: 'POST',
            body: formData
        })

        const reqResult = await req.json();

        if(reqResult.success) {
            alert("Success!");
        } else {
            alert(`ERROR: ${reqResult.message}`);
        }
    } catch (err) {
        console.log("TRANSACTION ERROR...", err);
        alert("Something went wrong!")
    }
  }
  return (
    <div className="w-full flex flex-wrap gap-5">
      {/* Inputs for Table_one */}
      <div className="px-2 py-4 border-1 border-black flex flex-col gap-2">
        <p>TABLE_ONE</p>
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
          placeholder="Id to delete from TABLE_ONE"
          className="w-[300px] h-[30px] border-1 border-black bg-[#FFFFFF] text-black"
          value={transactionData.table1.id}
          onChange={(e) =>
            setTransactionData((prev) => ({
              ...prev,
              table1: { ...prev.table1, id: e.target.value },
            }))
          }
        />
      </div>

        {/* Inputs for Table_one */}
      <div className="px-2 py-4 border-1 border-black flex flex-col gap-2">
        <p>TABLE_TWO</p>
        <input
          type="text"
          placeholder="Subject"
          className="w-[300px] h-[30px] border-1 border-black bg-[#FFFFFF] text-black"
          value={transactionData.table2.subject}
          onChange={(e) =>
            setTransactionData((prev) => ({
              ...prev,
              table2: { ...prev.table2, subject: e.target.value },
            }))
          }
        />

        <input
          type="text"
          placeholder="Teacher ID"
          className="w-[300px] h-[30px] border-1 border-black bg-[#FFFFFF] text-black"
          value={transactionData.table2.teacher}
          onChange={(e) =>
            setTransactionData((prev) => ({
              ...prev,
              table2: { ...prev.table2, teacher: e.target.value },
            }))
          }
        />
      </div>

      <button type="button" className="px-4 py-2 bg-green-400 text-white hover:bg-green-500 cursor-pointer rounded-sm" onClick={transaction}>DO TRANSACTION</button>
    </div>
  );
}
