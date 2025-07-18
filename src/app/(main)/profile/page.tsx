'use client';

import ProfileForm from '@/components/profileComponents/ProfileForm';
import React from 'react';
import Image from 'next/image';

const ProfilePage = () => {
  return (
    <div className="w-full h-full px-4 py-6 text-black dark:text-white">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
                  {/* Icon Light Mode */}
                  <Image
                    src="/profile-blue.png"
                    alt="Profile Icon Light"
                    width={32}
                    height={32}
                    className="block dark:hidden"
                  />
                  {/* Icon Dark Mode */}
                  <Image
                    src="/profile-white.png"
                    alt="Profile Icon Dark"
                    width={32}
                    height={32}
                    className="hidden dark:block"
                  />
                  Profile
                </h1>
      </div>
      <ProfileForm />
    </div>
  );
};

export default ProfilePage;
