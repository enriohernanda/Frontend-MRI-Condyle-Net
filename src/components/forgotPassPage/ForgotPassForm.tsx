'use client';

import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ForgotPassForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    setIsSuccess(false);

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const res = await fetch('https://aecc-2a09-bac5-3a25-1d05-00-2e4-10.ngrok-free.app/api/forget-password-check', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMsg(data.msg || 'Password updated successfully!');
        setIsSuccess(true);
        setEmail('');
        setPassword('');
      } else {
        setMsg(data.msg || 'Something went wrong.');
        setIsSuccess(false);
      }
    } catch (err) {
      setMsg('Failed to connect to the server.');
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute md:mt-50 lg:relative flex flex-col w-[90%] ml-[5%] md:ml-0 md:w-1/2 px-5 py-5 lg:px-10 lg:py-20 lg:mt-0 bg-white dark:bg-[#21262D] rounded-3xl lg:rounded-none shadow-[0_4px_10px_rgba(0,0,0,0.1),4px_0px_10px_rgba(0,0,0,0.1),-4px_0px_10px_rgba(0,0,0,0.1),0px_-4px_10px_rgba(0,0,0,0.1)] lg:shadow-none marginForm">
      <h2 className="text-2xl lg:text-3xl font-bold text-[#3674B5] dark:text-[#D8D8D8] lg:mt-10">Forgot Password?</h2>
      <p className="text-black dark:text-[#D8D8D8] text-sm">Enter your email and new password</p>
      <form className="mt-6 flex flex-col space-y-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded-2xl bg-[#D9D9D9] text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="New Password"
            className="w-full p-2 rounded-2xl bg-[#D9D9D9] text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#3674B5] dark:bg-[#0D1117] text-white p-3 rounded-md hover:bg-sky-700 transition duration-200 cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Change Password'}
        </button>

        <a href="/login" className="text-[#578FCA] hover:text-sky-500 transition duration-200 text-sm mt-1">
          Back to Login
        </a>

        {msg && (
          <p className={`mt-2 text-center text-sm ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
            {msg}
          </p>
        )}
      </form>
    </div>
  );
};

export default ForgotPassForm;
