import React, { useState } from "react";
import axios from "axios";

const EventForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [places, setPlaces] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to create an event.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/event/create",
        {
          title,
          description,
          duration,
          places,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(true);
      setTitle("");
      setDescription("");
      setDuration("");
      setPlaces(0);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        (err.response?.status === 401 || err.response?.status === 403
          ? "You are not authorized to perform this action."
          : "An error occurred. Please try again.");
      setError(errorMessage);
      console.error(err);
    }
  };

  return (
    <div className="isolate bg-gray-200 px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Create Event</h2>
        <p className="mt-2 text-lg text-gray-900">Fill out the details below to create your event.</p>
      </div>

      {error && <p style={{ color: "red" }} className="text-center mt-4">{error}</p>}
      {success && <p style={{ color: "green" }} className="text-center mt-4">Event created successfully!</p>}

      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-900">Title</label>
            <div className="mt-2.5">
              <input
                id="title"
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-900">Description</label>
            <div className="mt-2.5">
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-semibold text-gray-900">Duration</label>
            <div className="mt-2.5">
              <input
                id="duration"
                name="duration"
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="places" className="block text-sm font-semibold text-gray-900">Number of Places</label>
            <div className="mt-2.5">
              <input
                id="places"
                name="places"
                type="number"
                min="0"
                value={places}
                onChange={(e) => setPlaces(Number(e.target.value))}
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
