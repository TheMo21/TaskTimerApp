"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import useFetchTasks from "../utils/useFetchTask";

import useFormData from "../utils/useFormData";

import NewTaskForm from "./NewTaskForm";
import Task from "./Task";
import useFetchRecord from "../utils/useFetchRecord";
import Button from "./Button";
import { format } from "date-fns/format";

export default function DashBoard() {
  // State for managing events
  const [tasks, fetchTasks, postTasks, deleteTasks] = useFetchTasks();
  //State for formData
  const [formData, handleFormInputChange, clearFormData] = useFormData();

  const [records, fetchRecords, postRecord] = useFetchRecord();

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

    console.log(newTask);

    //send post request to api
    const res = await postTasks(JSON.stringify(newTask));
    console.log(res);

    clearFormData();
  };

  //get data for the first
  useEffect(() => {
    fetchRecords();
    fetchTasks();
  }, []);

  return (
    <div className="w-full md:w-4/5 h-full flex flex-wrap md:flex-nowrap gap-5 md:gap-0 bg-white rounded-md shadow-lg overflow-hidden">
      <div className="w-full relative md:basis-2/5 border-r overflow-x-hidden overflow-y-scroll">
        {tasks.map(({ _id, title, group }, index) => (
          <Task
            className={
              (selectedIndex === index ? " bg-purple-300 " : "") +
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
            }}
            postRecord={postRecord}
          />
        ))}
        <Button
          type="button"
          className="w-full md:static bottom-0 bg-purple-500"
          onClick={() => setShowForm(true)}
        >
          <span className="font-bold text-white">Add Task</span>
        </Button>
        <NewTaskForm
          handleSubmit={(e) => {
            handleFormData(e);
          }}
          handleClose={() => {
            setShowForm(false);
            clearFormData();
          }}
          handleChange={handleFormInputChange}
          className={`${showFrom ? "show" : "hide"} absolute top-0`}
        />
      </div>

      <div
        className={`md:basis-3/5 flex flex-col items-center overflow-y-scroll`}
      >
        <h2 className="text-xl font-bold">Records</h2>
        <table className="w-full p-1 ">
          <thead>
            <tr>
              <th className="text-left">Date</th>
              <th className="text-left">Title</th>
              <th className="text-left">Group</th>
              <th className="text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record._id}>
                <td>{record.date}</td>
                <td>{record.taskTitle}</td>
                <td>{record.taskGroup}</td>
                <td>{record.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
