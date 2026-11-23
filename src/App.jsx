import React, { useState } from 'react';
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
import AdminPage from './pages/AdminPage';

import VolunteerModal from './components/VolunteerModal';
import PartnersModal from './components/PartnersModal';
import VendorModal from './components/VendorModal';
import VideoModal from './components/VideoModal';

export default function App() {
  const [volunteerOpen, setVolunteerOpen] = useState(false);
  const [sponsorOpen, setSponsorOpen] = useState(false);
  const [vendorOpen, setVendorOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/admin/*" element={<AdminPage />} />
        <Route
          path="*"
          element={
      <div className="min-h-screen bg-blekk text-papir relative flex flex-col">
        <a href="#hovedinnhold" className="skip-link">Hopp til innholdet</a>
        {/* Navigation Bar */}
        <Navbar
          onOpenVolunteer={() => setVolunteerOpen(true)}
          onOpenSponsor={() => setSponsorOpen(true)}
          onOpenVendor={() => setVendorOpen(true)}
        />

        {/* Multi-page Routing */}
        <main id="hovedinnhold" tabIndex={-1} className="flex-grow focus:outline-none">
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
      </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
