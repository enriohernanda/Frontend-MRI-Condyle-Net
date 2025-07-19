'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaChevronDown } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import { useUserContext } from '@/context/UserContext';
import Image from 'next/image';


const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const DEFAULT_IMAGE = '/photos.png';

interface Notification {
  message: string;
  timestamp: string;
  read?: boolean;
}

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0); // Jumlah notifikasi baru

  const router = useRouter();
  const { profileUrl, setProfileUrl, setUsername } = useUserContext();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setProfileUrl(DEFAULT_IMAGE);
      setUsername('');
      router.push('/login');
      return;
    }

    const formData = new FormData();
    formData.append('mytoken', token);

    try {
      await fetch(`${API_BASE}/api/logout`, { method: 'POST', body: formData });
    } catch (err) {
      console.error('Logout error:', err);
    }

    localStorage.removeItem('token');
    localStorage.removeItem('profileUrl');
    localStorage.removeItem('username');
    setProfileUrl(DEFAULT_IMAGE);
    setUsername('');
    router.push('/login');
  };

  const fetchNotifications = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const formData = new FormData();
    formData.append('mytoken', token);

    try {
      const res = await fetch(`${API_BASE}/api/profile/notifications`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        const allNotifs = data.notifications || [];

        setNotifications(allNotifs);
        setUnreadCount(0);
        await fetch(`${API_BASE}/api/profile/notifications/mark_read`, {
          method: 'POST',
          body: formData,
        });
      }
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    }
  };

  const toggleNotifDropdown = () => {
    const newState = !showNotifDropdown;
    setShowNotifDropdown(newState);
    if (newState) fetchNotifications();
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchProfile = async () => {
      const formData = new FormData();
      formData.append('mytoken', token);
      try {
        const res = await fetch(`${API_BASE}/api/get-profile`, {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) return;
        const data = await res.json();
        const image = data.profile?.profilePict || DEFAULT_IMAGE;
        const imageUrl = image.startsWith('http') ? image : `${API_BASE}/${image}`;

        setProfileUrl(imageUrl);
        localStorage.setItem('profileUrl', imageUrl);

        const name = data.profile?.username || '';
        setUsername(name);
        localStorage.setItem('username', name);
      } catch (err) {
        console.error('Profile fetch failed:', err);
      }
    };

    fetchProfile();
  }, [setProfileUrl, setUsername]);

  useEffect(() => {
    const checkUnread = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const formData = new FormData();
      formData.append('mytoken', token);

      try {
        const res = await fetch(`${API_BASE}/api/profile/notifications`, {
          method: 'POST',
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          const unread = data.notifications.filter((n: Notification) => !n.read).length;
          setUnreadCount(unread);
        }
      } catch (err) {
        console.error('Unread check failed:', err);
      }
    };

    checkUnread();
  }, []);

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-[#578FCA] dark:bg-[#161B22] shadow-md relative">
      <div className="flex items-center">
        <Image
          src="/logo-MRICondyleNet.png"
          alt="Logo"
          width={40}
          height={40}
          className="h-8 md:h-10 w-auto"
        />

        <span className="hidden md:block md:text-md lg:text-xl font-bold ml-2 text-white">
          MRICondyleNET
        </span>
      </div>

      <div className="flex items-center gap-6 relative">
        {/* NOTIFIKASI */}
        <div className="relative">
          <Image
            src="/notif.png"
            alt="notif"
            width={24}
            height={24}
            className="w-6 cursor-pointer"
            onClick={toggleNotifDropdown}
          />

          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 rounded-full">
              {unreadCount}
            </span>
          )}
          {showNotifDropdown && (
            <div className="absolute right-0 mt-2 w-72 max-h-64 overflow-y-auto bg-white dark:bg-[#161B22] rounded-lg shadow-lg z-50 p-3">
              <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-2">Notifications</h3>
              {notifications.length === 0 ? (
                <p className="text-xs text-gray-500 dark:text-gray-400">No notifications</p>
              ) : (
                notifications.map((notif, index) => (
                  <div
                    key={index}
                    className="mb-2 p-2 rounded bg-gray-100 dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100"
                  >
                    {notif.message || 'No message'}
                    <div className="text-[10px] text-gray-500">
                      {notif.timestamp
                        ? new Date(notif.timestamp).toLocaleString('id-ID', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })
                        : 'No timestamp'}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <ThemeToggle />

        {/* DROPDOWN PROFILE */}
        <div className="relative">
          <button onClick={toggleDropdown} className="flex items-center text-lg gap-2 text-white">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-[#D9D9D9] flex items-center justify-center">
              <Image
                src={profileUrl || DEFAULT_IMAGE}
                alt="User"
                width={40}
                height={40}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = DEFAULT_IMAGE;
              }}
              />

            </div>
            <FaChevronDown
              className={`cursor-pointer transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-[#578FCA] dark:bg-[#161B22] rounded-lg shadow-lg overflow-hidden z-50">
              <button
                onClick={() => router.push('/profile')}
                className="block w-full text-left px-4 py-2 text-white hover:bg-[#3674B5] dark:hover:bg-[#30363D] cursor-pointer"
              >
                Profile
              </button>
              <hr className="border-gray-200 dark:border-gray-600" />
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-white hover:bg-[#3674B5] dark:hover:bg-[#30363D] cursor-pointer"
              >
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
