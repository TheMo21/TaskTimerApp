"use client";
import { ChangeEvent, FormEvent, useState } from "react";

import useFetchTasks from "../utils/useFetchEvents";

import useFormData from "../utils/useFormData";

import NewTaskForm from "./NewTaskForm";
import Task from "./Task";

export default function DashBoard() {
  // State for managing events
  const [tasks, fetchTasks, postTasks, deleteTasks] = useFetchTasks();
  //State for formData
  const [formData, setFormData, handleFormInputChange, clearFormData] =
    useFormData();

  // State for managing the selected event index
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // State for controlling the display of the form
  const [showFrom, setShowForm] = useState(false);

  // change events when submitting form
  const handleFormData = async (e: FormEvent) => {
    e.preventDefault();
    //hide form again
    setShowForm(false);

    const newTask = {
      title: formData.title,
      group: formData.group,
    };

    //send post request to api
    const res = await postTasks(JSON.stringify(newTask));
    console.log(res);
    fetchTasks();

    clearFormData();
  };

  return (
    <>
      {/* Event side bar */}
      <div className="basis-2/5 border-r overflow-y-scroll">
        {tasks.map(({ _id, title, group }, index) => (
          <Task
            className={
              (selectedIndex === index ? " bg-blue-500 " : "") +
              "p-3 transition-colors duration-300"
            }
            title={title}
            group={group}
            key={_id}
            onClick={() => {
              // Set the selected event index
              setSelectedIndex(index);
            }}
            handleDelete={() => {
              deleteTasks(_id);
              fetchTasks();
            }}
          />
        ))}
        <button
          className="w-full bg-green-500"
          onClick={() => setShowForm(true)}
        >
          <h2 className="font-bold text-white">Add Event</h2>
        </button>
      </div>

      <div className={`basis-3/5 flex flex-col items-center relative`}>
        <NewTaskForm
          handleSubmit={(e) => {
            handleFormData(e);
          }}
          handleClose={() => setShowForm(false)}
          handleChange={handleFormInputChange}
          className={showFrom ? "show" : "hide"}
        />
      </div>
    </>
  );
}
