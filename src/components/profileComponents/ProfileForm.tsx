'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useUserContext } from '@/context/UserContext';
import Image from 'next/image';

const ProfileForm = () => {
  const [username, setUsernameLocal] = useState('');
  const [email, setEmail] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tempPreviewUrl, setTempPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { profileUrl, setProfileUrl, setUsername } = useUserContext();

  const DEFAULT_IMAGE = '/photos.png';
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const formData = new FormData();
      formData.append('mytoken', token);

      try {
        const res = await fetch(`${API_BASE}/api/get-profile`, {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error('Fetch profile failed:', errorText);
          return;
        }

        const data = await res.json();
        const fetchedUsername = data.profile?.username || '';
        const fetchedEmail = data.profile?.email || '';
        const imagePath = data.profile?.profilePict || DEFAULT_IMAGE;

        setUsernameLocal(fetchedUsername);
        setEmail(fetchedEmail);
        setProfileUrl(`${API_BASE}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`);
        setUsername(fetchedUsername);
        localStorage.setItem('username', fetchedUsername);
        localStorage.setItem('profileUrl', imagePath);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, [API_BASE, setProfileUrl, setUsername]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const previewURL = URL.createObjectURL(file);
      setTempPreviewUrl(previewURL);
    }
  };

  const handleDeleteImage = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const formData = new FormData();
    formData.append('mytoken', token);

    try {
      const res = await fetch(`${API_BASE}/api/profile/delete_photo`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Delete failed:', errorText);
        return;
      }

      await res.json();
      setProfileUrl(`${API_BASE}${DEFAULT_IMAGE}`);
      localStorage.setItem('profileUrl', DEFAULT_IMAGE);
      setSelectedFile(null);
      setTempPreviewUrl(null);
    } catch (err) {
      console.error('Delete image error:', err);
    }
  };

  const handleDeleteAccount = async () => {
  const confirmDelete = window.confirm("Are you sure you want to permanently delete your account?");
  if (!confirmDelete) return;

  const token = localStorage.getItem('token');
  if (!token) return;

  const formData = new FormData();
  formData.append('mytoken', token);

  try {
    const res = await fetch(`${API_BASE}/api/profile/delete_account`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      alert("Account deleted successfully.");

      // Hapus semua data dari localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('profileUrl');

      // Redirect ke halaman login atau landing
      window.location.href = '/login';
    } else {
      console.error('Delete account failed:', data.msg);
      alert(`Failed to delete account: ${data.msg}`);
    }
  } catch (error) {
    console.error('Error deleting account:', error);
    alert('Something went wrong while deleting account.');
  }
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) return;

    const formData = new FormData();
    formData.append('mytoken', token);
    formData.append('username', username);
    if (selectedFile) {
      formData.append('filePict', selectedFile);
    }

    try {
      const res = await fetch(`${API_BASE}/api/update-profile`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Upload failed:', errorText);
        return;
      }

      const data = await res.json();
      const savedImagePath = data.filePict || DEFAULT_IMAGE;

      setProfileUrl(`${API_BASE}/${savedImagePath}`);
      setUsername(username);
      localStorage.setItem('profileUrl', savedImagePath);
      localStorage.setItem('username', username);
      setSelectedFile(null);
      setTempPreviewUrl(null);
      window.location.reload();
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white dark:bg-[#21262D] rounded-xl shadow-md px-6 py-10 text-center space-y-6"
    >
      <div className="flex justify-center">
        <div
          className="relative w-32 h-32 rounded-full overflow-hidden group cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <Image
            src={tempPreviewUrl || profileUrl || DEFAULT_IMAGE}
            alt="Profile"
            onError={(e) => (e.currentTarget.src = DEFAULT_IMAGE)}
            width={128}
            height={128}
            className="w-full h-full rounded-full border-2 border-gray-300 dark:border-gray-600 bg-[#D9D9D9] object-cover"
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>

      <div className="space-y-4 text-left">
        <div>
          <label className="font-semibold text-lg text-black dark:text-white">
            Name
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsernameLocal(e.target.value)}
            className="w-full mt-1 p-2 rounded-md bg-gray-200 dark:bg-[#1B1F24] dark:text-white"
          />
        </div>

        <div>
          <label className="font-semibold text-lg text-black dark:text-white">
            Email
          </label>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full mt-1 p-2 rounded-md bg-gray-100 dark:bg-[#2A2F36] text-gray-600 dark:text-gray-400 cursor-not-allowed"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          type="button"
          onClick={handleDeleteImage}
          className="text-sm px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md whitespace-nowrap cursor-pointer"
        >
          Delete Photo
        </button>
        <button
          type="button"
          onClick={handleDeleteAccount}
          className="text-sm px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md whitespace-nowrap cursor-pointer"
        >
          Delete Account
        </button>
        <button
          type="submit"
          className="text-sm px-4 py-2 bg-[#3674B5] dark:bg-[#161B22] text-white hover:bg-[#2a5f9e] border border-sky-600 dark:border-[#2AB7C6] rounded-md whitespace-nowrap cursor-pointer"
        >
          Save Changes
        </button>

      </div>
    </form>
  );
};

export default ProfileForm;
