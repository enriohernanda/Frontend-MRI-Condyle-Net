import About from '@/components/landingPage/About';
import Acknowledgment from '@/components/landingPage/Acknowledgement';
import Segmentation from '@/components/landingPage/features/Segmentation';
import Footer from '@/components/landingPage/Footer';
import Hero from '@/components/landingPage/Hero';
import Model from '@/components/landingPage/Model';
import Navbar from '@/components/landingPage/Navbar';
import OurTeam from '@/components/landingPage/OurTeam';

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#161B22] lg:pt-20">
      <Navbar />
      <div className="flex flex-col gap-10 md:gap-20 w-full">
        <Hero />
        <div id="About" className="w-full">
          <About />
        </div>
        <div id="AI-Model" className="w-full">
          <Model />
        </div>
        <div id="Features" className="w-full">
          <Segmentation />
        </div>
        <div id="Acknowledgment" className="w-full">
          <Acknowledgment />
        </div>
        <div id="Our-Team">
          <OurTeam />
        </div>
      </div>
      <Footer />
    </main>
  );
}
