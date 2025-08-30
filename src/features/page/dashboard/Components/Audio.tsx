import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Auto-play setelah sedikit delay (agar lebih kompatibel di browser)
      const playAudio = () => {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Auto-play gagal, butuh interaksi user
            setIsPlaying(false);
          });
      };

      const timer = setTimeout(playAudio, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isMuted) {
        audio.volume = 0.3; // atur volume normal
        setIsMuted(false);
        if (!isPlaying) {
          audio.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      } else {
        audio.volume = 0;
        setIsMuted(true);
      }
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      {/* Audio dari wedding.mp4 (hanya suara, video tidak ditampilkan) */}
      <audio ref={audioRef} loop preload="auto" className="hidden">
        <source src="wedding.mp4" type="audio/mp4" />
      </audio>

      {/* Tombol kontrol mute/unmute */}
      <button
        onClick={toggleMute}
        className="group bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-gray-600 group-hover:text-rose-500 transition-colors duration-200" />
        ) : (
          <Volume2 className="w-5 h-5 text-rose-500 group-hover:text-rose-600 transition-colors duration-200" />
        )}
      </button>
    </div>
  );
};

export default AudioPlayer;
