import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EventDetails: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      id="events"
      className="relative bg-cover bg-center py-16 sm:py-20 lg:py-24 xl:py-32"
      style={{ backgroundImage: "url('/event.jpg')" }}
    >
      {/* Overlay tipis biar teks kebaca */}
      <div className="absolute inset-0 bg-white/70" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Judul */}
        <motion.h2
          className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-rose-700 mb-8 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Wedding Ceremonial
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 max-w-5xl mx-auto text-rose-700">
          {/* Akad Nikah */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg"
          >
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-6 font-playfair">AKAD NIKAH</h3>
            <hr className="border-rose-300 w-32 sm:w-40 mx-auto mb-4 sm:mb-6" />
            <p className="mb-2 sm:mb-3 text-sm sm:text-base lg:text-lg font-medium">Ahad, 07 September 2025</p>
            <p className="mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg">08.00 WIB - Selesai</p>
            <p className="font-semibold mb-2 text-base sm:text-lg lg:text-xl">GRAHA POS INDONESIA</p>
            <p className="text-xs sm:text-sm lg:text-base mb-6 sm:mb-8 text-gray-600">Jl. Banda No. 30, Citarum, Kota Bandung</p>
            <a
              href="https://maps.app.goo.gl/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-rose-400 text-rose-500 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm lg:text-base hover:bg-rose-500 hover:text-white transition-all duration-300 rounded-lg font-medium"
            >
              📍 OPEN MAPS
            </a>
          </motion.div>

          {/* Resepsi */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg"
          >
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-6 font-playfair">RESEPSI</h3>
            <hr className="border-rose-300 w-32 sm:w-40 mx-auto mb-4 sm:mb-6" />
            <p className="mb-2 sm:mb-3 text-sm sm:text-base lg:text-lg font-medium">Ahad, 07 September 2025</p>
            <p className="mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg">11.00 - 14.00 WIB</p>
            <p className="font-semibold mb-2 text-base sm:text-lg lg:text-xl">GRAHA POS INDONESIA</p>
            <p className="text-xs sm:text-sm lg:text-base mb-6 sm:mb-8 text-gray-600">Jl. Banda No. 30, Citarum, Kota Bandung</p>
            <a
              href="https://maps.app.goo.gl/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-rose-400 text-rose-500 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm lg:text-base hover:bg-rose-500 hover:text-white transition-all duration-300 rounded-lg font-medium"
            >
              📍 OPEN MAPS
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
