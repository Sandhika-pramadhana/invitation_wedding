import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer
      className="bg-gray-900 text-white py-12 sm:py-16 lg:py-20 bg-cover bg-center relative"
      style={{ backgroundImage: "url('/footer.png')" }}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-script text-3xl sm:text-4xl lg:text-5xl text-rose-400 mb-4 sm:mb-6"
        >
          Terima Kasih
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed"
        >
          Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gray-300 mb-2 sm:mb-3 text-sm sm:text-base"
        >
          Kami yang berbahagia:
        </motion.p>
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-script text-2xl sm:text-3xl lg:text-4xl text-white mb-2 sm:mb-3"
        >
          Dimas & Amel
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gray-400 text-sm sm:text-base"
        >
          beserta keluarga
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
