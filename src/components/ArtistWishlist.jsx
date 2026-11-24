import React, { useState, useEffect } from 'react';
import { ThumbsUp, Heart, Plus, Sparkles, Music, Star, Flame, CheckCircle2, Search, Info, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import ArtistModal from './ArtistModal';

export const ARTISTS_DATA = [
  {
    id: 'vamp',
    name: 'Vamp',
    genre: 'Kystmusikk / Folkrock',
    category: 'Vestland & Kyst',
    desc: 'Kystens desiderte konger. «Tir n’a noir» og rå vestlandsstemning mens bølgene slår mot svabergene.',
    background: 'Startet i Haugesund i 1990 rundt felespiller og låtskriver Øyvind Staveland. Debutalbumet «Godmorgen, søster» kom i 1993. I dag består bandet av Øyvind og Odin Staveland, Jan Toft, Kjetil Dalland og Lars Eirik Støle.',
    musicStyle: 'Norsk folkemusikk møter rock: fele, trekkspill og fløyte under tekster fra Kolbein Falkeid og andre norske diktere. Musikken handler om havet, kysten og folka som bor der.',
    facts: 'Vamp fra Haugesund er selve lyden av Vestlandet og Nordsjøen. Bandet har vunnet Spellemannprisen fem ganger, ble Årets Spellemann for «I full symfoni» med Kringkastingsorkesteret, og har solgt rundt én million plater. Albumene «Siste stikk» og «St. Mandag» gikk begge til topps i Norge. En konsert på Kassholmen, med havet rett bak scenen, er så nær Vamp-universet som det går an.',
    hits: ['Tir n’a noir (2006)', 'På bredden (2008)', 'Liten fuggel (2012)', 'Onkel Holger (2017)', 'Godmorgen, søster (1993)'],
    platforms: [
      { name: 'Spotify', url: 'https://open.spotify.com/search/Vamp', color: 'bg-[#1DB954]/20 border-[#1DB954]/40 text-[#1DB954] hover:bg-[#1DB954]/30' },
      { name: 'Apple Music', url: 'https://music.apple.com/artist/446771061', color: 'bg-[#FA243C]/20 border-[#FA243C]/40 text-[#FA586A] hover:bg-[#FA243C]/30' },
      { name: 'YouTube', url: 'https://www.youtube.com/user/Vampmusikk/', color: 'bg-[#FF0000]/20 border-[#FF0000]/40 text-[#FF4E45] hover:bg-[#FF0000]/30' },
      { name: 'Instagram', url: 'https://www.instagram.com/vampno/', color: 'bg-[#E1306C]/20 border-[#E1306C]/40 text-[#E1306C] hover:bg-[#E1306C]/30' },
      { name: 'Facebook', url: 'https://www.facebook.com/vampno/', color: 'bg-[#1877F2]/20 border-[#1877F2]/40 text-[#6FA8FF] hover:bg-[#1877F2]/30' },
      { name: 'Nettside', url: 'https://vamp.no/', color: 'bg-sol/15 border-sol/40 text-sol hover:bg-sol/25' },
    ],
    articles: [
      { title: 'Vamp.no: Om bandet', url: 'https://vamp.no/om-vamp/' },
      { title: 'Store norske leksikon: Vamp', url: 'https://snl.no/Vamp' },
      { title: 'NRK Rogaland: Bjørn Berge blir ny Vamp-gitarist', url: 'https://www.nrk.no/rogaland/bjorn-berge-blir-ny-vamp-gitarist-1.12000709' },
    ],
    votes: 382,
    status: 'I dialog',
    tag: 'Vestlandskonge',
    image: '/assets/artister/vamp.jpg',
  },
  {
    id: 'baba-nation',
    name: 'Baba Nation',
    genre: 'Soul / Funk',
    category: 'Vestland & Kyst',
    desc: 'Bergens store soul- og funkband fra 90-tallet. «Too Bad» og «Ragamuffinmini» på en sommerkveld ved sjøen.',
    background: 'Startet i Bergen i 1990 av gitarist Jan Erik de Lange Gullaksen, først under navnet Yee ’Ha Wanna Have A Baba. Fikk platekontrakt med Warner og byttet navn til Baba Nation i 1995. Med Erik Røe (vokal), Knut Hillersøy (tangenter) og Nicolai Hauan (bass).',
    musicStyle: 'Svett soul og funk med tett groove, blås og en vokalist som tar hele rommet. Debuten «Love Express» (1996) og «B» (1999), produsert av David Eriksen, var lydsporet til Bergens uteliv på slutten av 90-tallet.',
    facts: 'Baba Nation var et av Bergens største band på 90-tallet. «Too Bad» lå 17 uker på hitlistene, og konsertene var kjent for å være ville og grenseløse. Bandet tok pause rundt 2000 og samlet originalbesetningen for én kveld i 2014. En gjenforening på Kassholmen vil være noe helt spesielt for alle som var unge i Bergen på 90-tallet.',
    hits: ['Too Bad (1999)', 'Ragamuffinmini (1996)', 'Time to Heal', 'Love Express (album, 1996)', 'B (album, 1999)'],
    platforms: [
      { name: 'Spotify', url: 'https://open.spotify.com/search/Baba%20Nation', color: 'bg-[#1DB954]/20 border-[#1DB954]/40 text-[#1DB954] hover:bg-[#1DB954]/30' },
      { name: 'Apple Music', url: 'https://music.apple.com/no/search?term=Baba%20Nation', color: 'bg-[#FA243C]/20 border-[#FA243C]/40 text-[#FA586A] hover:bg-[#FA243C]/30' },
      { name: 'YouTube', url: 'https://www.youtube.com/results?search_query=Baba+Nation+Too+Bad', color: 'bg-[#FF0000]/20 border-[#FF0000]/40 text-[#FF4E45] hover:bg-[#FF0000]/30' },
    ],
    articles: [
      { title: 'Bergens Tidende: De var Bergens største band. Plutselig ble det stille. (2025)', url: 'https://www.bt.no/kultur/i/5E7G4K/baba-nation-var-bergens-stoerste-rockeband-plutselig-ble-det-stille' },
      { title: 'Bergens Tidende: Nå blir det Baba-feber igjen (2014)', url: 'https://www.bt.no/kultur/i/dvyJX/naa-blir-det-baba-feber-igjen' },
      { title: 'Wikipedia: Baba Nation', url: 'https://en.wikipedia.org/wiki/Baba_Nation' },
    ],
    votes: 204,
    status: 'Ønskeliste',
    tag: 'Bergens-comeback',
    image: '/assets/artister/baba-nation.jpg',
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
  {
    id: 'rubz',
    name: 'Rubz / Røsten',
    genre: 'Rap & Låtskriver',
    category: 'Vestland & Kyst',
    desc: '«Låtskriverhjerne, musiker og tidvis litt provokatør.» Rapper fra Nesttun som skriver om det folk flest prøver å drikke bort, med svart humor og dønn ærlige tekster på bergensk.',
    background: 'Ruben Røsten vokste opp på barnehjem i nærheten av Nesttun og følte seg tidlig plassert på siden av samfunnet. Den følelsen gjorde han senere til sitt fremste våpen. Etter en runde i GS Studio og en tur innom X Factor i 2010 bestemte han seg for å styre skuta selv, og startet sitt eget selskap, Røsten Ent.',
    musicStyle: 'Norsk rap på bergensk, med en blanding av svart humor, ærlige tekster og en god dose selvironi. Låtene spenner fra tunge historier om livet til festlåter, og han samarbeider ofte med andre artister fra Vestlandet.',
    facts: 'Over 1,3 millioner avspillinger på Spotify som RubZ, med «Kem E» (over 600 000) og «Fossefall» (nær 280 000) på toppen. Musikkvideoen til «Tro På Deg Selv» har over 67 000 visninger på YouTube. Han har samarbeidet med blant andre Leffe Johannessen, Doffen, Padde, Helene Birkeland og Lene Hamre.',
    hits: [
      'Kem E',
      'Fossefall',
      'Tro På Deg Selv',
      'Hun Var Super (feat. Leffe Johannessen)',
      'Fasaden Faller',
      'Dønn Klar (feat. Padde & Helene Birkeland)',
      'Hotell (ft. Doffen)',
    ],
    platforms: [
      { name: 'Spotify', url: 'https://open.spotify.com/artist/5ik7pxUyQn4eaZLPGsIJur', color: 'bg-[#1DB954]/20 border-[#1DB954]/40 text-[#1DB954] hover:bg-[#1DB954]/30' },
      { name: 'NRK P3 Urørt', url: 'https://urort.p3.no/artist/rubz', color: 'bg-[#10B981]/20 border-[#10B981]/40 text-[#10B981] hover:bg-[#10B981]/30' },
      { name: 'SoundCloud', url: 'https://soundcloud.com/orubsen', color: 'bg-[#FF5500]/20 border-[#FF5500]/40 text-[#FF5500] hover:bg-[#FF5500]/30' },
      { name: 'YouTube', url: 'https://www.youtube.com/@RubenRstenMusic', color: 'bg-[#FF0000]/20 border-[#FF0000]/40 text-[#FF4E45] hover:bg-[#FF0000]/30' },
      { name: 'Instagram', url: 'https://www.instagram.com/orubsen/', color: 'bg-[#E1306C]/20 border-[#E1306C]/40 text-[#E1306C] hover:bg-[#E1306C]/30' },
      { name: 'TikTok', url: 'https://www.tiktok.com/@orubsen', color: 'bg-papir/10 border-papir/30 text-papir hover:bg-papir/20' },
      { name: 'Facebook', url: 'https://www.facebook.com/RubZBergen/', color: 'bg-[#1877F2]/20 border-[#1877F2]/40 text-[#6FA8FF] hover:bg-[#1877F2]/30' },
      { name: 'Alle lenker', url: 'https://ffm.bio/rubz', color: 'bg-sol/15 border-sol/40 text-sol hover:bg-sol/25' },
    ],
    articles: [
      { title: 'Fanaposten: Rubz blir personlig', url: 'https://www.fanaposten.no/nyheter/rubz-blir-personlig/s/24-153-2338' },
      { title: 'NRK P3 Urørt: Artistprofil & Låter', url: 'https://urort.p3.no/artist/rubz' },
    ],
    spotifyUrl: 'https://open.spotify.com/artist/5ik7pxUyQn4eaZLPGsIJur',
    soundcloudUrl: 'https://soundcloud.com/orubsen',
    urortUrl: 'https://urort.p3.no/artist/rubz',
    instagramUrl: 'https://www.instagram.com/orubsen/',
    youtubeUrl: 'https://www.youtube.com/@RubenRstenMusic',
    votes: 245,
    status: 'Ønskeliste',
    tag: 'Bergensrap',
    image: '/assets/artister/rubz-konsert.jpg',
  },
  {
    id: 'trang-fodsel',
    name: 'Trang Fødsel',
    genre: 'Norsk Pop & Allsang',
    category: 'Vestland & Kyst',
    desc: 'Bergensbandet bak «Hybel», «Kursiv» og fredagsklassikeren «Fredag». Norskspråklig pop som hele salen kan synge med på.',
    background: 'Startet som en duo i Bergen i 1992 og vokste til fullt band. Debutalbumet «Bare Barnet» kom i 1995, og gjennombruddet kom med «Hybel» i 1997. Bandet tok pause rundt 2000, kom tilbake med albumet «Hammock» i 2007, og er fortsatt aktivt på scenen.',
    musicStyle: 'Fengende norskspråklig pop med lune, hverdagsnære tekster. Låtene har gått på radio i snart 30 år, og «Fredag» har vært fast innslag på NRK hver fredag siden 2005.',
    facts: 'Trang Fødsel ble startet i Bergen i 1992. «Kursiv» ble nominert til Spellemann for årets låt, og «Hybel» og «Fredag» er blant de mest spilte norske poplåtene på radio. Sommeren 2026 avsluttet bandet Olsokdagene på Stiklestad.',
    hits: [
      'Fredag (2005)',
      'Kursiv (1997)',
      'Hybel (1997)',
      'Drømmedame',
      'Livet er helt ålreit',
      'Hippie',
    ],
    articles: [
      { title: 'Stiklestad: Trang Fødsel avslutter Olsokdagene 2026', url: 'https://stiklestad.no/2026/02/trang-fodsel-holder-avslutningskonsert-for-olsokdagene-2026/' },
      { title: 'Side2: – Umulig å avskilte oss (comebacket i 2007)', url: 'https://www.klikk.no/underholdning/musikk/umulig-a-avskilte-oss-3850214' },
      { title: 'VIP-Booking: Artistprofil', url: 'https://www.vip-booking.com/artist/trang-fdsel-4440' },
    ],
    votes: 288,
    status: 'Ønskeliste',
    tag: 'Bergensklassiker',
    image: '/assets/artister/trang-fodsel.jpg',
  },
  {
    id: 'madelene',
    name: 'Madeléne',
    genre: 'Countrypop',
    category: 'Folkefest & Allsang',
    desc: 'Ny stemme i norsk countrypop. «Villblomst» og «Livet Slik Det Var» med El Papi gikk inn på listene og ble mye spilt på radio i 2025.',
    background: 'Madeléne slo gjennom i 2025 med låter som klatret på listene og fikk mye radiospilling. Ticketmaster trekker henne frem som en av ti nye artister å følge med på i 2026.',
    musicStyle: 'Countrypop på norsk med allsangrefreng. Passer rett inn i en sommerkveld ved sjøen.',
    facts: 'Kupp-kandidat: Madeléne er på vei opp, og etter en sterk 2025 er det grunn til å tro at plateselskapet satser videre i 2027. Booker vi henne tidlig, får vi henne før prisen stiger.',
    hits: ['Villblomst', 'Livet Slik Det Var (med El Papi)'],
    articles: [{ title: 'Ticketmaster Fresh List: 10 nye artister du bør følge med på i 2026', url: 'https://blog.ticketmaster.no/nyheter/new-music/fresh-list-10-nye-artister-du-bor-folge-med-pa-i-2026-9846' }],
    votes: 176,
    status: 'Ønskeliste',
    tag: 'Kupp 2027',
    image: '/assets/artister/madelene.jpg',
  },
  {
    id: 'bargee',
    name: 'Bargee',
    genre: 'Pop & Festlåter',
    category: 'Party',
    desc: 'Skuespilleren som ble artist. «SEES IGJEN» lå to uker på topp 10 i Norge, og debutalbumet «Syndebukken» er ventet i 2026.',
    background: 'Bargee har bakgrunn som skuespiller og har gått over til musikken. Han har hatt to topp 50-låter, «Brunette & Blondine» med Tyr og «Opp og nikke» med Broiler.',
    musicStyle: 'Fengende pop og festlåter på norsk, gjerne i samarbeid med andre artister.',
    facts: 'Kupp-kandidat: Med en topp 10-låt og et debutalbum på vei ligger Bargee an til å bli en av de store satsingene i 2027. Nå er han fortsatt mulig å få til en pris en liten festival tåler.',
    hits: ['SEES IGJEN', 'Brunette & Blondine (med Tyr)', 'Opp og nikke (med Broiler)'],
    articles: [{ title: 'Ticketmaster Fresh List: 10 nye artister du bør følge med på i 2026', url: 'https://blog.ticketmaster.no/nyheter/new-music/fresh-list-10-nye-artister-du-bor-folge-med-pa-i-2026-9846' }],
    votes: 162,
    status: 'Ønskeliste',
    tag: 'Kupp 2027',
    image: '/assets/artister/bargee.jpg',
  },
  {
    id: 'funk-for-forest',
    name: 'Funk For Forest',
    genre: 'Funk, Disco & Afrobeat',
    category: 'Party',
    desc: 'Åttemanns orkester som har vært et klubbfenomen på dansegulvet i Oslo i to år. Funk, disco og afrobeat som får alle opp å danse.',
    background: 'Funk For Forest er et orkester på åtte musikere, kjent for konsertene sine på klubbscenen i Oslo. Sommeren 2026 spilte de blant annet på Ravnedalen Live.',
    musicStyle: 'Jungelfunk, disco og afrobeat med blåsere og tung rytmeseksjon. Laget for dansegulvet.',
    facts: 'Kupp-kandidat: Et liveband som vokser raskt fra klubb til festival. Perfekt som sene-kvelden-band på Kassholmen før de blir for store.',
    hits: [],
    articles: [{ title: 'Ticketmaster Fresh List: 10 nye artister du bør følge med på i 2026', url: 'https://blog.ticketmaster.no/nyheter/new-music/fresh-list-10-nye-artister-du-bor-folge-med-pa-i-2026-9846' }],
    votes: 141,
    status: 'Ønskeliste',
    tag: 'Kupp 2027',
    image: '/assets/artister/funk-for-forest.jpg',
  },
];

export default function ArtistWishlist() {
  const [artists, setArtists] = useState(() => {
    // Lagrede stemmer slås sammen med dagens artistliste, så nye artister og nye fakta
    // alltid vises, også for dem som har besøkt siden før.
    try {
      const saved = JSON.parse(
        localStorage.getItem('bakkasund_artists_v3') || localStorage.getItem('bakkasund_artists_v2') || 'null'
      );
      if (Array.isArray(saved)) {
        const known = new Set(ARTISTS_DATA.map((a) => a.id));
        const merged = ARTISTS_DATA.map((a) => {
          const found = saved.find((p) => p.id === a.id);
          return found ? { ...a, votes: Math.max(a.votes, found.votes || 0) } : a;
        });
        const forslag = saved.filter((p) => p && !known.has(p.id) && p.category === 'Publikumsforslag');
        return [...forslag, ...merged];
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
        <span className="t-merke text-sol tracking-wider block mb-2">
          Vær med å forme programmet
        </span>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white mb-4">
          Foreslå & stem på artister
        </h2>
        <p className="text-base text-papir/80">
          Bakkasund LIVE 2027 lages for deg. Trykk på en artist for å lese fakta, lytte til musikken og avgi din stemme – eller foreslå en ny artist du drømmer om å oppleve på Kassholmen!
        </p>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setFormOpen(!formOpen)}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-sol hover:bg-sol-2 text-blekk font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Foreslå artist til festivalen</span>
          </button>
        </div>
      </div>

      {/* Suggestion Form */}
      {formOpen && (
        <div className="max-w-xl mx-auto mb-16 p-6 sm:p-8 rounded-2xl bg-blekk/95 border-2 border-sol shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl animate-fade-in relative text-left">
          <h3 className="font-display text-2xl font-bold uppercase text-white mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sol" />
            Ditt artistforslag
          </h3>
          <p className="text-xs text-papir/70 mb-6">
            Forslaget sendes direkte til bookinggruppen og Roger Alræk!
          </p>

          {submittedMessage ? (
            <div className="p-6 rounded-2xl bg-fjord/60 border border-sjo text-center space-y-2">
              <CheckCircle2 className="w-12 h-12 text-sjo mx-auto animate-bounce" />
              <h4 className="font-display text-xl font-bold text-white uppercase">
                Tusen takk for forslaget!
              </h4>
              <p className="text-sm text-papir">
                Artisten er nå lagt til i listen slik at andre også kan stemme på den.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitSuggestion} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-bold text-sjo mb-1">
                  Artist- eller bandnavn *
                </label>
                <input
                  type="text"
                  required
                  placeholder="f.eks. Sigrid, Bjørn Eidsvåg, Matoma..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-sol text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-sjo mb-1">
                    Sjanger
                  </label>
                  <select
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-blekk border border-white/15 text-white focus:outline-none focus:border-sol text-sm"
                  >
                    <option>Norsk Pop/Rock</option>
                    <option>Kyst & Vise</option>
                    <option>Fest & Allsang</option>
                    <option>Elektronisk / DJ</option>
                    <option>Country</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase font-bold text-sjo mb-1">
                    Din e-post (valgfritt)
                  </label>
                  <input
                    type="email"
                    placeholder="din@epost.no"
                    value={formData.userContact}
                    onChange={(e) => setFormData({ ...formData, userContact: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-sol text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-sjo mb-1">
                  Hvorfor passer denne artisten på Kassholmen?
                </label>
                <textarea
                  rows={2}
                  placeholder="Fortell hvorfor denne artisten skaper magi i havgapet..."
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-sol text-sm"
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
                  className="px-6 py-2.5 rounded-xl bg-sol hover:bg-[#ffaa2b] text-blekk font-bold text-xs uppercase tracking-wider shadow-lg cursor-pointer"
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
                  ? 'bg-sol text-blekk shadow-md'
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
            className="w-full pl-9 pr-4 py-2 rounded-full bg-white/5 border border-white/15 text-white placeholder-white/40 text-xs focus:outline-none focus:border-sol"
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
              className={`glass-card rounded-2xl overflow-hidden flex flex-col justify-between border transition-all cursor-pointer group ${
                hasVoted
                  ? 'border-sol bg-fjord/25'
                  : 'border-white/10 hover:border-sjo/50'
              }`}
            >
              <div>
                {/* Photo */}
                <div className="relative h-48 w-full bg-black/40 overflow-hidden">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = '/assets/kassholmen-seagull.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blekk via-transparent to-black/20" />

                  {/* Tag */}
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-[10px] uppercase font-bold text-sol">
                    {artist.tag}
                  </div>

                  {/* Info Icon Pill */}
                  <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/80 group-hover:bg-sol group-hover:text-blekk transition-colors">
                    <Info className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 text-left">
                  <h3 className="font-display text-xl font-bold uppercase tracking-wide text-white group-hover:text-sol transition-colors">
                    {artist.name}
                  </h3>
                  <div className="text-[11px] text-sjo font-medium uppercase tracking-wider mb-2">
                    {artist.genre}
                  </div>
                  <p className="text-xs text-papir/75 line-clamp-2 leading-relaxed">
                    {artist.desc}
                  </p>
                </div>
              </div>

              {/* Vote & Pop-up Footer */}
              <div className="p-4 pt-2 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <Flame className="w-4 h-4 text-sol" />
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
                        ? 'bg-sol text-blekk shadow-md'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${hasVoted ? 'fill-blekk' : ''}`} />
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
