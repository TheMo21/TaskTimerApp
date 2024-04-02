import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Task from "../types/Task";
/**
 * Custom React hook for managing CRUD operations on schedule events.
 * @returns An array containing the list of events, a function to fetch events,
 * a function to post a new event, and a function to delete an event.
 */
export default function useFetchTasks(): [
  Task[],
  () => Promise<void>,
  (body: BodyInit) => Promise<Response>,
  (id: string) => Promise<Response>
] {
  // State to hold the list of schedule events
  const [tasks, setTasks] = useState<Task[]>([]);

  // API endpoint for schedule events
  const api = "/api/events";

  const { push } = useRouter();

  /**
   * Fetches schedule events from the API and updates the state.
   * @throws {Error} If the fetch operation fails.
   */
  const fetchTasks = async () => {
    const token = localStorage.getItem("token");

    //if token exists proceed
    if (token) {
      const res = await fetch(api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status == 200) {
        const tasks = await res.json();
        setTasks(tasks);
        return;
      }
    }

    //redirect to signIn if fetch failed
    console.log("redirecting");
    push("/userAuth");
    return;
  };

  /**
   * Posts a new schedule event to the API.
   * @param {BodyInit} body - The request body to be sent to the server.
   * @returns {Promise<Response>} The response from the server.
   * @throws {Error} If the post operation fails.
   */
  const postTask = async (body: BodyInit) => {
    const token = localStorage.getItem("token");
    const res = await fetch(api, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: body,
    });
    if (res.status === 201) {
      fetchTasks();
    }
    if (400 <= res.status && res.status <= 499) {
      throw new Error("Failed to post task");
    }
    console.log(res);
    return res;
  };

  /**
   * Deletes a schedule event from the API by its ID.
   * @param {string} id - The ID of the event to be deleted.
   * @returns {Promise<Response>} The response from the server.
   * @throws {Error} If the delete operation fails.
   */
  const deleteTask = async (id: string) => {
    const reqBody = { id: id };
    const res = await fetch(api, {
      method: "DELETE",
      body: JSON.stringify(reqBody),
    });
    if (res.status === 201) {
      fetchTasks();
    }
    if (400 <= res.status && res.status <= 499) {
      const json = await res.json();
      console.log(json.error);
      throw new Error("Failed to delete event");
    }
    return res;
  };

  // Returns the state and functions for fetching, posting, and deleting events
  return [tasks, fetchTasks, postTask, deleteTask];
}
