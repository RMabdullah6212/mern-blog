

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setformData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      if (res.ok){
        navigate('/sign-in');
      }
      // Handle successful signup (e.g., redirect or show a success message)
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-max mt-14">
      <div className="flex p-3 justify-center items-center max-w-3xl h-full mx-auto flex-col sm:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex flex-col flex-1 justify-center items-center h-full">
          <Link to="/" className="md:text-4xl flex justify-center items-center w-full">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white font-bold">
              Abdullah's
            </span>
            Blog
          </Link>
          <p className="text-xs pt-5 pl-3 pr-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, beatae. Molestiae explicabo accusantium quas! Quasi!
          </p>
        </div>

        {/* right */}
        <form className="flex-1 flex flex-col p-3 w-full h-full space-y-4 font-light text-xs" onSubmit={handleSubmit}>
          <div>
            <p>Your username</p>
            <input
              onChange={handleChange}
              id="username"
              type="text"
              className="mt-1 w-full rounded-md h-8 ring-0 bg-slate-100 outline-none"
              value={formData.username}
            />
          </div>
          <div>
            <p>Your email</p>
            <input
              onChange={handleChange}
              id="email"
              type="email"
              className="mt-1 w-full rounded-md h-8 ring-0 outline-none bg-slate-100"
              value={formData.email}
            />
          </div>
          <div>
            <p>Your password</p>
            <input
              onChange={handleChange}
              id="password"
              type="password"
              className="mt-1 w-full rounded-md h-8 bg-slate-100 outline-none"
              value={formData.password}
            />
          </div>
          <div>
            <button
              type="submit"
              className={`mt-1 w-full rounded-md h-8 ring-0 outline-none cursor-pointer flex items-center justify-center ${
                isLoading ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
              } text-white font-bold`}
              disabled={isLoading}
            >
              {isLoading ? (
                <p className="animate-spin inline w-4 h-4 border-2 border-white border-t-transparent rounded-full"></p>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
          <p>
            have an account? <Link to="/sign-in" className="text-blue-500">Sign in</Link>
          </p>
          {errorMessage && (
            <div className="rounded-md bg-red-100 w-full h-8 text-red-800">
              <p className="p-2 font-semibold">{errorMessage}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
