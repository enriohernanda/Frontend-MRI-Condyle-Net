'use client';

import React, { useState } from 'react';

const ForgotPassForm = () => {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    setIsSuccess(false);

    if (!email) {
      setMsg('Email is required.');
      setIsSuccess(false);
      setLoading(false);
      return;
    }
    try {
      const formData = new FormData();
      formData.append('email', email);

      const res = await fetch(`${baseUrl}/api/send-reset-link`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMsg(data.msg || 'Reset link sent successfully!');
        setIsSuccess(true);
        setEmail('');
      } else {
        setMsg(data.msg || 'Something went wrong.');
        setIsSuccess(false);
      }
      
    } catch (err) {
      console.error(err);
      setMsg('Failed to connect to the server.');
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute md:mt-50 lg:relative flex flex-col w-[90%] ml-[5%] md:ml-0 md:w-1/2 px-5 py-5 lg:px-10 lg:py-20 lg:mt-0 bg-white dark:bg-[#21262D] rounded-3xl lg:rounded-none shadow-[0_4px_10px_rgba(0,0,0,0.1),4px_0px_10px_rgba(0,0,0,0.1),-4px_0px_10px_rgba(0,0,0,0.1),0px_-4px_10px_rgba(0,0,0,0.1)] lg:shadow-none marginForm">
      <h2 className="text-2xl lg:text-3xl font-bold text-[#3674B5] dark:text-[#D8D8D8] lg:mt-10">Forgot Password?</h2>
      <p className="text-black dark:text-[#D8D8D8] text-sm">Enter your email here</p>
      <form className="mt-6 flex flex-col space-y-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded-2xl bg-[#D9D9D9] text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#3674B5] dark:bg-[#0D1117] text-white p-3 rounded-md hover:bg-sky-700 transition duration-200 cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Send Reset Link'}
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
