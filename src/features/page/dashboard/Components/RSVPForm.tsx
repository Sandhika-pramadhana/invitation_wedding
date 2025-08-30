import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, User, Users, Phone, MessageCircle } from 'lucide-react';

const RSVPForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nama: '',
    grup: '',
    whatsapp: '',
    komentar: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        nama: '',
        grup: '',
        whatsapp: '',
        komentar: ''
      });
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <section id="rsvp" className="section-padding" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="font-script text-5xl md:text-6xl text-gray-800 mb-4"
          >
            Best wishes for 
            Dimas & Amel
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
          </motion.div>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            style={{ backgroundColor: '#fffdf8' }} // warna form elegan
          >
            <div className="p-8">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="text-green-500 mx-auto mb-4" size={64} />
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                      Terima Kasih!
                    </h3>
                    <p className="text-gray-600">
                      Ucapan Anda telah berhasil dikirim.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        <User className="inline mr-2" size={18} />
                        Nama
                      </label>
                      <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleInputChange}
                        placeholder="Nama lengkap Anda"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        <Users className="inline mr-2" size={18} />
                        Grup
                      </label>
                      <input
                        type="text"
                        name="grup"
                        value={formData.grup}
                        onChange={handleInputChange}
                        placeholder="Keluarga/Teman/Kolega"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        <Phone className="inline mr-2" size={18} />
                        No WhatsApp
                      </label>
                      <div className="flex">
                        <select className="px-3 py-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 text-gray-700">
                          <option value="+62">+62</option>
                        </select>
                        <input
                          type="tel"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleInputChange}
                          placeholder="812345678"
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        <MessageCircle className="inline mr-2" size={18} />
                        Ucapan atau Doa
                      </label>
                      <textarea
                        name="komentar"
                        value={formData.komentar}
                        onChange={handleInputChange}
                        placeholder="Berikan ucapan atau doa untuk Dimas & Amel..."
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all duration-300 resize-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-gray-700 to-gold-400 text-white font-semibold py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      ) : (
                        <Send size={20} />
                      )}
                      {isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Recent Messages */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 bg-white rounded-2xl shadow-lg p-8"
          >
            <h3 className="font-script text-3xl text-gray-800 mb-6 text-center">
              Ucapan & Doa
            </h3>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {[
                {
                  name: 'Keluarga dekat',
                  message: 'Barakallahu Happy wedding Dimas & Amel Semoga sakinah mawaddah warohmah',
                  time: '2 jam yang lalu'
                },
                {
                  name: 'Keluarga Besar',
                  message: 'Selamat menempuh hidup baru, semoga menjadi keluarga yang bahagia dan berkah',
                  time: '5 jam yang lalu'
                },
                {
                  name: 'Teman Kuliah',
                  message: 'Akhirnya menikah juga! Semoga langgeng sampai kakek nenek ya',
                  time: '1 hari yang lalu'
                }
              ].map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 p-4 rounded-lg border-l-4 border-gold-400"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gold-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {msg.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-800">{msg.name}</h4>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                      </div>
                      <p className="text-gray-600">{msg.message}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RSVPForm;
