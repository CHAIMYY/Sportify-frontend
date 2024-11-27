import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [role, setRole] = useState("participant");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post("http://localhost:3000/register", {
        email,
        password,
        firstname,
        lastname,
        role,
      });

      const token = response.data.token;
      localStorage.setItem("authToken", token);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="mt-5 flex h-full flex-1 flex-col justify-center px-4 py-8 lg:px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-xs">
        <img
          alt="Your Company"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-8 w-auto"
        />
        <h2 className="mt-6 text-center text-xl font-bold tracking-tight text-gray-900">
          Register an Account
        </h2>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-xs">
        {error && <p className="mb-2 text-center text-xs text-red-600">{error}</p>}
        {success && <p className="mb-2 text-center text-xs text-green-600">Registration successful!</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstname" className="block text-xs font-medium text-gray-900">
              Firstname
            </label>
            <div className="mt-1">
              <input
                id="firstname"
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 text-xs"
              />
            </div>
          </div>

          <div>
            <label htmlFor="lastname" className="block text-xs font-medium text-gray-900">
              Lastname
            </label>
            <div className="mt-1">
              <input
                id="lastname"
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 text-xs"
              />
            </div>
          </div>

          <div>
            <label htmlFor="role" className="block text-xs font-medium text-gray-900">
              Role
            </label>
            <div className="mt-1">
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 text-xs"
              >
                <option value="participant">Participant</option>
                <option value="organisateur">Organisateur</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 text-xs"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-medium text-gray-900">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 text-xs"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
