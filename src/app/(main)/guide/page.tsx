import React from 'react';
import Image from 'next/image';

const GuidePage = () => {
  return (
    <div className="w-full min-h-screen px-4 sm:px-8 py-6 text-black dark:text-white">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
          {/* Icon Light Mode */}
          <Image
            src="/guide-blue.png"
            alt="Guide Icon Light"
            width={32}
            height={32}
            className="block dark:hidden"
          />
          {/* Icon Dark Mode */}
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
            To register, click on the &quot;Register&quot; button on the homepage. Fill in your details and submit the form.
            After registration, you can log in using your email and password.
          </p>
          <h2 className="text-xl font-semibold mb-4">How to Upload Your Image?</h2>
          <p className="mb-4">
            After logging in, go to the &quot;Upload&quot; section. Click on the &quot;Choose File&quot; button to select your image,
            then click &quot;Upload&quot;. Your image will be processed and you can view the results in the &quot;History&quot; section.
          </p>
          <h2 className="text-xl font-semibold mb-4">How to View Your History?</h2>
          <p className="mb-4">
            Go to the &quot;History&quot; section to view all your uploaded images and their processing results. You can search
            by date or filter by status.
          </p>
          <h2 className="text-xl font-semibold mb-4">How to Update Your Profile?</h2>
          <p className="mb-4">
            To update your profile, go to the &quot;Profile&quot; section. You can change your name and upload a new profile
            picture. Click &quot;Save Changes&quot; to apply your updates.
          </p>
          <h2 className="text-xl font-semibold mb-4">How to Delete Your Account?</h2>
          <p className="mb-4">
            If you wish to delete your account, go to the &quot;Profile&quot; section and click on the &quot;Delete Account&quot; button.
            This action is irreversible, so please proceed with caution.
          </p>
          <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
          <p className="mb-4">
            If you have any questions or need assistance, feel free to contact our support team via the &quot;Contact Us&quot;
            section. We are here to help you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuidePage;
