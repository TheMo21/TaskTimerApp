"use client";

import { useState } from "react";
import Event from "../../types/Event";

export default function Home() {
  // Set the current date and time
  const now = new Date();

  // State for managing events
  const [blocks, setBlocks] = useState<Event[]>([
    {
      title: "event 1",
      deadline: now,
      tasks: ["this is task 1", "this is task 2"],
    },
    { title: "event 2", deadline: now, tasks: ["this is task 2"] },
    { title: "event 3", deadline: now, tasks: ["this is task 3"] },
    { title: "event 4", deadline: now, tasks: ["this is task 4"] },
  ]);

  // State for managing the selected event index
  const [index, setIndex] = useState<number>(0);

  // State for controlling the display of the form
  const [showFrom, setShowForm] = useState(false);

  return (
    <div className="w-full h-full flex justify-center items-center bg-slate-50">
      <main className="w-4/5 h-4/5 flex bg-white rounded-md shadow-lg">
        {/* Sidebar displaying a list of events */}
        <div className="basis-1/5 border-r">
          {blocks.map(({ title, deadline }, index) => (
            <div
              className="p-3"
              onClick={() => {
                // Set the selected event index
                setIndex(index);
              }}
            >
              <h2 className="text-xl font-bold">{title}</h2>
              <span>{deadline.toString()}</span>
            </div>
          ))}
        </div>

        {/* Main content area */}
        <div className="basis-4/5 flex flex-col items-center relative">
          {/* Display form or event details */}
          {showFrom ? (
            <form>
              <label htmlFor="title">Title</label>
              <input name="title" id="title" type="text" />
            </form>
          ) : (
            <div>
              {/* Display tasks for the selected event */}
              {blocks.at(index)?.tasks.map((task, index) => (
                <li className="list-none" key={index}>
                  {task}
                </li>
              ))}

              {/* Add button to show the form */}
              <div className="m-4 absolute bottom-0 right-0">
                <button
                  className="rounded-full bg-red-500"
                  onClick={() => {
                    // Show the form when the button is clicked
                    setShowForm(true);
                  }}
                >
                  add
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
