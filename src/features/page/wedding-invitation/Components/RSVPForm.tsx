import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Users, Phone, MessageCircle, Heart } from 'lucide-react';

interface Message {
  id: number;
  nama: string;
  grup: string;
  komentar: string;
  kehadiran: string;
  created_at: string;
}

const API_URL = '/api/rsvp';

const timeAgo = (dateStr: string) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'baru saja';
  if (m < 60) return `${m} menit lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} jam lalu`;
  return `${Math.floor(h / 24)} hari lalu`;
};

const RSVPForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nama: '',
    grup: '',
    whatsapp: '',
    komentar: '',
    kehadiran: 'Hadir'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetch(API_URL)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(json => {
        // ✅ FIX: data ada di json.data.items, bukan json.data
        const items = json?.data?.items ?? [];
        setMessages(Array.isArray(items) ? items : []);
      })
      .catch(err => console.error('Fetch RSVP error:', err));
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Gagal mengirim. Coba lagi.');

      const json = await res.json();
      const newMsg: Message = json.data;

      setMessages(prev => [newMsg, ...prev]);
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          nama: '',
          grup: '',
          whatsapp: '',
          komentar: '',
          kehadiran: 'Hadir'
        });
      }, 3000);

    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan.');
    } finally {
      setIsSubmitting(false);
    }
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
    <>
      <style>{`
        .rsvp-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #d6cfc4;
          border-radius: 6px;
          background: #fdfbf7;
          color: #3d3530;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s;
          font-family: inherit;
        }
        .rsvp-input:focus {
          border-color: #9c8170;
          box-shadow: 0 0 0 3px rgba(156, 129, 112, 0.12);
        }
        .rsvp-input::placeholder { color: #b5a99e; }
        .rsvp-label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #7a6b62;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        .rsvp-btn {
          width: 100%;
          background: #6b5549;
          color: #fdf8f3;
          border: none;
          padding: 0.95rem 1.5rem;
          border-radius: 6px;
          font-size: 0.82rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          transition: background 0.25s, transform 0.15s;
          font-family: inherit;
        }
        .rsvp-btn:hover:not(:disabled) { background: #5a4439; }
        .rsvp-btn:active:not(:disabled) { transform: scale(0.98); }
        .rsvp-btn:disabled { opacity: 0.55; cursor: not-allowed; }
        .msg-card {
          background: #fdfbf7;
          border: 1px solid #e8e0d5;
          border-left: 3px solid #9c8170;
          border-radius: 6px;
          padding: 1rem 1.1rem;
        }
        .msg-avatar {
          width: 36px;
          height: 36px;
          background: #9c8170;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 0.85rem;
          font-weight: 600;
          flex-shrink: 0;
        }
        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(253,248,243,0.4);
          border-top-color: #fdf8f3;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <section
        id="rsvp"
        className="section-padding"
        style={{ backgroundColor: '#f5f0eb', padding: '5rem 1rem' }}
      >
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>

          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <motion.p
              variants={itemVariants}
              style={{
                fontFamily: "'Tenor Sans', sans-serif",
                fontSize: '0.72rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: '#9c8170',
                marginBottom: '0.75rem'
              }}
            >
              Sampaikan ucapan terbaik Anda
            </motion.p>

            <motion.h2
              variants={itemVariants}
              className="font-script"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontStyle: 'italic',
                fontSize: 'clamp(2.2rem, 6vw, 3.8rem)',
                color: '#3d3530',
                lineHeight: 1.1,
                margin: 0
              }}
            >
              Best Wishes for
              <br />
              Dimas &amp; Amel
            </motion.h2>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              background: '#fffdf8',
              borderRadius: '10px',
              border: '1px solid #e4dbd0',
              overflow: 'hidden',
              marginBottom: '2rem'
            }}
          >
            <div style={{ padding: '2rem 2.5rem' }}>
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    style={{ textAlign: 'center', padding: '3rem 0' }}
                  >
                    <Heart size={48} color="#9c8170" style={{ margin: '0 auto 1rem' }} />
                    <h3 style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '1.8rem',
                      fontWeight: 400,
                      color: '#3d3530',
                      margin: '0 0 0.5rem'
                    }}>
                      Terima Kasih!
                    </h3>
                    <p style={{ color: '#9c8170', fontSize: '0.9rem' }}>
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
                    style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
                  >
                    <div>
                      <label className="rsvp-label">
                        <User size={14} />
                        Nama
                      </label>
                      <input
                        className="rsvp-input"
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleInputChange}
                        placeholder="Nama lengkap Anda"
                        required
                      />
                    </div>

                    <div>
                      <label className="rsvp-label">
                        <Users size={14} />
                        Grup
                      </label>
                      <input
                        className="rsvp-input"
                        type="text"
                        name="grup"
                        value={formData.grup}
                        onChange={handleInputChange}
                        placeholder="Keluarga / Teman / Kolega"
                      />
                    </div>

                    <div>
                      <label className="rsvp-label">Kehadiran</label>
                      <select
                        className="rsvp-input"
                        name="kehadiran"
                        value={formData.kehadiran}
                        onChange={handleInputChange}
                      >
                        <option value="Hadir">Hadir</option>
                        <option value="Tidak Hadir">Tidak Hadir</option>
                      </select>
                    </div>

                    <div>
                      <label className="rsvp-label">
                        <Phone size={14} />
                        No WhatsApp
                      </label>
                      <div style={{ display: 'flex' }}>
                        <select style={{
                          padding: '0.75rem 0.75rem',
                          border: '1px solid #d6cfc4',
                          borderRight: 'none',
                          borderRadius: '6px 0 0 6px',
                          background: '#f5f0eb',
                          color: '#7a6b62',
                          fontSize: '0.9rem',
                          outline: 'none'
                        }}>
                          <option value="+62">+62</option>
                        </select>
                        <input
                          className="rsvp-input"
                          type="tel"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleInputChange}
                          placeholder="812345678"
                          style={{ borderRadius: '0 6px 6px 0' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="rsvp-label">
                        <MessageCircle size={14} />
                        Ucapan atau Doa
                      </label>
                      <textarea
                        className="rsvp-input"
                        name="komentar"
                        value={formData.komentar}
                        onChange={handleInputChange}
                        placeholder="Berikan ucapan atau doa untuk Dimas & Amel..."
                        rows={4}
                        style={{ resize: 'none' }}
                      />
                    </div>

                    {error && (
                      <p style={{ color: '#b85c5c', fontSize: '0.85rem', margin: 0 }}>
                        {error}
                      </p>
                    )}

                    <button type="submit" className="rsvp-btn" disabled={isSubmitting}>
                      {isSubmitting ? <div className="spinner" /> : <Send size={16} />}
                      {isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Messages */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              background: '#fffdf8',
              borderRadius: '10px',
              border: '1px solid #e4dbd0',
              padding: '2rem 2.5rem'
            }}
          >
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontStyle: 'italic',
              fontSize: '1.8rem',
              color: '#3d3530',
              textAlign: 'center',
              marginBottom: '1.5rem'
            }}>
              Ucapan &amp; Doa
            </h3>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
              maxHeight: '380px',
              overflowY: 'auto'
            }}>
              {messages.length === 0 ? (
                <p style={{
                  textAlign: 'center',
                  color: '#b5a99e',
                  fontSize: '0.9rem',
                  padding: '1.5rem 0'
                }}>
                  Belum ada ucapan. Jadilah yang pertama!
                </p>
              ) : (
                messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    className="msg-card"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06 }}
                  >
                    <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                      <div className="msg-avatar">
                        {msg.nama.charAt(0).toUpperCase()}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          gap: '0.6rem',
                          marginBottom: '0.3rem'
                        }}>
                          <span style={{ fontWeight: 600, color: '#3d3530', fontSize: '0.9rem' }}>
                            {msg.nama}
                          </span>
                          {msg.grup && (
                            <span style={{ fontSize: '0.75rem', color: '#9c8170' }}>
                              {msg.grup}
                            </span>
                          )}
                          <span style={{
                            fontSize: '0.72rem',
                            color: msg.kehadiran === 'Hadir' ? '#4f8a5b' : '#b85c5c'
                          }}>
                            {msg.kehadiran}
                          </span>
                          <span style={{ fontSize: '0.72rem', color: '#b5a99e', marginLeft: 'auto' }}>
                            {timeAgo(msg.created_at)}
                          </span>
                        </div>
                        <p style={{ color: '#5c4f47', fontSize: '0.88rem', margin: 0, lineHeight: 1.55 }}>
                          {msg.komentar}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default RSVPForm;