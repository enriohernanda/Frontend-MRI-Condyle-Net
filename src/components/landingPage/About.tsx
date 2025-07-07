'use client';

import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const [startTyping, setStartTyping] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (inView) {
      setStartTyping(true);
      setKey((prevKey) => prevKey + 1);
    }
  }, [inView]);

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full h-full px-4 md:px-8 lg:px-16">
      <div
        className="relative z-20 flex flex-col items-center justify-center w-full h-auto p-8 
           shadow-teal-500/50 before:absolute before:inset-0 before:bg-gradient-to-r from-teal-500 to-cyan-500 before:blur-xl before:opacity-20"
      >
        <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} transition={{ duration: 0.8 }} className="flex flex-col items-center justify-center w-full text-center">
          <div className="max-w-4xl mx-auto flex flex-col gap-5 justify-center items-center">
            <motion.div className="font-bold text-3xl md:text-3xl lg:text-4xl">
              <span className="text-transparent bg-clip-text bg-[#D8D8D8] font-orelega">
                {startTyping && (
                  <Typewriter
                    key={key}
                    words={[
                      'MRICondyleNet is an AI-driven research project focused on instance segmentation of the mandibular condyle using MRI images. The condyle is a crucial structure in the temporomandibular joint (TMJ), and precise segmentation of this region plays a vital role in the early detection and analysis of Temporomandibular Joint Disorders (TMJDs). This project leverages state-of-the-art deep learning models, including Detectron2, MMDetection (Cascade Mask R-CNN), and MMsegmentation (DeepLabV3+), combined through ensemble learning strategies to improve accuracy and robustness. The dataset comprises 360 annotated MRI images, meticulously labeled in COCO format, with preprocessing and data augmentation applied to enhance model generalization. All development and training are conducted on cloud and local GPU environments to optimize performance and scalability. By bringing AI into the realm of dental and craniofacial radiology, this project aims to assist healthcare professionals with a reliable and automated tool for condyle detection and segmentation—paving the way for smarter diagnostics and better patient outcomes.',
                    ]}
                    loop={false}
                    cursor
                    cursorStyle="_"
                    typeSpeed={50}
                    deleteSpeed={0}
                    delaySpeed={500}
                  />
                )}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
