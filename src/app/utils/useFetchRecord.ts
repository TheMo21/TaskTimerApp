import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Record from "../types/RecordType";
/**
 * Custom React hook for managing CRUD operations on records.
 * @returns An array containing the list of records, a function to fetch records,
 * a function to post a new record, and a function to delete a record.
 */
export default function useFetchRecord(): [
  Record[],
  () => Promise<void>,
  (body: BodyInit) => Promise<Response>,
  (id: string) => Promise<Response>
] {
  // State to hold the list of records
  const [records, setRecords] = useState<Record[]>([]);

  // API endpoint for records
  const api = "http://localhost:3000/api/record";
  const token = localStorage.getItem("token");

  /**
   * Fetches records from the API and updates the state.
   * @throws {Error} If the fetch operation fails.
   */
  const fetchRecords = async () => {
    const { push } = useRouter();
    if (!token) {
      push("/userAuth");
    }
    try {
      const res = await fetch(api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        const data = await res.json();
        setRecords(data);
        return;
      } else if (res.status === 401) {
        push("/userAuth");
      }
    } catch (error) {
      console.error("Error fetching records:", error);
      throw error;
    }
  };

  /**
   * Posts a new record to the API.
   * @param {BodyInit} body - The request body to be sent to the server.
   * @returns {Promise<Response>} The response from the server.
   * @throws {Error} If the post operation fails.
   */
  const postRecord = async (body: BodyInit) => {
    try {
      const res = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      if (res.status === 201) {
        fetchRecords();
      }
      if (res.status >= 400) {
        throw new Error("Failed to post record");
      }
      return res;
    } catch (error) {
      console.error("Error posting record:", error);
      throw error;
    }
  };

  /**
   * Deletes a record from the API by its ID.
   * @param {string} id - The ID of the record to be deleted.
   * @returns {Promise<Response>} The response from the server.
   * @throws {Error} If the delete operation fails.
   */
  const deleteRecord = async (id: string) => {
    try {
      const res = await fetch(`${api}/${id}`, {
        method: "DELETE",
      });
      if (res.status >= 400) {
        throw new Error("Failed to delete record");
      }
      return res;
    } catch (error) {
      console.error("Error deleting record:", error);
      throw error;
    }
  };

  // Return the state and functions for fetching, posting, and deleting records
  return [records, fetchRecords, postRecord, deleteRecord];
}
