'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const sections = ['About', 'AI-Model', 'Features', 'Acknowledgment', 'Our-Team'];

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);

      let maxVisible = 0;
      let newActiveSection = '';

      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

          if (visibleHeight > maxVisible) {
            maxVisible = visibleHeight;
            newActiveSection = id;
          }
        }
      });

      if (newActiveSection) {
        setActiveSection(newActiveSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-7 left-0 w-full flex justify-center z-50 px-4">
      <button className="md:hidden absolute left-4 top-2 z-50 text-gray-200 text-2xl" onClick={() => setIsOpen(true)}>
        <FiMenu />
      </button>

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`hidden md:flex px-6 md:px-8 py-3 md:py-4 bg-gray-900 text-gray-200 rounded-full gap-4 md:gap-6 transition-all max-w-full md:max-w-fit top-0 shadow-lg shadow-cyan-500/50 bg-transparent backdrop-blur-md ${
          isSticky ? 'py-3 px-10 md:py-4 md:px-16 top-2' : 'top-4'
        }`}
      >
        {sections.map((item, index) => (
          <motion.a
            key={index}
            href={`#${item}`}
            className={`relative text-sm md:text-base font-semibold transition-all px-6 py-3 ${
              activeSection === item
                ? 'bg-cyan-500 text-gray-200 font-bold rounded-full'
                : 'text-gray-400 hover:text-gray-100 after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-teal-500 after:transition-all after:duration-300 hover:after:w-full'
            }`}
          >
            {item.replace('-', ' ')}
          </motion.a>
        ))}
      </motion.nav>

      {isOpen && <div className="fixed inset-0 bg-[#161B22] bg-opacity-50 z-40" onClick={() => setIsOpen(false)} />}

      <motion.div initial={{ x: '-100%' }} animate={{ x: isOpen ? 0 : '-100%' }} transition={{ duration: 0.3 }} className="fixed top-0 left-0 w-64 h-full bg-gray-900 text-gray-200 z-50 flex flex-col items-start p-6 shadow-lg">
        <button className="absolute top-4 right-4 text-2xl" onClick={() => setIsOpen(false)}>
          <FiX />
        </button>

        <nav className="flex flex-col gap-6 mt-12">
          {sections.map((item, index) => (
            <motion.a
              key={index}
              href={`#${item}`}
              className={`text-lg transition-all px-4 py-2 ${
                activeSection === item
                  ? 'bg-cyan-500 text-gray-200 font-bold rounded-full'
                  : 'text-gray-400 hover:text-gray-200 after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-cyan-500 after:transition-all after:duration-300 hover:after:w-full'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.replace('-', ' ')}
            </motion.a>
          ))}
        </nav>
      </motion.div>
    </div>
  );
};

export default Navbar;
