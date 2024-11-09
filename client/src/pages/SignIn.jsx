

import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userslice';
import Oauth from '../Components/Oauth';

export default function Signin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill out all fields.'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(signInFailure(data.message));
      } else {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-14">
      <div className="flex p-3 max-w-3xl h-full mx-auto flex-col sm:flex-row gap-5">
        {/* left */}
        <div className="flex flex-col flex-1 justify-center items-center h-full sm:mt-16 ">
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
                loading ? 'bg-gray-400' : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
              } text-white font-bold`}
              disabled={loading}
            >
              {loading ? (
                <p className="animate-spin inline w-4 h-4 border-2 border-white border-t-transparent rounded-full"></p>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
          <Oauth/>
          <p>
            Don't have an account? <Link to="/sign-up" className="text-blue-500">Sign up</Link>
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
