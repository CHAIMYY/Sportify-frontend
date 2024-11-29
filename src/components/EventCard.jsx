import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function EventCard() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in to view events.");
          return;
        }
        const response = await axios.get("http://localhost:3000/api/event/getevents", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(response.data);
      } catch (err) {
        setError("Failed to load events.");
        console.error(err);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/event/deleteEvent/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(events.filter((event) => event._id !== id));
      toast.success("Event deleted successfully!");
    } catch (err) {
      console.error("Failed to delete event:", err);
      toast.error("Error deleting event.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`); 
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {error && <p className="text-red-500">{error}</p>}

        {events.length === 0 ? (
          <p>No events available.</p>
        ) : (
          events.map((event) => (
            <div key={event._id} className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
              <p className="text-gray-600 mt-2">{event.description}</p>
              <p className="mt-2 font-medium text-gray-700">Duration: {event.duration}</p>
              <p className="mt-1 text-gray-500">Places: {event.places}</p>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleEdit(event._id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
