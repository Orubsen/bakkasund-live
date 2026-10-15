import React from 'react';
import { X, Heart, Flame, ExternalLink, Music, Sparkles, CheckCircle2, Play } from 'lucide-react';

export default function ArtistModal({ artist, isOpen, onClose, onVote, hasVoted }) {
  if (!isOpen || !artist) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#0D1B2A] border-2 border-[#F79D1B]/50 rounded-3xl overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.9)] my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Artist Image Header */}
        <div className="relative h-64 sm:h-72 w-full bg-black/50 overflow-hidden">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-full h-full object-cover object-center filter brightness-[0.9] contrast-[1.05]"
            onError={(e) => {
              e.target.src = '/assets/kassholmen-seagull.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/40 to-transparent" />

          {/* Badges on image */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 rounded-full bg-[#F79D1B] text-[#0D1B2A] text-xs font-bold uppercase tracking-wider shadow-md">
              {artist.tag || 'Artistforslag'}
            </span>
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#6EC1C6] text-xs font-bold uppercase tracking-wider border border-white/10">
              {artist.status}
            </span>
          </div>

          <div className="absolute bottom-4 left-6 right-6">
            <h3 className="font-['Oswald'] text-3xl sm:text-4xl font-bold uppercase tracking-wide text-white drop-shadow-md">
              {artist.name}
            </h3>
            <span className="text-xs uppercase font-bold tracking-widest text-[#F79D1B]">
              {artist.genre}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 text-left">
          {/* Bio / Facts */}
          <div>
            <h4 className="font-['Oswald'] text-sm font-bold uppercase tracking-wider text-[#6EC1C6] mb-2">
              Om artisten & hvorfor de passer på Kassholmen
            </h4>
            <p className="text-xs sm:text-sm text-[#F3E9D2]/85 leading-relaxed font-light">
              {artist.facts || artist.desc}
            </p>
          </div>

          {/* Structured Details if available (e.g. Leffe) */}
          {(artist.background || artist.musicStyle) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {artist.background && (
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="font-bold text-[#F79D1B] uppercase tracking-wider text-[10px] block mb-1">
                    Bakgrunn
                  </span>
                  <p className="text-white/80 font-light">{artist.background}</p>
                </div>
              )}
              {artist.musicStyle && (
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="font-bold text-[#6EC1C6] uppercase tracking-wider text-[10px] block mb-1">
                    Musikkstil & uttrykk
                  </span>
                  <p className="text-white/80 font-light">{artist.musicStyle}</p>
                </div>
              )}
            </div>
          )}

          {/* Mental Health Engagement Highlight */}
          {artist.mentalHealth && (
            <div className="p-4 rounded-2xl bg-[#1E6070]/30 border border-[#6EC1C6]/40 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#F79D1B] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] uppercase font-bold text-[#F79D1B] block mb-1">
                  Psykisk helse-engasjement & åpenhet
                </span>
                <p className="text-xs text-[#F3E9D2]/90 leading-relaxed font-light">
                  {artist.mentalHealth}
                </p>
              </div>
            </div>
          )}

          {/* Known Hits */}
          {artist.hits && (
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[11px] uppercase font-bold text-[#F79D1B] block mb-2">
                Kjente låter & utgivelser
              </span>
              <div className="flex flex-wrap gap-2">
                {artist.hits.map((hit, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 border border-white/10 text-xs text-white"
                  >
                    <Music className="w-3 h-3 text-[#6EC1C6]" />
                    <span>{hit}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Music Platforms */}
          <div>
            <span className="text-[11px] uppercase font-bold text-[#6EC1C6] block mb-2.5">
              Hør musikken & følg artisten
            </span>
            {artist.platforms ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-semibold">
                {artist.platforms.map((plat, idx) => (
                  <a
                    key={idx}
                    href={plat.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl border transition-all ${plat.color}`}
                  >
                    <span>{plat.name}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-semibold">
                <a
                  href={artist.spotifyUrl || `https://open.spotify.com/search/${encodeURIComponent(artist.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#1DB954]/20 hover:bg-[#1DB954]/30 border border-[#1DB954]/40 text-[#1DB954] transition-all"
                >
                  <span>Spotify</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={artist.appleUrl || `https://music.apple.com/no/search?term=${encodeURIComponent(artist.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#FA243C]/20 hover:bg-[#FA243C]/30 border border-[#FA243C]/40 text-[#FA586A] transition-all"
                >
                  <span>Apple Music</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={artist.youtubeUrl || `https://www.youtube.com/results?search_query=${encodeURIComponent(artist.name + ' live')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#FF0000]/20 hover:bg-[#FF0000]/30 border border-[#FF0000]/40 text-[#FF4E45] transition-all col-span-2 sm:col-span-1"
                >
                  <span>YouTube Live</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>

          {/* Media & Articles if present */}
          {artist.articles && (
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] uppercase font-bold text-white/50 block mb-2">
                Referanser & omtale
              </span>
              <div className="space-y-1.5">
                {artist.articles.map((art, idx) => (
                  <a
                    key={idx}
                    href={art.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-xs text-[#6EC1C6] hover:text-[#F79D1B] transition-colors group"
                  >
                    <span className="truncate underline decoration-white/20 group-hover:decoration-[#F79D1B]">{art.title}</span>
                    <ExternalLink className="w-3 h-3 shrink-0 ml-2 text-white/40 group-hover:text-[#F79D1B]" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Vote Footer */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#F79D1B]" />
              <div>
                <div className="font-['Oswald'] text-xl font-bold text-white leading-none">
                  {artist.votes} stemmer
                </div>
                <div className="text-[10px] text-[#F3E9D2]/60 uppercase">
                  Publikumsønske
                </div>
              </div>
            </div>

            <button
              onClick={() => onVote(artist.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                hasVoted
                  ? 'bg-[#F79D1B] text-[#0D1B2A] shadow-[0_0_20px_rgba(247,157,27,0.5)]'
                  : 'bg-gradient-to-r from-[#F79D1B] to-[#ffaa2b] text-[#0D1B2A] shadow-lg hover:scale-105'
              }`}
            >
              <Heart className={`w-4 h-4 ${hasVoted ? 'fill-[#0D1B2A]' : ''}`} />
              <span>{hasVoted ? 'Du har stemt!' : 'Stem på artisten'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
