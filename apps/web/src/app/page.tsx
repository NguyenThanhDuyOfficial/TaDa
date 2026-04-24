'use client'

import { redirect } from "next/navigation";

export default function Home() {

  function handleClick() {
    redirect('/login')
  }

  return (
    <div className="w-full min-h-screen bg-white flex justify-center items-center">
      <button
        onClick={handleClick}

        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Login
      </button>
    </div>
  );
}
