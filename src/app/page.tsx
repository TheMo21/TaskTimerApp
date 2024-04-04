import React from "react";
import DashBoard from "./component/DashBoard";
import Nav from "./component/Nav";

export default function Home() {
  return (
    <div className="w-full h-full bg-slate-50">
      <Nav className="w-full" />
      <main className="w-full h-lvh md:h-4/5 flex justify-center">
        <DashBoard />
      </main>
    </div>
  );
}
