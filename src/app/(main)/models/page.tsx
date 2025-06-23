import React from 'react';
import Image from 'next/image';

const ModelsPage = () => {
  return (
    <div className="w-full min-h-screen px-4 sm:px-8 py-6 text-black dark:text-white">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
          {/* Gambar untuk light mode */}
          <Image
            src="/models-blue.png"
            alt="Models Icon Light"
            width={32}
            height={32}
            className="block dark:hidden"
          />
          {/* Gambar untuk dark mode */}
          <Image
            src="/models-white.png"
            alt="Models Icon Dark"
            width={32}
            height={32}
            className="hidden dark:block"
          />
          About Models
        </h1>

        {/* Card Konten */}
        <div className="mt-6 p-6 sm:p-10 rounded-lg border-2 transition-colors border-sky-400 dark:border-[#2AB7C6] bg-[#F4F9FF] dark:bg-[#161B22]">
          <div className="space-y-4 text-sm sm:text-base leading-relaxed">
            <p>
              This project uses five superior models for instance segmentation in MRI images of the temporomandibular joint (TMJ), specifically the condyle area:
            </p>

            <ul className="list-disc ps-5 space-y-1">
              <li>Mask R-CNN (baseline)</li>
              <li>Cascade Mask R-CNN</li>
              <li>Hybrid Task Cascade (HTC)</li>
              <li>Mask2Former</li>
              <li>SOLOv2</li>
            </ul>

            <p>
              These models were selected due to their high performance in segmenting small and complex objects in medical images. To improve the accuracy and stability of predictions, all models are combined into one system using the Ensemble Learning approach with the Majority Voting technique, where each pixel is only accepted as a segmentation result if it is agreed by at least three out of five models.
            </p>

            <p>
              The experimental design was conducted by streaming MRI images to five segmentation models in parallel. Each model produces a mask map, which is then combined through majority voting to produce one final segmentation result. The final stage is morphological post-processing (one iteration of 3×3 dilation) to smooth object edges and fill small gaps between segments. This approach strengthens the consistency of predictions, reduces single-model errors, and improves segmentation robustness to noise.
            </p>

            {/* Gambar SVG */}
            <div className="flex justify-center mt-6">
              <img
                src="/Model.drawio.svg"
                alt="Model Diagram"
                className="w-full max-w-3xl h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelsPage;
