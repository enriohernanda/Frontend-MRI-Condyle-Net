'use client';

import React, { useState } from 'react';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);

      const response = await fetch(`${baseUrl}/api/register`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.msg || 'Registration failed.');
      } else {
        setSuccess(data.msg);
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="absolute md:mt-50 lg:relative flex flex-col w-[90%] ml-[5%] md:ml-0 md:w-1/2 px-5 py-5 lg:px-10 lg:py-20 lg:mt-0 bg-white dark:bg-[#21262D] rounded-3xl lg:rounded-none shadow-[0_4px_10px_rgba(0,0,0,0.0.1),4px_0px_10px_rgba(0,0,0,0.0.1),-4px_0px_10px_rgba(0,0,0,0.0.1),0px_-4px_10px_rgba(0,0,0,0.0.1)] lg:shadow-none marginForm">
      <h2 className="text-2xl lg:text-3xl font-bold text-[#3674B5] dark:text-[#D8D8D8] lg:mt-10">Register</h2>
      <p className="text-black dark:text-[#D8D8D8] text-sm">If you don’t have an account register here</p>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col space-y-4">
        <input type="text" placeholder="Name" className="w-full p-2 rounded-2xl bg-[#D9D9D9]" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="email" placeholder="Email" className="w-full p-2 rounded-2xl bg-[#D9D9D9]" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full p-2 rounded-2xl bg-[#D9D9D9]" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" className="w-full p-2 rounded-2xl bg-[#D9D9D9]" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <button type="submit" className="w-full bg-[#3674B5] dark:bg-[#0D1117] text-white p-3 rounded-md hover:bg-sky-700 transition duration-200 cursor-pointer">
          Register
        </button>

        <a href="/login" className="text-[#578FCA] hover:text-sky-500 transition duration-200 text-sm mt-4">
          Already have an account?
        </a>
      </form>
    </div>
  );
};

export default RegisterForm;
