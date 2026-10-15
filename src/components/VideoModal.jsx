import React, { useState, useRef } from 'react';
import { X, Play, Film, Compass, Video } from 'lucide-react';

export default function VideoModal({ isOpen, onClose }) {
  const [selectedVideo, setSelectedVideo] = useState(0);
  const videoRef = useRef(null);

  if (!isOpen) return null;

  const playlist = [
    {
      title: 'Bakkasund LIVE - promovideo - 10 sec',
      subtitle: 'Offisiell Teaser for Sommeren 2027',
      src: '/assets/promo-10s.mp4',
      icon: Film,
    },
    {
      title: 'Droneflyvning over Kassholmen',
      subtitle: 'Spektakulære kystbilder og holmer i Austevoll (Uten lyd)',
      src: '/assets/grok-drone-video.mp4',
      icon: Compass,
    },
  ];

  const current = playlist[selectedVideo] || playlist[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#0D1B2A] border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F79D1B] animate-pulse" />
            <div>
              <h3 className="font-['Oswald'] text-lg font-bold uppercase text-white tracking-wide">
                {current.title}
              </h3>
              <p className="text-xs text-[#6EC1C6] font-medium">
                {current.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative bg-black aspect-video w-full flex items-center justify-center">
          <video
            ref={videoRef}
            key={current.src}
            controls
            autoPlay
            muted
            defaultMuted
            playsInline
            className="w-full h-full object-contain"
          >
            <source src={current.src} type="video/mp4" />
            Nettleseren din støtter ikke videoavspilling.
          </video>
        </div>

        {/* Playlist Switcher */}
        <div className="p-4 sm:p-5 bg-[#0D1B2A]/90 border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {playlist.map((item, idx) => {
              const isSelected = selectedVideo === idx;
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedVideo(idx)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? 'bg-[#1E6070] border-[#F79D1B] text-white shadow-lg'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/70'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-[#F79D1B] text-[#0D1B2A]' : 'bg-white/10 text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold truncate text-white">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-[#F3E9D2]/60 truncate">
                      {item.subtitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
