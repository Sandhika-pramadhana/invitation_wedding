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
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    const weddingDate = new Date('2026-09-06T10:00:00+07:00').getTime();
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

  const units = [
    { key: 'days', label: 'Hari', value: timeLeft.days },
    { key: 'hours', label: 'Jam', value: timeLeft.hours },
    { key: 'minutes', label: 'Menit', value: timeLeft.minutes },
    { key: 'seconds', label: 'Detik', value: timeLeft.seconds },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Tenor+Sans&family=Raleway:wght@200;300;400;500&display=swap');

        .countdown-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          background-image: url('/background.jpg');
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          background-attachment: scroll;
          color: #fff;
          padding: 5rem 1rem;
          overflow: hidden;
        }

        .countdown-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(10, 8, 6, 0.55) 0%,
            rgba(20, 16, 12, 0.72) 50%,
            rgba(10, 8, 6, 0.55) 100%
          );
        }

        /* Subtle vignette corners */
        .countdown-overlay::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%);
        }

        /* Thin decorative horizontal rules */
        .deco-line {
          display: flex;
          align-items: center;
          gap: 1rem;
          width: 100%;
          max-width: 520px;
          margin: 0 auto;
        }

        .deco-line::before,
        .deco-line::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.45), transparent);
        }

        .deco-diamond {
          width: 5px;
          height: 5px;
          background: rgba(255,255,255,0.7);
          transform: rotate(45deg);
          flex-shrink: 0;
        }

        /* Title */
        .countdown-eyebrow {
          font-family: 'Raleway', sans-serif;
          font-weight: 300;
          font-size: clamp(0.6rem, 1.5vw, 0.72rem);
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65);
          margin-bottom: 0.75rem;
        }

        .countdown-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-style: italic;
          font-size: clamp(2.6rem, 7vw, 5.5rem);
          line-height: 1;
          letter-spacing: 0.03em;
          color: #fff;
          margin: 0;
          text-shadow: 0 4px 32px rgba(0,0,0,0.35);
        }

        /* Grid — no boxes, just open layout with separators */
        .countdown-grid {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          width: 100%;
          max-width: 720px;
          flex-wrap: nowrap;
        }

        @media (max-width: 560px) {
          .countdown-grid {
            flex-wrap: wrap;
            gap: 2rem 0;
          }
          .countdown-sep {
            display: none;
          }
        }

        /* Each item — no background, no border */
        .countdown-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
          padding: 0 clamp(1rem, 3vw, 2.5rem);
        }

        /* Vertical separator between items */
        .countdown-sep {
          width: 1px;
          height: clamp(3rem, 8vw, 5rem);
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.35), transparent);
          flex-shrink: 0;
        }

        /* Number */
        .countdown-number {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(3.5rem, 9vw, 6.5rem);
          line-height: 1;
          letter-spacing: -0.01em;
          color: #fff;
          text-shadow: 0 2px 32px rgba(0,0,0,0.3);
        }

        /* Thin divider under number */
        .card-divider {
          width: 20px;
          height: 1px;
          background: rgba(255,255,255,0.3);
          margin: 0.55rem auto;
        }

        /* Label */
        .countdown-label {
          font-family: 'Tenor Sans', sans-serif;
          font-size: clamp(0.58rem, 1.2vw, 0.68rem);
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
        }

        /* Button */
        .save-btn {
          position: relative;
          font-family: 'Tenor Sans', sans-serif;
          font-size: clamp(0.62rem, 1.3vw, 0.72rem);
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #fff;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.45);
          padding: 0.9rem 2.8rem;
          cursor: pointer;
          transition: border-color 0.35s ease, background 0.35s ease, color 0.35s ease;
          border-radius: 0;
        }

        .save-btn::before,
        .save-btn::after {
          content: '';
          position: absolute;
          width: 8px;
          height: 8px;
          border-color: rgba(255,255,255,0.7);
          border-style: solid;
          transition: border-color 0.35s ease;
        }
        .save-btn::before {
          top: -1px; left: -1px;
          border-width: 1px 0 0 1px;
        }
        .save-btn::after {
          bottom: -1px; right: -1px;
          border-width: 0 1px 1px 0;
        }

        .save-btn:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.75);
        }

        .save-btn:hover::before,
        .save-btn:hover::after {
          border-color: #fff;
        }
      `}</style>

      <section ref={ref} className="countdown-section">
        <div className="countdown-overlay" />

        <div
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            width: '100%',
            gap: 'clamp(1.5rem, 4vw, 3rem)',
          }}
        >
          {/* Header */}
          <motion.div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
            initial={{ opacity: 0, y: -24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="countdown-eyebrow">Menghitung waktu menuju hari istimewa</p>
            <h2 className="countdown-title">Wedding Countdown</h2>
          </motion.div>

          {/* Decorative line */}
          <motion.div
            className="deco-line"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
          >
            <div className="deco-diamond" />
          </motion.div>

          {/* Countdown grid */}
          <div className="countdown-grid">
            {units.map(({ key, label, value }, index) => (
              <React.Fragment key={key}>
                {index > 0 && <div className="countdown-sep" />}
                <motion.div
                  className="countdown-card"
                  initial={{ opacity: 0, y: 28 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.15, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="countdown-number">{String(value).padStart(2, '0')}</span>
                  <div className="card-divider" />
                  <span className="countdown-label">{label}</span>
                </motion.div>
              </React.Fragment>
            ))}
          </div>

          {/* Decorative line */}
          <motion.div
            className="deco-line"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 1.2, ease: 'easeOut' }}
          >
            <div className="deco-diamond" />
          </motion.div>

          {/* CTA */}
          <motion.button
            className="save-btn"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Save the Date
          </motion.button>
        </div>
      </section>
    </>
  );
};

export default CountdownSection;