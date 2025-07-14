'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface ResetPasswordPageProps {
  token: string;
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ token }) => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [msg, setMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    setIsSuccess(false);

    if (!password || !confirmPassword) {
      setMsg('Please fill out both fields.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMsg('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('password', password);
      formData.append('confirm_password', confirmPassword);

      const res = await fetch(`${baseUrl}/api/reset-password/${token}`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setIsSuccess(true);
        setMsg(data.msg || 'Password successfully changed!');
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => router.push('/login'), 3000);
      } else {
        setMsg(data.msg || 'Failed to reset password.');
      }
    } catch (err) {
      setMsg('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute md:mt-50 lg:relative flex flex-col w-[90%] ml-[5%] md:ml-0 md:w-1/2 px-5 py-5 lg:px-10 lg:py-20 lg:mt-0 bg-white dark:bg-[#21262D] rounded-3xl lg:rounded-none shadow-[0_4px_10px_rgba(0,0,0,0.1),4px_0px_10px_rgba(0,0,0,0.1),-4px_0px_10px_rgba(0,0,0,0.1),0px_-4px_10px_rgba(0,0,0,0.1)] lg:shadow-none marginForm">
      <h2 className="text-2xl lg:text-3xl font-bold text-[#3674B5] dark:text-[#D8D8D8] lg:mt-10">Reset Password</h2>
      <p className="text-black dark:text-[#D8D8D8] text-sm">Enter your new password here</p>
      <form className="mt-6 flex flex-col space-y-4" onSubmit={handleSubmit}>
        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded-2xl bg-[#D9D9D9] text-black pr-10"
            required
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 rounded-2xl bg-[#D9D9D9] text-black pr-10"
            required
          />
          <span
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#3674B5] dark:bg-[#0D1117] text-white p-3 rounded-md hover:bg-sky-700 transition duration-200 cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Reset Password'}
        </button>

        {msg && (
          <p className={`text-center text-sm mt-2 ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
            {msg}
          </p>
        )}
      </form>
    </div>
  );
};

export default ResetPasswordPage;
