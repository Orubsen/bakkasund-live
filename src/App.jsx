import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';
import ExperiencePage from './pages/ExperiencePage';
import VenuePage from './pages/VenuePage';
import ArtistsPage from './pages/ArtistsPage';
import TicketsPage from './pages/TicketsPage';
import ContactPage from './pages/ContactPage';

import VolunteerModal from './components/VolunteerModal';
import PartnersModal from './components/PartnersModal';
import VendorModal from './components/VendorModal';
import VideoModal from './components/VideoModal';
import AuthModal from './components/AuthModal';

export default function App() {
  const [volunteerOpen, setVolunteerOpen] = useState(false);
  const [sponsorOpen, setSponsorOpen] = useState(false);
  const [vendorOpen, setVendorOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('bakkasund_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('bakkasund_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('bakkasund_user');
    if (window.netlifyIdentity) {
      window.netlifyIdentity.logout();
    }
  };

  // Listen to Netlify Identity on mount if available
  useEffect(() => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', (netlifyUser) => {
        if (netlifyUser && !user) {
          handleLogin({
            name: netlifyUser.user_metadata?.full_name || netlifyUser.email?.split('@')[0],
            email: netlifyUser.email,
            avatar: netlifyUser.user_metadata?.avatar_url || 'https://github.com/Orubsen.png',
            provider: 'GitHub via Netlify Identity',
            vip: true,
          });
        }
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[#0D1B2A] text-[#F3E9D2] relative selection:bg-[#F79D1B] selection:text-[#0D1B2A] flex flex-col justify-between">
        {/* Navigation Bar */}
        <Navbar
          onOpenVolunteer={() => setVolunteerOpen(true)}
          onOpenSponsor={() => setSponsorOpen(true)}
          onOpenVendor={() => setVendorOpen(true)}
          user={user}
          onOpenAuth={() => setAuthOpen(true)}
        />

        {/* Multi-page Routing */}
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onOpenVideo={() => setVideoOpen(true)}
                  onOpenVolunteer={() => setVolunteerOpen(true)}
                  onOpenSponsor={() => setSponsorOpen(true)}
                  onOpenVendor={() => setVendorOpen(true)}
                />
              }
            />
            <Route path="/opplevelsen" element={<ExperiencePage />} />
            <Route path="/festivaloyen" element={<VenuePage />} />
            <Route path="/artister" element={<ArtistsPage />} />
            <Route path="/billetter" element={<TicketsPage />} />
            <Route
              path="/kontakt"
              element={
                <ContactPage
                  onOpenVolunteer={() => setVolunteerOpen(true)}
                  onOpenSponsor={() => setSponsorOpen(true)}
                  onOpenVendor={() => setVendorOpen(true)}
                />
              }
            />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer
          onOpenVolunteer={() => setVolunteerOpen(true)}
          onOpenSponsor={() => setSponsorOpen(true)}
          onOpenVendor={() => setVendorOpen(true)}
        />

        {/* Modals */}
        <VolunteerModal
          isOpen={volunteerOpen}
          onClose={() => setVolunteerOpen(false)}
        />

        <PartnersModal
          isOpen={sponsorOpen}
          onClose={() => setSponsorOpen(false)}
        />

        <VendorModal
          isOpen={vendorOpen}
          onClose={() => setVendorOpen(false)}
        />

        <VideoModal
          isOpen={videoOpen}
          onClose={() => setVideoOpen(false)}
        />

        <AuthModal
          isOpen={authOpen}
          onClose={() => setAuthOpen(false)}
          user={user}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      </div>
    </BrowserRouter>
  );
}
