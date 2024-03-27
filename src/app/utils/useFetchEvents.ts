import { useEffect, useState } from "react";
import ScheduleEvent from "../types/ScheduleEvent";
import { redirect, useRouter } from "next/navigation";
/**
 * Custom React hook for managing CRUD operations on schedule events.
 * @returns An array containing the list of events, a function to fetch events,
 * a function to post a new event, and a function to delete an event.
 */
export default function useFetchEvents(): [
  ScheduleEvent[],
  () => Promise<void>,
  (body: BodyInit) => Promise<Response>,
  (id: string) => Promise<Response>
] {
  // State to hold the list of schedule events
  const [events, setEvents] = useState<ScheduleEvent[]>([]);

  // API endpoint for schedule events
  const api = "http://localhost:3000/api/events";

  const { push } = useRouter();

  /**
   * Fetches schedule events from the API and updates the state.
   * @throws {Error} If the fetch operation fails.
   */
  const fetchEvents = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (400 <= res.status && res.status <= 499) {
      //redirect to signIn if fetch failed
      push("/signIn");
    }

    const json = await res.json();
    console.log(json);
    // Map JSON response to ScheduleEvent objects
    const fetchedEvents = json.map(
      (event: ScheduleEvent) =>
        new ScheduleEvent(event.id, event.title, event.deadline, event.tasks)
    ) as ScheduleEvent[];

    // Sort events by their deadlines
    fetchedEvents.sort((a, b) => {
      const deadline1 = parseInt(a.deadline.split("-").join(""));
      const deadline2 = parseInt(b.deadline.split("-").join(""));

      return deadline1 - deadline2;
    });

    // Update state with fetched and sorted events
    setEvents(fetchedEvents);
  };

  /**
   * Posts a new schedule event to the API.
   * @param {BodyInit} body - The request body to be sent to the server.
   * @returns {Promise<Response>} The response from the server.
   * @throws {Error} If the post operation fails.
   */
  const postEvent = async (body: BodyInit) => {
    const res = await fetch(api, { method: "POST", body: body });
    if (400 <= res.status && res.status <= 499) {
      throw new Error("Failed to post event");
    }
    return res;
  };

  /**
   * Deletes a schedule event from the API by its ID.
   * @param {string} id - The ID of the event to be deleted.
   * @returns {Promise<Response>} The response from the server.
   * @throws {Error} If the delete operation fails.
   */
  const deleteEvent = async (id: string) => {
    const reqBody = { id: id };
    const res = await fetch(api, {
      method: "DELETE",
      body: JSON.stringify(reqBody),
    });
    if (400 <= res.status && res.status <= 499) {
      throw new Error("Failed to delete event");
    }
    return res;
  };

  // Initializes events by fetching them when the component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  // Returns the state and functions for fetching, posting, and deleting events
  return [events, fetchEvents, postEvent, deleteEvent];
}
