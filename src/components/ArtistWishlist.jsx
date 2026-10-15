import React, { useState, useEffect } from 'react';
import { ThumbsUp, Heart, Plus, Sparkles, Music, Star, Flame, CheckCircle2, Search, Info, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import ArtistModal from './ArtistModal';

export const ARTISTS_DATA = [
  {
    id: 'vamp',
    name: 'Vamp',
    genre: 'Kystmusikk / Viserock',
    category: 'Vestland & Kyst',
    desc: 'Kystens desiderte konger. «Tir n’a Noir» og rå vestlandsstemning mens bølgene slår mot svabergene.',
    facts: 'Vamp fra Haugesund er selve lyden av Vestlandet og Nordsjøen. Med poetiske tekster av Kolbein Falkeid og tidløse melodier av Øyvind Staveland, har de trollbundet Norge i over 30 år. Konserten deres på Kassholmen vil bli et historisk øyeblikk.',
    hits: ['Tir n’a Noir', 'Liten Fuggel', 'Månemannen', 'Hallo - God morgen'],
    votes: 382,
    status: 'I dialog',
    tag: 'Vestlandskonge',
    image: '/assets/artister/vamp.jpg',
  },
  {
    id: 'stavangerkameratene',
    name: 'Stavangerkameratene',
    genre: 'Allsang & Fest',
    category: 'Folkefest & Allsang',
    desc: 'Vestlandets største allsangmaskin! «Bare så du vett det» og elektrisk stemning på plenene.',
    facts: 'Kjartan Salvesen, Tommy Fredvang, Glenn Lyse og Ole Alexander Mæland har skapt et av landets mest elskede livefenomener. Når de drar i gang allsangen, er det umulig å stå stille.',
    hits: ['Bare så du vett det', 'Vekk meg opp', 'Vil du konfirmere deg', 'Nesten'],
    votes: 341,
    status: 'Ønskeliste',
    tag: 'Folkefest',
    image: '/assets/artister/stavangerkameratene.webp',
  },
  {
    id: 'postgirobygget',
    name: 'Postgirobygget',
    genre: 'Sommerrock & Allsang',
    category: 'Folkefest & Allsang',
    desc: 'Selve symbolet på norsk festivalsommer! Arne Hurlen og gjengen skaper ren magi i solnedgangen.',
    facts: 'Ingen norsk sommer uten Postgirobygget. Gjennom 25 år har de levert soundtracket til sol, sjø, venner og kystglede. «Idyll» og «En solskinnsdag» vil runge utover sundet.',
    hits: ['Idyll', 'En solskinnsdag', 'Bohemen leve', 'Sløv uten dop'],
    votes: 326,
    status: 'Ønskeliste',
    tag: 'Sommerfavoritt',
    image: '/assets/artister/postgirobygget.jpg',
  },
  {
    id: 'staysman',
    name: 'Staysman',
    genre: 'Party / Fullt trøkk',
    category: 'Party',
    desc: 'Når holmen skal koke og alle 600 gjester synger med for full hals!',
    facts: 'Stian «Staysman» Thorbjørnsen er Norges ukronede partykonge. Med uovertruffen spilleglede, pyro og energi river han ned ethvert festivaltelt. På Kassholmen garanterer Staysman topp stemning fra første sekund.',
    hits: ['En godt stekt pizza', 'Se så glad nissen er', 'Fredag', 'Trenger en øl'],
    votes: 310,
    status: 'Ønskeliste',
    tag: 'Koke-garanti',
    image: '/assets/artister/staysman.jpg',
  },
  {
    id: 'susanne-sundfor',
    name: 'Susanne Sundfør',
    genre: 'Kunstpop / Vise',
    category: 'Pop & Rock',
    desc: 'En av Norges mest hyllede stemmer. Mektig, gripende og magisk i havgapet.',
    facts: 'Flerfoldig Spellemann-vinner med en stemmeprakt og kunstnerisk dybde som høster panegyrisk applaus over hele verden. Tenk deg hennes sfæriske vokal mens solen dypper seg i Nordsjøen bak scenen.',
    hits: ['White Foxes', 'Delirious', 'Fade Away', 'alyosha'],
    votes: 295,
    status: 'Ønskeliste',
    tag: 'Ikonisk vokal',
    image: '/assets/artister/susanne-sundfor.jpg',
  },
  {
    id: 'dumdum-boys',
    name: 'DumDum Boys',
    genre: 'Norsk Rock',
    category: 'Pop & Rock',
    desc: 'Norsk rocks fremste adelskap! Rått, tidløst og med energi som ryster svabergene.',
    facts: 'Fra Blitz til storscener i hele Norge: Prepple Houmb og Kjartan Kristiansen har definert norsk rock i fire tiår med legendariske riff og uforglemmelige låter.',
    hits: ['Splitter pine', 'Englefjes', 'Metallic Hvit', 'Slave'],
    votes: 288,
    status: 'Ønskeliste',
    tag: 'Rockelegender',
    image: '/assets/artister/dumdum-boys.jpg',
  },
  {
    id: 'synne-vo',
    name: 'Synne Vo',
    genre: 'Norsk Pop',
    category: 'Pop & Rock',
    desc: 'En av landets mest ettertraktede pop-stemmer. Magisk stemning for alle generasjoner.',
    facts: 'Låtskriver og popkomet med røtter fra Gudbrandsdalen som har tatt Norge med storm. Hennes sjarmerende dialekt og fengende melodier er hyllet av både P3 og festivalgjester over hele landet.',
    hits: ['Heime', 'E du han', 'Lykke te', 'Ok'],
    votes: 275,
    status: 'Ønskeliste',
    tag: 'Topphit',
    image: '/assets/artister/synne-vo.jpg',
  },
  {
    id: 'dde',
    name: 'DDE',
    genre: 'Festrock & Allsang',
    category: 'Folkefest & Allsang',
    desc: 'Norges råeste live- og allsangband! «Vinsjan på kaia» midt på et kaianlegg i Bakkasund.',
    facts: 'Bjarne Brøndbo og D.D.E. har spilt for hundretusenvis av nordmenn i over 30 år. Konsertene deres er en eksplosjon av folkelighet, energi og allsang.',
    hits: ['Vinsjan på kaia', 'Rai-Rai', 'Det går likar no', 'E6'],
    votes: 268,
    status: 'Ønskeliste',
    tag: 'Allsangkonger',
    image: '/assets/artister/dde.jpg',
  },
  {
    id: 'chris-holsten',
    name: 'Chris Holsten',
    genre: 'Pop / Soul',
    category: 'Pop & Rock',
    desc: 'Spellemann-vinner med landets mest gripende stemme. Fyller store festivaler i hele Norden.',
    facts: 'Chris Holsten har tatt steget opp i den absolutte elitedivisjonen av norske artister. Med låter som har dominert hitlistene i årevis rører han publikum til tårer og jubel.',
    hits: ['Smilet i ditt eget speil', 'Bare når det regner', 'Slå hjerte, slå', 'Bak en fasade'],
    votes: 261,
    status: 'Ønskeliste',
    tag: 'Toppartist',
    image: '/assets/artister/chris-holsten.avif',
  },
  {
    id: 'dagny',
    name: 'Dagny',
    genre: 'Elektro-pop',
    category: 'Pop & Rock',
    desc: 'Tromsøs pop-dronning med vanvittig live-energi og en parade av internasjonale hits.',
    facts: 'Dagny Norvoll Sandvik er en av Norges største internasjonale musikkeksporter. Hennes konserter er et fyrverkeri av dansbar pop, smittende energi og rå vokal.',
    hits: ['Somebody', 'Love You Like That', 'Wearing Nothing', 'Heartbreak in the Making'],
    votes: 254,
    status: 'Ønskeliste',
    tag: 'Popdronning',
    image: '/assets/artister/dagny.jpg',
  },
  {
    id: 'odd-nordstoga',
    name: 'Odd Nordstoga',
    genre: 'Vise / Folkepop',
    category: 'Vestland & Kyst',
    desc: 'En av Norges mest folkekjære vise- og popartister. Varm, jordnær og ekte.',
    facts: 'Vinje-karen med trekkspill, gitar og en enestående evne til å fange det norske lynnet. Odd skaper lun hygge og fengslende musikk som treffer hjertet til både unge og eldre.',
    hits: ['Kveldssong for deg og meg', 'Bestevenn', 'Frøken Franzen', 'Ein song til'],
    votes: 242,
    status: 'Ønskeliste',
    tag: 'Folkekjær',
    image: '/assets/artister/odd-nordstoga.jpg',
  },
  {
    id: 'hagle',
    name: 'Hagle',
    genre: 'Country-rap / Bygdepop',
    category: 'Party',
    desc: 'Indre Østfolds stolthet som har tatt hele landet med storm! Ellevill stemning.',
    facts: 'Blanding av banjo, trekkspill og fengende beats: Hagle har over 150 millioner strømminger og skaper full fest uansett hvor de dukker opp.',
    hits: ['Født til å råne', 'Bøgda', 'Ærmen i kærmen', 'Kjerring i fra by’n'],
    votes: 236,
    status: 'Ønskeliste',
    tag: 'Partymagnet',
    image: '/assets/artister/hagle.jpg',
  },
  {
    id: 'astrid-s',
    name: 'Astrid S',
    genre: 'Pop',
    category: 'Pop & Rock',
    desc: 'Internasjonal popstjerne med milliarder av strømminger. Lekker og storslått konsertopplevelse.',
    facts: 'Astrid Smeplass har vunnet Årets Spellemann og turnert over hele verden. Musikken hennes kombinerer sårbarhet med uimotståelige pop-hooks.',
    hits: ['Hurts So Good', 'Think Before I Talk', 'It’s OK If You Forget Me', 'First Love'],
    votes: 228,
    status: 'Ønskeliste',
    tag: 'Verdensklasse',
    image: '/assets/artister/astrid-s.jpg',
  },
  {
    id: 'vassendgutane',
    name: 'Vassendgutane',
    genre: 'Festcountry',
    category: 'Folkefest & Allsang',
    desc: 'Festcountryens konger fra Ørsta! Garanti for allsang og fantastisk stemning.',
    facts: 'Original partycountry fra Sunnmøre: Vassendgutane har fylt festivaler i to tiår med humor, rå musikalsk dyktighet og allsanger alle kan.',
    hits: ['Ungkar med dobbelseng', 'Førde', 'Granada', 'Svigermor'],
    votes: 219,
    status: 'Ønskeliste',
    tag: 'Festcountry',
    image: '/assets/artister/vassendgutane.jpg',
  },
  {
    id: 'lukas-graham',
    name: 'Lukas Graham',
    genre: 'Internasjonal Pop / Soul',
    category: 'Pop & Rock',
    desc: 'Dansk verdensstjerne med milliarder av strømminger og Grammy-nominasjoner.',
    facts: 'Lukas Forchhammer og hans band har toppet globale hitlister med monsterhiten «7 Years». En vokalist av rang som skaper intimitet selv foran titusenvis av fans.',
    hits: ['7 Years', 'Mama Said', 'Love Someone', 'Lie'],
    votes: 214,
    status: 'Ønskeliste',
    tag: 'Verdensstjerne',
    image: '/assets/artister/lukas-graham.jpg',
  },
  {
    id: 'tobias-sten',
    name: 'Tobias Sten',
    genre: 'Kystpop / Viser',
    category: 'Vestland & Kyst',
    desc: 'Stjerneskudd med varme tekster og fengende kystpop som treffer rett i hjertet.',
    facts: 'Tobias Sten er en av de mest spennende nye stemmene i norsk musikk, med melodier som kler kystlandskapet og solnedgangen over Kassholmen perfekt.',
    hits: ['Heim te deg', 'Bli her', 'Gatelangs'],
    votes: 198,
    status: 'Ønskeliste',
    tag: 'Kystperle',
    image: '/assets/artister/tobias-sten.jpg',
  },
  {
    id: 'leffe',
    name: 'Leffe',
    genre: 'Ærlig Bergenspop & Viser',
    category: 'Vestland & Kyst',
    desc: 'Født og bosatt i Bergens-området. Kjent for tekster som formidler sterke følelser, livshistorie, mental helse og lokale referanser.',
    background: 'Født og bosatt i Bergens-området.',
    musicStyle: 'Kjent for tekster som formidler sterke følelser, livshistorie og lokale referanser. Han bruker musikken som et verktøy for å bearbeide personlige opplevelser og psykisk helse.',
    mentalHealth: 'Leffe er også åpen om egne erfaringer med depresjon og selvmordstanker, og bruker sin stemme til å sette fokus på mental helse og forebygging.',
    facts: 'Født og bosatt i Bergens-området. Leffe er kjent for tekster som formidler sterke følelser, livshistorie og lokale referanser. Han bruker musikken som et verktøy for å bearbeide personlige opplevelser og psykisk helse. Han er også åpen om egne erfaringer med depresjon og selvmordstanker, og bruker sin stemme aktivt til å sette fokus på mental helse og forebygging.',
    hits: [
      'Erkebergenser (2026)',
      'Den eneste ene (2026)',
      'Løvetannbarn (2026)',
      'Adjø (2024)',
      'Hun Var Super (2023)',
      'KUN SEIER E GODT NOK! (cupfinalelåt)',
      'Tilbake På Plass',
    ],
    platforms: [
      { name: 'Spotify', url: 'https://open.spotify.com/artist/3QitvXfmtzBYdHKeLJFtYS', color: 'bg-[#1DB954]/20 border-[#1DB954]/40 text-[#1DB954] hover:bg-[#1DB954]/30' },
      { name: 'SoundCloud', url: 'https://soundcloud.com/leffe-music', color: 'bg-[#FF5500]/20 border-[#FF5500]/40 text-[#FF5500] hover:bg-[#FF5500]/30' },
      { name: 'NRK P3 Urørt', url: 'https://urort.p3.no/artist/leffe', color: 'bg-[#10B981]/20 border-[#10B981]/40 text-[#10B981] hover:bg-[#10B981]/30' },
      { name: 'Instagram', url: 'https://www.instagram.com/leffe.johannessen/', color: 'bg-[#E1306C]/20 border-[#E1306C]/40 text-[#E1306C] hover:bg-[#E1306C]/30' },
      { name: 'YouTube', url: 'https://www.youtube.com/@leffe.johannessen', color: 'bg-[#FF0000]/20 border-[#FF0000]/40 text-[#FF4E45] hover:bg-[#FF0000]/30' },
    ],
    articles: [
      { title: 'Bergens Tidende Debatt: Slet med depresjon og selvmordstanker', url: 'https://www.bt.no/btmeninger/debatt/i/vgxQrm/leffe-slet-med-depresjon-og-selvmordstanker' },
      { title: 'NRK P3 Urørt: Artistprofil & Låter', url: 'https://urort.p3.no/artist/leffe' },
      { title: 'Proff: Rolleoversikt & Virksomhet', url: 'https://www.proff.no/rolle/leffe-johannessen/lind%C3%A5s/1773698' },
    ],
    spotifyUrl: 'https://open.spotify.com/artist/3QitvXfmtzBYdHKeLJFtYS',
    soundcloudUrl: 'https://soundcloud.com/leffe-music',
    urortUrl: 'https://urort.p3.no/artist/leffe',
    instagramUrl: 'https://www.instagram.com/leffe.johannessen/',
    youtubeUrl: 'https://www.youtube.com/@leffe.johannessen',
    votes: 312,
    status: 'Ønskeliste',
    tag: 'Mental Helse & Hjerte',
    image: '/assets/artister/leffe.jpg',
  },
];

export default function ArtistWishlist() {
  const [artists, setArtists] = useState(() => {
    try {
      const saved = localStorage.getItem('bakkasund_artists_v3');
      if (saved) return JSON.parse(saved);
      const v2 = localStorage.getItem('bakkasund_artists_v2');
      if (v2) {
        const parsedV2 = JSON.parse(v2);
        return ARTISTS_DATA.map(a => {
          const found = parsedV2.find(p => p.id === a.id);
          return found ? { ...a, votes: Math.max(a.votes, found.votes || 0) } : a;
        });
      }
    } catch (e) {
      console.error(e);
    }
    return ARTISTS_DATA;
  });

  const [votedIds, setVotedIds] = useState(() => {
    const saved = localStorage.getItem('bakkasund_voted_v3') || localStorage.getItem('bakkasund_voted_v2');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedArtist, setSelectedArtist] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Alle');
  const [searchTerm, setSearchTerm] = useState('');

  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    genre: 'Norsk Pop/Rock',
    reason: '',
    userContact: '',
  });
  const [submittedMessage, setSubmittedMessage] = useState(false);

  useEffect(() => {
    localStorage.setItem('bakkasund_artists_v3', JSON.stringify(artists));
  }, [artists]);

  useEffect(() => {
    localStorage.setItem('bakkasund_voted_v3', JSON.stringify(votedIds));
  }, [votedIds]);

  const handleVote = (id) => {
    if (votedIds.includes(id)) {
      setArtists((prev) =>
        prev.map((a) => (a.id === id ? { ...a, votes: a.votes - 1 } : a))
      );
      setVotedIds((prev) => prev.filter((i) => i !== id));
      if (selectedArtist && selectedArtist.id === id) {
        setSelectedArtist((prev) => ({ ...prev, votes: prev.votes - 1 }));
      }
    } else {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#F79D1B', '#6EC1C6', '#F3E9D2'],
      });
      setArtists((prev) =>
        prev.map((a) => (a.id === id ? { ...a, votes: a.votes + 1 } : a))
      );
      setVotedIds((prev) => [...prev, id]);
      if (selectedArtist && selectedArtist.id === id) {
        setSelectedArtist((prev) => ({ ...prev, votes: prev.votes + 1 }));
      }
    }
  };

  const handleSubmitSuggestion = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newArtist = {
      id: 'artist-' + Date.now(),
      name: formData.name.trim(),
      genre: formData.genre,
      category: 'Publikumsforslag',
      desc: formData.reason.trim() || 'Foreslått av engasjert festivalpublikum.',
      facts: formData.reason.trim() || 'Foreslått av publikum for Bakkasund LIVE 2027.',
      votes: 1,
      status: 'Innsendt forslag',
      tag: 'Publikumsønske',
      image: '/assets/kassholmen-seagull.jpg',
    };

    setArtists((prev) => [newArtist, ...prev]);
    setVotedIds((prev) => [...prev, newArtist.id]);
    setSubmittedMessage(true);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F79D1B', '#6EC1C6', '#1E6070'],
    });

    setFormData({ name: '', genre: 'Norsk Pop/Rock', reason: '', userContact: '' });
    setTimeout(() => {
      setSubmittedMessage(false);
      setFormOpen(false);
    }, 2500);
  };

  const categories = ['Alle', 'Vestland & Kyst', 'Folkefest & Allsang', 'Pop & Rock', 'Party'];

  const filteredArtists = artists.filter((a) => {
    const matchesCategory = activeCategory === 'Alle' || a.category === activeCategory;
    const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          a.genre.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="artister" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="font-['Caveat'] text-2xl text-[#F79D1B] tracking-wider block mb-2">
          Vær med å forme programmet
        </span>
        <h2 className="font-['Oswald'] text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white mb-4">
          Foreslå & stem på artister
        </h2>
        <p className="text-base text-[#F3E9D2]/80 font-light">
          Bakkasund LIVE 2027 lages for deg. Trykk på en artist for å lese fakta, lytte til musikken og avgi din stemme – eller foreslå en ny artist du drømmer om å oppleve på Kassholmen!
        </p>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setFormOpen(!formOpen)}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#F79D1B] to-[#ffaa2b] text-[#0D1B2A] font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(247,157,27,0.35)] hover:scale-105 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Foreslå artist til festivalen</span>
          </button>
        </div>
      </div>

      {/* Suggestion Form */}
      {formOpen && (
        <div className="max-w-xl mx-auto mb-16 p-6 sm:p-8 rounded-3xl bg-[#0D1B2A]/95 border-2 border-[#F79D1B] shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl animate-fade-in relative text-left">
          <h3 className="font-['Oswald'] text-2xl font-bold uppercase text-white mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#F79D1B]" />
            Ditt artistforslag
          </h3>
          <p className="text-xs text-[#F3E9D2]/70 mb-6">
            Forslaget sendes direkte til bookinggruppen og Roger Alræk!
          </p>

          {submittedMessage ? (
            <div className="p-6 rounded-2xl bg-[#1E6070]/60 border border-[#6EC1C6] text-center space-y-2">
              <CheckCircle2 className="w-12 h-12 text-[#6EC1C6] mx-auto animate-bounce" />
              <h4 className="font-['Oswald'] text-xl font-bold text-white uppercase">
                Tusen takk for forslaget!
              </h4>
              <p className="text-sm text-[#F3E9D2]">
                Artisten er nå lagt til i listen slik at andre også kan stemme på den.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitSuggestion} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-bold text-[#6EC1C6] mb-1">
                  Artist- eller bandnavn *
                </label>
                <input
                  type="text"
                  required
                  placeholder="f.eks. Sigrid, Bjørn Eidsvåg, Matoma..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#F79D1B] text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-[#6EC1C6] mb-1">
                    Sjanger
                  </label>
                  <select
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0D1B2A] border border-white/15 text-white focus:outline-none focus:border-[#F79D1B] text-sm"
                  >
                    <option>Norsk Pop/Rock</option>
                    <option>Kyst & Vise</option>
                    <option>Fest & Allsang</option>
                    <option>Elektronisk / DJ</option>
                    <option>Country</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase font-bold text-[#6EC1C6] mb-1">
                    Din e-post (valgfritt)
                  </label>
                  <input
                    type="email"
                    placeholder="din@epost.no"
                    value={formData.userContact}
                    onChange={(e) => setFormData({ ...formData, userContact: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#F79D1B] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-[#6EC1C6] mb-1">
                  Hvorfor passer denne artisten på Kassholmen?
                </label>
                <textarea
                  rows={2}
                  placeholder="Fortell hvorfor denne artisten skaper magi i havgapet..."
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#F79D1B] text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white/60 hover:text-white"
                >
                  Avbryt
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#F79D1B] hover:bg-[#ffaa2b] text-[#0D1B2A] font-bold text-xs uppercase tracking-wider shadow-lg cursor-pointer"
                >
                  Send inn forslag
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#F79D1B] text-[#0D1B2A] shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Søk etter artist..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-full bg-white/5 border border-white/15 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#F79D1B]"
          />
        </div>
      </div>

      {/* Artists Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredArtists.map((artist) => {
          const hasVoted = votedIds.includes(artist.id);
          return (
            <div
              key={artist.id}
              onClick={() => setSelectedArtist(artist)}
              className={`glass-card rounded-2xl overflow-hidden flex flex-col justify-between border transition-all cursor-pointer group hover:scale-[1.02] ${
                hasVoted
                  ? 'border-[#F79D1B] bg-[#1E6070]/25 shadow-[0_0_20px_rgba(247,157,27,0.2)]'
                  : 'border-white/10 hover:border-[#6EC1C6]/50'
              }`}
            >
              <div>
                {/* Photo */}
                <div className="relative h-48 w-full bg-black/40 overflow-hidden">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = '/assets/kassholmen-seagull.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-transparent to-black/20" />

                  {/* Tag */}
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-[10px] uppercase font-bold text-[#F79D1B]">
                    {artist.tag}
                  </div>

                  {/* Info Icon Pill */}
                  <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/80 group-hover:bg-[#F79D1B] group-hover:text-[#0D1B2A] transition-colors">
                    <Info className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 text-left">
                  <h3 className="font-['Oswald'] text-xl font-bold uppercase tracking-wide text-white group-hover:text-[#F79D1B] transition-colors">
                    {artist.name}
                  </h3>
                  <div className="text-[11px] text-[#6EC1C6] font-medium uppercase tracking-wider mb-2">
                    {artist.genre}
                  </div>
                  <p className="text-xs text-[#F3E9D2]/75 line-clamp-2 leading-relaxed">
                    {artist.desc}
                  </p>
                </div>
              </div>

              {/* Vote & Pop-up Footer */}
              <div className="p-4 pt-2 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <Flame className="w-4 h-4 text-[#F79D1B]" />
                  <span>{artist.votes}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVote(artist.id);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      hasVoted
                        ? 'bg-[#F79D1B] text-[#0D1B2A] shadow-md'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${hasVoted ? 'fill-[#0D1B2A]' : ''}`} />
                    <span>{hasVoted ? 'Stemt' : 'Stem'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pop-up Artist Detail Modal */}
      <ArtistModal
        artist={selectedArtist}
        isOpen={!!selectedArtist}
        onClose={() => setSelectedArtist(null)}
        onVote={handleVote}
        hasVoted={selectedArtist ? votedIds.includes(selectedArtist.id) : false}
      />
    </section>
  );
}
