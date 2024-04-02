import React from "react";
import DashBoard from "./component/DashBoard";
import Nav from "./component/Nav";

export default function Home() {
  return (
    <div className="w-full h-full relative flex justify-center items-center bg-slate-50">
      <Nav className="w-full absolute top-0" />
      <main className="w-4/5 h-4/5 flex bg-white rounded-md shadow-lg overflow-hidden">
        <DashBoard />
      </main>
    </div>
  );
}
