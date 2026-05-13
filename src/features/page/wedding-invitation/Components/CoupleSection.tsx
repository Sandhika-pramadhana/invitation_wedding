import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { Great_Vibes } from 'next/font/google';
import Image from 'next/image';

// Import font Great Vibes
const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
});

const CoupleSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <section
      id="couple"
      className="py-16 sm:py-20 lg:py-24 xl:py-32 relative text-center text-gray-800"
      style={{
        backgroundImage: `url('/batik.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/80"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center"
        >
          {/* Judul The Bride pakai Great Vibes */}
          <motion.h2
            variants={itemVariants}
            className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gray-800 mb-6 sm:mb-8 lg:mb-12`}
          >
            The Bride
          </motion.h2>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16 lg:mb-20 text-gray-400 text-xl sm:text-2xl"
          >
            <div className="h-px bg-gray-400 flex-1 max-w-24 sm:max-w-32 lg:max-w-40"></div>
            <span>|</span>
            <div className="h-px bg-gray-400 flex-1 max-w-24 sm:max-w-32 lg:max-w-40"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 xl:gap-24 items-center max-w-6xl mx-auto">
            {/* Bride */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="relative mb-6 sm:mb-8 lg:mb-10 group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 mx-auto rounded-full overflow-hidden shadow-2xl"
                >
                  <Image
                    src="/mel.png"
                    alt="Amel"
                    width={384}
                    height={384}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </motion.div>
              </div>
              {/* Nama Amel pakai Great Vibes */}
              <h3 className={`${greatVibes.className} text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-rose-500 mb-4 sm:mb-6`}>
                Amel Birohmatika
              </h3>
              <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base lg:text-lg">
                Putri dari Bapak Kurnia Food & Ibu Siti Nurhaliza
              </p>
              <p className="text-gray-500 mb-6 sm:mb-8 max-w-sm lg:max-w-md mx-auto text-sm sm:text-base italic leading-relaxed">
                &quot;Cinta sejati adalah ketika dua hati bertemu dan menjadi satu dalam kebahagiaan dan kesedihan&quot;
              </p>
              <div className="flex justify-center gap-3 sm:gap-4">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-rose-500 rounded-full flex items-center justify-center text-white hover:bg-rose-600 transition-colors shadow-lg"
                >
                  <Instagram size={20} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </motion.a>
              </div>
            </motion.div>

            {/* Groom */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="relative mb-6 sm:mb-8 lg:mb-10 group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 mx-auto rounded-full overflow-hidden shadow-2xl"
                >
                  <Image
                    src="/dim.jpeg"
                    alt="Dimas"
                    width={384}
                    height={384}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </motion.div>
              </div>
              {/* Nama Dimas pakai Great Vibes */}
              <h3 className={`${greatVibes.className} text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-yellow-600 mb-4 sm:mb-6`}>
                Dimas Sinatrya
              </h3>
              <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base lg:text-lg">
                Putra dari Bapak Aris Yusanto & Ibu Lilis Triana
              </p>
              <p className="text-gray-500 mb-6 sm:mb-8 max-w-sm lg:max-w-md mx-auto text-sm sm:text-base italic leading-relaxed">
                &quot;Cinta yang tulus adalah ketika kita rela memberikan yang terbaik untuk orang yang kita sayangi&quot;
              </p>
              <div className="flex justify-center gap-3 sm:gap-4">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-rose-500 rounded-full flex items-center justify-center text-white hover:bg-rose-600 transition-colors shadow-lg"
                >
                  <Instagram size={20} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoupleSection;