"use client";
import {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  MouseEvent,
  Suspense,
  useState,
} from "react";

import useFetchEvents from "../utils/useFetchEvents";
import TaskItem from "./TaskItem";
import ScheduleEvent from "../types/ScheduleEvent";
import useFormData from "../utils/useFormData";
import { format } from "date-fns";
import Task from "../types/Task";
import EventItem from "./EventItem";
import NewEventForm from "./NewEventForm";
import { v4 as uuidv4 } from "uuid";
import { id } from "date-fns/locale";

export default function DashBoard() {
  // State for managing events
  const [events, fetchEvents] = useFetchEvents();

  //State for formData
  const [formData, setFormData] = useFormData();

  //State for tasks to be put in form data
  const [formDataTasks, setFormDataTasks] = useState<Task[]>([]);

  // State for managing the selected event index
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // State for controlling the display of the form
  const [showFrom, setShowForm] = useState(false);

  //change events when submitting form
  const handleFormData = async (e: FormEvent) => {
    e.preventDefault();
    //hide form again
    setShowForm(false);

    console.log(formData);
    //create a task[]
    const tasks = [formData.tasks].map((task) => new Task(task));

    //create a ScheduleEvent
    const newEvent = new ScheduleEvent(
      uuidv4(),
      formData.title,
      formData.deadline,
      tasks
    );

    const res = await fetch("http://localhost:3000/api/events", {
      method: "POST",
      body: JSON.stringify(newEvent),
    });

    console.log(res);
    fetchEvents();
  };

  const handleFormInputChange = (
    e: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>
  ) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <>
      {/* Event side bar */}
      <div className="basis-1/5 border-r overflow-y-scroll">
        {events.map(({ id, title, deadline }, index) => (
          <EventItem
            className={
              (selectedIndex === index ? "bg-blue-500" : "") + " p-3 rounded-md"
            }
            title={title}
            deadline={deadline}
            onClick={() => {
              // Set the selected event index
              setSelectedIndex(index);
            }}
            key={index}
          />
          //TODO implement delete button
        ))}
      </div>

      {/* Tasks */}
      <div className="basis-4/5 flex flex-col items-center relative">
        {events.length == 0 ? (
          <div className="m-4 absolute bottom-0 right-0 flex gap-2">
            <button
              className="rounded-full bg-red-500"
              onClick={() => {
                // Show the form when the button is clicked
                setShowForm(true);
              }}
            >
              add
            </button>{" "}
          </div>
        ) : (
          <></>
        )}
        {/* Display form or event details */}
        {showFrom ? (
          <NewEventForm
            handleSubmit={(e) => handleFormData(e)}
            handleClose={() => setShowForm(false)}
            handleChange={handleFormInputChange}
          />
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
                      const eventId = events[index].id;
                      const reqBody = { id: eventId };
                      const res = await fetch(
                        "http://localhost:3000/api/events",
                        {
                          method: "DELETE",
                          body: JSON.stringify(reqBody),
                        }
                      );
                      console.log(res);
                      fetchEvents();
                    }}
                  >
                    Delete
                  </button>
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
              </>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
