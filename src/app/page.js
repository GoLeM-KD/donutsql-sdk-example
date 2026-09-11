"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [results, setResults] = useState([]);
  const [details, setDetails] = useState({
    name: "",
    age: "",
    address: "",
  });

  useEffect(() => {
    const getResults = async () => {
      const req = await fetch("/api");

      const reqResult = await req.json();

      if (reqResult.success) {
        setResults(reqResult.results);
      }
    };

    getResults();
  }, []);

  // Insert function
  const insertData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", details.name);
      formData.append("age", details.age);
      formData.append("address", details.address);

      const req = await fetch("/api", {
        method: "POST",
        body: formData,
      });

      const reqResult = await req.json();

      if (reqResult.success) {
        alert("Done");
      }
    } catch (err) {
      alert("Something went wrong");
    }
  };

  // Delete Function
  const deleteData = async (id) => {
    try {
      const formData = new FormData();
      formData.append("id", id);

      const req = await fetch("/api", {
        method: "DELETE",
        body: formData,
      });

      const reqResult = await req.json();

      if (reqResult.success) {
        alert("DELETED!");
      }
    } catch (err) {
      alert("Something went wrrong");
    }
  };
  return (
    <div>
      <Link href="/Transaction" className="underline textx-black font-bold">Try transaction</Link>
      <Link href="/Procedure" className="underline textx-black font-bold">Try Execute procedure</Link>
      <table className="border-1 border-black mb-4">
        <thead>
          <tr className="border-1 border-black">
            <th className="w-[150px]">id</th>
            <th className="w-[150px]">name</th>
            <th className="w-[150px]">age</th>
            <th className="w-[300px]">address</th>
          </tr>
        </thead>

        <tbody>
          {results.map((res, idx) => (
            <tr
              key={idx}
              onClick={() => deleteData(res.id)}
              className="cursor-pointer border-1 border-black hover:bg-[#000000]/70 hover:text-white duration-100 ease-in"
            >
              <td>{res.id}</td>
              <td>{res.name}</td>
              <td>{res.age}</td>
              <td>{res.address || 'No address'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form className="w-[350px] flex flex-col border-1 border-black bg-white gap-2 items-center justify-center">
        <p>Insert Data</p>
        <input
          type="text"
          placeholder="name"
          value={details.name}
          onChange={(e) =>
            setDetails((prev) => ({ ...prev, name: e.target.value }))
          }
          className="w-[300px] border-1 border-black h-[30px] text-black"
        />
        <input
          type="text"
          placeholder="age"
          value={details.age}
          onChange={(e) =>
            setDetails((prev) => ({ ...prev, age: e.target.value }))
          }
          className="w-[300px] border-1 border-black h-[30px] text-black"
        />
        <input
          type="text"
          placeholder="address"
          value={details.address}
          onChange={(e) =>
            setDetails((prev) => ({ ...prev, address: e.target.value }))
          }
          className="w-[300px] border-1 border-black h-[30px] text-black"
        />
        <button
          type="button"
          onClick={insertData}
          className="bg-green-500 text-black py-2 px-4 rounded-sm"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
