import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from './HeroSection';
import CoupleSection from './CoupleSection';
import EventDetails from './EventDetails';
import Gallery from './Gallery';
import RSVPForm from './RSVPForm';
import Footer from './Footer';
import WeddingCountdown from './WeddingCoutdown';
import AudioPlayer from './Audio';

const MainContent: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen"
    >
      <AudioPlayer/>
      <HeroSection />
      <CoupleSection />
      <WeddingCountdown/>
      <EventDetails />
      <Gallery />
      <RSVPForm />
      <Footer />
    </motion.div>
  );
};

export default MainContent;