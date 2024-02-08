"use client";
import Image from "next/image";
import { useState, useEffect }  from "react";

export default function Home() {
  const [search, setSearch] = useState('');
  const [enResult, setEnResult] = useState('');
  const [materialResult, setMaterialResult] = useState('');

  const getEnglish = async () => {
    const b = {
      'name': search,
      'nameOp': 'eq',
      'inciOp': 'cn',
    };

    const response = await fetch('/api/getEnglish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(b),
    });

    const data = await response.json(); // Assuming the response is JSON
    setEnResult(data.eng);
    setMaterialResult(data.material);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <div className="flex flex-col items-center justify-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded p-2"
        />
        <button
          onClick={getEnglish}
          className="bg-blue-500 text-white p-2 rounded ml-2"
        >
          Search
        </button>
      </div>
      <div className="flex flex-col items-center justify-center mt-1">
        <h1 className="text-4xl font-bold mb-8">Result</h1>
        <h2 className="text-2xl font-bold">英文名：{enResult} <br/> 成分：{materialResult}</h2>
      </div>
    </main>
  );
}
