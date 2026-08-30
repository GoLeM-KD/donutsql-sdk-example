"use client";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [results, setResults] = useState([]);
  const [name, setName] = useState("");

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
      formData.append("name", name);

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
      <ul>
        {results?.map((res, idx) => (
          <li
            key={idx}
            onClick={() => deleteData(res.id)}
            className="cursor-pointer hover:font-bold duration-100 ease-in"
          >
            {res.Name}
          </li>
        ))}
      </ul>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-[300px] border-1 border-black h-[30px]"
      />

      <button type="button" onClick={insertData}>
        Submit
      </button>
    </div>
  );
}
