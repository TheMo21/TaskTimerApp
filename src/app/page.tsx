import React from "react";
import DashBoard from "./component/DashBoard";

export default function Home() {
  return (
    <div className="w-full h-full flex justify-center items-center bg-slate-50">
      <main className="w-4/5 h-4/5 flex bg-white rounded-md shadow-lg overflow-hidden">
        <DashBoard />
      </main>
    </div>
  );
}
