"use client";
import Image from "next/image";
import { useState, useEffect }  from "react";

export default function Home() {
  const getEnglish = async () => {
    // send post request to https://www.cosmetic-info.jp/jcln/result.php with the following data
    // {
    //   'name': 'グリセリン',
    //   'nameOp': 'eq',
    //   'inciOp': 'cn',
    // }
    // and get the response
    const response = await fetch('https://www.cosmetic-info.jp/jcln/result.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Allow-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        'name': 'グリセリン',
        'nameOp': 'eq',
        'inciOp': 'cn',
      }),
    });
    const data = await response.json();
    console.log(data);
  };
  useEffect(() => {
    getEnglish();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      here
    </main>
  );
}
