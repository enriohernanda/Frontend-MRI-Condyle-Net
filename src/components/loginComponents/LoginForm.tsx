'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PasswordInput from '../PasswordInput';

const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const response = await fetch(`${baseUrl}/api/login`, {
        method: 'POST',
        body: formData,
      });



      
      const data = await response.json();

      if (data.result == "Fail") {
        setError(data.msg || 'Login failed');
      } else {
        console.log(data.token)
        localStorage.setItem('token', data.token);
        router.push('/upload'); 
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="absolute md:mt-50 lg:relative flex flex-col w-[90%] ml-[5%] md:ml-0 md:w-1/2 px-5 py-5 lg:px-10 lg:py-20 lg:mt-0 bg-white dark:bg-[#21262D] rounded-3xl lg:rounded-none shadow-[0_4px_10px_rgba(0,0,0,0.0.1),4px_0px_10px_rgba(0,0,0,0.0.1),-4px_0px_10px_rgba(0,0,0,0.0.1),0px_-4px_10px_rgba(0,0,0,0.0.1)] lg:shadow-none marginForm">
      <h2 className="text-2xl lg:text-3xl font-bold text-[#3674B5] dark:text-[#D8D8D8] lg:mt-10">Login</h2>
      <p className="text-black dark:text-[#D8D8D8] text-sm">Login your account here</p>
      <form className="mt-6 flex flex-col space-y-4" onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 rounded-2xl bg-[#D9D9D9]" required />
        <a href="/forgotPassword" className="text-[#578FCA] hover:text-sky-500 transition duration-200 text-sm mt-1">
          Forgot password?
        </a>
        <PasswordInput placeholder="Password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <a href="/register" className="text-[#578FCA] hover:text-sky-500 transition duration-200 text-sm mt-4">
          Create an account?
        </a>
        <button type="submit" className="w-full bg-[#3674B5] dark:bg-[#0D1117] text-white p-3 rounded-md hover:bg-sky-700 transition duration-200 cursor-pointer">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
