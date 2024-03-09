"use client";
import {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  MouseEvent,
  useState,
} from "react";
import useEvents from "../utils/useEvents";
import TaskItem from "./TaskItem";
import ScheduleEvent from "../../../types/ScheduleEvent";
import useFormData from "../utils/useFormData";
import { format } from "date-fns";
import Task from "../../../types/Task";
import EventItem from "./EventItem";
import NewEventForm from "./NewEventForm";

export default function DashBoard() {
  // State for managing events
  const [events, setEvents] = useEvents();

  //State for formData
  const [formData, setFormData] = useFormData();

  // State for managing the selected event index
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // State for controlling the display of the form
  const [showFrom, setShowForm] = useState(false);

  //change events when submitting form
  const handleFormData = (e: FormEvent) => {
    e.preventDefault();

    //hide form again
    setShowForm(false);

    console.log(formData);
    //create a task[]
    const tasks = formData.tasks.map((task) => new Task(task));

    //create a ScheduleEvent
    const newEvent = new ScheduleEvent(
      formData.title,
      formData.deadline,
      tasks
    );

    setEvents((prev) => [...prev, newEvent]);
  };

  const handleFormInputChange = (
    e: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>
  ) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    // TODO fix this
    if (){
      setFormData((prev) => ({ ...prev, [fieldName]: value }));
    }
  };

  return (
    <>
      {/* Event side bar */}
      <div className="basis-1/5 border-r overflow-y-scroll">
        {events.map(({ title, deadline }, index) => (
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
          />
        ))}
      </div>

      {/* Tasks */}
      <div className="basis-4/5 flex flex-col items-center relative">
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
    </>
  );
}
