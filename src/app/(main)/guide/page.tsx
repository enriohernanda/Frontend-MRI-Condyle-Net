import React from 'react';
import Image from 'next/image';

const GuidePage = () => {
  return (
    <div className="w-full min-h-screen px-4 sm:px-8 py-6 text-black dark:text-white">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
          {/* Gambar untuk light mode */}
          <Image
            src="/guide-blue.png"
            alt="Guide Icon Light"
            width={32}
            height={32}
            className="block dark:hidden"
          />
          {/* Gambar untuk dark mode */}
          <Image
            src="/guide-white.png"
            alt="Guide Icon Dark"
            width={32}
            height={32}
            className="hidden dark:block"
          />
          Guide
        </h1>

        <div className="mt-6 p-6 sm:p-10 rounded-lg border-2 transition-colors border-sky-400 dark:border-[#2AB7C6] bg-[#F4F9FF] dark:bg-[#161B22]">
          <h2 className="text-xl font-semibold mb-4">How to Register and Login?</h2>
          <p className="mb-4">
            To register, click on the "Register" button on the homepage. Fill in your details and submit the form.
            After registration, you can log in using your email and password.
          </p>
          <h2 className="text-xl font-semibold mb-4">How to Upload Your Image?</h2>
          <p className="mb-4">
            After logging in, go to the "Upload" section. Click on the "Choose File" button to select your image,
            then click "Upload". Your image will be processed and you can view the results in the "History" section.
          </p>
          <h2 className="text-xl font-semibold mb-4">How to View Your History?</h2>
          <p className="mb-4">
            Go to the "History" section to view all your uploaded images and their processing results. You can search
            by date or filter by status.
          </p>
          <h2 className="text-xl font-semibold mb-4">How to Update Your Profile?</h2>
          <p className="mb-4">
            To update your profile, go to the "Profile" section. You can change your name and upload a new profile
            picture. Click "Save Changes" to apply your updates.
          </p>
          <h2 className="text-xl font-semibold mb-4">How to Delete Your Account?</h2>
          <p className="mb-4">
            If you wish to delete your account, go to the "Profile" section and click on the "Delete Account" button.
            This action is irreversible, so please proceed with caution.
          </p>
          <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
          <p className="mb-4">
            If you have any questions or need assistance, feel free to contact our support team via the "Contact Us"
            section. We are here to help you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuidePage;
