'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaChevronDown } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import { useUserContext } from '@/context/UserContext';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const { profileUrl, setProfileUrl } = useUserContext();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const formData = new FormData();
      formData.append('mytoken', token);

      try {
        const res = await fetch('http://localhost:5000/api/get-profile', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (res.ok) {
          if (data.profile?.profilePict) {
            setProfileUrl(`http://localhost:5000/${data.profile.profilePict}`);
          } else {
            setProfileUrl('/photos.png');
          }
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, [setProfileUrl]);

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
              <img
                src={profileUrl || '/photos.png'}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <FaChevronDown className={`cursor-pointer transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-[#578FCA] dark:bg-[#161B22] rounded-lg shadow-lg overflow-hidden">
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
