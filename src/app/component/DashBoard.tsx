"use client";
import { ChangeEvent, FormEvent, useState } from "react";

import useFetchEvents from "../utils/useFetchEvents";
import TaskItem from "./TaskItem";
import ScheduleEvent from "../types/ScheduleEvent";
import useEventData from "../utils/useFormData";
import Task from "../types/Task";
import EventItem from "./EventItem";
import NewEventForm from "./NewEventForm";
import { v4 as uuidv4 } from "uuid";

export default function DashBoard() {
  // State for managing events
  const [events, fetchEvents, postEvent, deleteEvent] = useFetchEvents();

  //State for formData
  const [eventData, setEventData] = useEventData();

  //State for tasks to be put in form data
  const [tasksData, setTasksData] = useState<Task[]>([new Task("")]);

  // State for managing the selected event index
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // State for controlling the display of the form
  const [showFrom, setShowForm] = useState(false);

  const clearFormData = () => {
    setEventData({
      title: "",
      deadline: "",
      tasks: [],
    });
    setTasksData([new Task("")]);
  };
  //change events when submitting form
  const handleFormData = async (e: FormEvent) => {
    e.preventDefault();
    //hide form again
    setShowForm(false);

    console.log(eventData);
    //create a task[]

    //create a ScheduleEvent
    const newEvent = new ScheduleEvent(
      uuidv4(),
      eventData.title,
      eventData.deadline,
      tasksData
    );

    //send post request to api
    const res = await postEvent(JSON.stringify(newEvent));
    console.log(res);
    fetchEvents();

    clearFormData();
  };

  const handleFormInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    setEventData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleTaskChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newTasksData = [...tasksData];
    newTasksData[index].description = event.target.value;
    setTasksData(newTasksData);
    console.log(tasksData);
  };

  return (
    <>
      {/* Event side bar */}
      <div className="basis-1/5 border-r overflow-y-scroll">
        {events.map(({ title, deadline }, index) => (
          <EventItem
            className={
              (selectedIndex === index ? " bg-blue-500 " : "") +
              "p-3 transition-colors duration-300"
            }
            title={title}
            deadline={deadline}
            onClick={() => {
              // Set the selected event index
              setSelectedIndex(index);
            }}
            key={index}
          />
        ))}
        <button
          className="w-full bg-green-500"
          onClick={() => setShowForm(true)}
        >
          <h2 className="font-bold text-white">Add Event</h2>
        </button>
      </div>

      {/* Tasks */}
      <div className="basis-4/5 flex flex-col items-center relative">
        {/* Display form or event details */}
        {showFrom ? (
          <>
            <NewEventForm
              handleSubmit={(e) => handleFormData(e)}
              handleClose={() => setShowForm(false)}
              handleChange={handleFormInputChange}
            >
              {tasksData.map((taskInput, index) => (
                <div className="flex">
                  <span>{"No. " + (index + 1)}</span>
                  <input
                    name={"task " + index}
                    id={"task " + index}
                    type="text"
                    key={index}
                    onChange={(e) => handleTaskChange(index, e)}
                    value={taskInput.description}
                  ></input>
                  <button
                    type="button"
                    onClick={() => {
                      const newtasks = tasksData.toSpliced(index, 1);
                      setTasksData(newtasks);
                      console.log(tasksData);
                    }}
                  >
                    remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => setTasksData((prev) => [...prev, new Task("")])}
                type="button"
              >
                add task
              </button>
            </NewEventForm>
          </>
        ) : (
          <div className="w-full flex flex-col justify-between">
            {/* Display tasks for the selected event */}
            {events.at(selectedIndex)?.tasks.map((task, index) => (
              <>
                <TaskItem
                  className="m-1 p-2 bg-slate-50"
                  key={index}
                  handleComplete={() => {
                    task.complete();
                    console.log(events);
                  }}
                >
                  {task.description}
                </TaskItem>

                {/* Add button to show the form */}
                <div className="m-4 absolute bottom-0 right-0 flex gap-2">
                  <button
                    onClick={async () => {
                      const res = await deleteEvent(events[selectedIndex].id);
                      console.log(res);
                      fetchEvents();
                    }}
                  >
                    Delete
                  </button>
                </div>
              </>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
