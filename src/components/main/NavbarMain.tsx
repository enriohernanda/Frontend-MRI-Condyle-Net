'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaChevronDown } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import { useUserContext } from '@/context/UserContext';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const { profileUrl, setProfileUrl, setUsername } = useUserContext();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setProfileUrl('/photos.png');
      setUsername('');
      router.push('/login');
      return;
    }

    const formData = new FormData();
    formData.append('mytoken', token);

    try {
      await fetch('https://6c1a-2a09-bac1-3480-18-00-3c5-3a.ngrok-free.app/api/logout', {
        method: 'POST',
        body: formData,
      });
    } catch (err) {
      console.error('Logout error:', err);
    }

    localStorage.removeItem('token');
    localStorage.removeItem('profileUrl');
    localStorage.removeItem('username');
    setProfileUrl('/photos.png');
    setUsername('');
    router.push('/login');
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const formData = new FormData();
      formData.append('mytoken', token);

      try {
        const res = await fetch('https://6c1a-2a09-bac1-3480-18-00-3c5-3a.ngrok-free.app/api/get-profile', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error('Fetch profile failed:', errorText);
          return;
        }

        const data = await res.json();
        const imageUrl = data.profile?.profilePict || '/photos.png';
        const name = data.profile?.username || '';

        setProfileUrl(imageUrl);
        localStorage.setItem('profileUrl', imageUrl);
        setUsername(name);
        localStorage.setItem('username', name);
      } catch (err) {
        console.error('Fetch profile error:', err);
      }
    };

    fetchProfile();
  }, [setProfileUrl, setUsername]);

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-[#578FCA] dark:bg-[#161B22] shadow-md">
      <div className="flex items-center">
        <img src="/logo-MRICondyleNet.png" alt="Logo" className="h-8 md:h-10" />
        <span className="hidden md:block md:text-md lg:text-xl font-bold ml-2 text-white">MRICondyleNET</span>
      </div>

      <div className="flex items-center gap-6">
        <ThemeToggle />
        <div className="relative">
          <button onClick={toggleDropdown} className="flex items-center text-lg gap-2 text-white">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-[#D9D9D9] flex items-center justify-center">
              <img src={profileUrl} alt="User Profile" onError={(e) => (e.currentTarget.src = '/photos.png')} className="w-full h-full" />
            </div>
            <FaChevronDown className={`cursor-pointer transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-[#578FCA] dark:bg-[#161B22] rounded-lg shadow-lg overflow-hidden z-50">
              <button onClick={() => router.push('/profile')} className="block w-full text-left px-4 py-2 text-white hover:bg-[#5774ca] dark:hover:bg-[#30363D] cursor-pointer">
                Profile
              </button>
              <hr className="border-gray-200 dark:border-gray-600" />
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-white hover:bg-[#5774ca] dark:hover:bg-[#30363D] cursor-pointer">
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
