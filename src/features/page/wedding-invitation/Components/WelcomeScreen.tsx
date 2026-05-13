import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Mail } from 'lucide-react';
import { Cinzel, Great_Vibes } from 'next/font/google';

// Import fonts
const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
});

interface WelcomeScreenProps {
  onOpenInvitation: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onOpenInvitation }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Falling Leaves Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/30 text-2xl"
            initial={{ y: -50, x: Math.random() * 1200, rotate: 0 }}
            animate={{
              y: '110vh',
              x: Math.random() * 1200,
              rotate: 360,
            }}
            transition={{
              duration: 8 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
          >
            🍂
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="text-center text-white z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 sm:mb-12"
        >
          {/* Nama Pasangan */}
          <h1
            className={`${greatVibes.className} text-5xl sm:text-7xl md:text-8xl lg:text-9xl mb-6 sm:mb-8 drop-shadow-md`}
          >
            Dimas & Amel
          </h1>

          {/* Subtitle */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="h-px bg-white/40 flex-1"></div>
            <div
              className={`${cinzel.className} text-xs sm:text-sm uppercase tracking-widest text-white/60 px-2`}
            >
              Wedding Invitation
            </div>
            <div className="h-px bg-white/40 flex-1"></div>
          </div>

          {/* Deskripsi */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white/90 mb-4 sm:mb-6 leading-relaxed">
            Mengundang Anda dalam Acara Pernikahan Kami
          </p>

          {/* Tanggal */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-lg sm:text-xl md:text-2xl text-white/90">
            <Calendar size={24} className="sm:w-6 sm:h-6" />
            <span className={`${cinzel.className} font-medium`}>07 September 2025</span>
          </div>
        </motion.div>

        {/* Tombol Undangan */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 sm:mt-12"
        >
          <button
            onClick={onOpenInvitation}
            className="relative overflow-hidden rounded-full shadow-2xl border-2 border-white/60
                       px-8 sm:px-12 lg:px-16 py-3 sm:py-4 lg:py-5 
                       text-base sm:text-lg lg:text-xl text-white font-medium
                       transition-all duration-300
                       bg-transparent
                       hover:bg-rose-600 hover:border-rose-600 hover:shadow-rose-500/25
                       active:bg-rose-700 active:border-rose-700
                       transform hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2 sm:gap-3">
              <Mail size={20} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              Buka Undangan
            </span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;
