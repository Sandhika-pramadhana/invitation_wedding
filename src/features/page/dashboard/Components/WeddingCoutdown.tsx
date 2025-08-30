import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CountdownSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // animasi hanya sekali saat masuk view

  useEffect(() => {
    const weddingDate = new Date('2025-09-06T10:00:00+07:00').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={ref}
      className="relative text-white py-16 sm:py-20 lg:py-24 xl:py-32 min-h-screen flex items-center"
      style={{ 
        backgroundImage: `url('/background.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center center", // Lebih spesifik
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "scroll", // Ganti dari fixed ke scroll untuk mobile
      }}
    >
      {/* Overlay dengan opacity yang lebih konsisten */}
      <div className="absolute inset-0 bg-black/50" />
      
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        {/* Judul muncul saat scroll ke sini */}
        <motion.h2
          className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-8 sm:mb-12 lg:mb-16 tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          WEDDING COUNTDOWN
        </motion.h2>

        {/* Countdown */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 mb-8 sm:mb-12 lg:mb-16 w-full max-w-4xl">
          {Object.entries(timeLeft).map(([unit, value], index) => (
            <motion.div
              key={unit}
              className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
            >
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-cinzel leading-none">
                {value}
              </span>
              <span className="mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg font-medium tracking-wide">
                {unit === 'days'
                  ? 'Hari'
                  : unit === 'hours'
                  ? 'Jam'
                  : unit === 'minutes'
                  ? 'Menit'
                  : 'Detik'}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Tombol */}
        <motion.button
          className="border-2 border-white px-6 sm:px-8 lg:px-12 py-3 sm:py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300 text-sm sm:text-base lg:text-lg font-medium tracking-wide transform hover:scale-105 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          SAVE THE DATE
        </motion.button>
      </div>
    </section>
  );
};

export default CountdownSection;