import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function InscriptionForm() {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]); 
  const [selectedEvent, setSelectedEvent] = useState(null);
  console.log('ghollam', selectedEvent);
  
  const [selectedUsers, setSelectedUsers] = useState([]); 
  const [eventPlaces, setEventPlaces] = useState(0); 

  useEffect(() => {
   
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/event/getevents", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(
          response.data.map((event) => ({
            value: event._id,
            label: `${event.title} (${event.participants.length} / ${event.places} places)`,
          }))
        );
      } catch (err) {
        console.error("Error fetching events:", err);
        toast.error("Failed to load events.");
      }
    };

  
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/participants", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(
          response.data.map((user) => ({
            value: user._id,
            label: `${user.lastname} ${user.firstname} `,
          }))
        );
      } catch (err) {
        console.error("Error fetching users:", err);
        toast.error("Failed to load users.");
      }
    };

    fetchEvents();
    fetchUsers();
  }, []);

 
  const handleEventChange = async (event) => {
    setSelectedEvent(event);
    setEventPlaces(0);

   
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3000/api/events/${event.value}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEventPlaces(response.data.places - response.data.participants.length);
    } catch (err) {
      console.error("Error fetching event details:", err);
      toast.error("Failed to load event details.");
    }
  };
  console.log('hhhhh', selectedUsers);

  
  const handleSubmit = async () => {
    console.log('ffff');
    
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:3000/events/${selectedEvent.value}/add-participant`,
        {  userIds: selectedUsers.map((user) => user.value) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('chaim', users);
      

      
      setEventPlaces(eventPlaces - selectedUsers.length); 
      return response
    } catch (err) {
      console.error("Error adding participants:", err);
      toast.error("Failed to add participants.");
    }
  };


  return (
    <div className="p-4 m-20">
      <ToastContainer />
      <div>
        <h2 className="text-2xl font-bold">Add Participants to Event</h2>
        <div className="mt-4">
          <label className="block font-medium text-gray-700 mb-2">Select Event:</label>
          <Select
            options={events}
            value={selectedEvent}
            onChange={handleEventChange}
            placeholder="Choose an event"
            className="mb-4"
          />
        </div>

        {selectedEvent && (
          <div className="mt-2">
            <p className="text-gray-700">Available places: {eventPlaces}</p>
          </div>
        )}

        <div className="mt-4">
          <label className="block font-medium text-gray-700 mb-2">Select Participants:</label>
          <Select
            isMulti
            options={users}
            value={selectedUsers}
            onChange={setSelectedUsers}
            placeholder="Choose participants"
            className="mb-4"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
        >
          Add Participants
        </button>
      </div>
    </div>
  );
}
