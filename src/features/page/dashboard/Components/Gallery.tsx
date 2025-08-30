import React from 'react';
import { motion } from 'framer-motion';

const Gallery: React.FC = () => {
  const videos = [
    {
      id: 1,
      url: 'https://www.youtube.com/embed/64ojWgAzl94?si=p_O8AmmEuhhXEAIk',
      title: 'Video Pre-wedding 1',
      description: 'Tidak ada yang kebetulan di dunia ini. Semua sudah tersusun rapih oleh Sang Maha Kuasa. Begitupun kita yang sama sama memiliki luka di masa lalu akhirnya menemukan cinta baru di pertengahan 2023 yang akhirnya menyembuhkan dan saling melengkapi',
      reverse: false // video kiri, text kanan
    },
    {
      id: 2,
      url: 'https://www.youtube.com/embed/4DGkMyQYyac?si=ODpvVlW1WOCEERFa',
      title: 'Video Pre-wedding 2',
      description: 'Benar kata pepatah, bukan karena bertemu lalu berjodoh, tapi karena berjodohlah kami dipertemukan. Maka kami memutuskan mulai membawa hubungan ini ke jenjang yang lebih serius pada Akhir 2026',
      reverse: true // video kanan, text kiri
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="gallery" className="py-16 sm:py-20 lg:py-24 xl:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="font-script text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-800 mb-4 sm:mb-6 lg:mb-8"
          >
            Our Videos
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Momen-momen indah perjalanan cinta kami
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="flex flex-col gap-12 sm:gap-16 lg:gap-20 xl:gap-24"
        >
          {videos.map((video) => (
            <motion.div
              key={video.id}
              variants={itemVariants}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                video.reverse ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Video */}
              <div className="w-full lg:w-1/2 aspect-video">
                <iframe
                  className="w-full h-full rounded-2xl shadow-2xl"
                  src={video.url}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Deskripsi */}
              <div className="w-full lg:w-1/2 text-gray-700 px-4 sm:px-6 lg:px-8">
                <h3 className="font-script text-2xl sm:text-3xl lg:text-4xl text-gray-800 mb-4 sm:mb-6">
                  {video.title}
                </h3>
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed">{video.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
