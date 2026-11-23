import { useEffect, useState } from 'react';

/*
  Gjør arrangørpanelet installerbart som app (PWA) på Android og i Chrome/Edge.
  Manifestet lenkes bare inn på /admin, så resten av festivalsiden forblir en vanlig nettside.
*/
function isStandalone() {
  return window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

export default function useInstallApp() {
  const [prompt, setPrompt] = useState(null);
  const [installed, setInstalled] = useState(isStandalone);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'manifest';
    link.href = '/admin-app/manifest.webmanifest';
    document.head.appendChild(link);

    const theme = document.querySelector('meta[name="theme-color"]');
    const prevTheme = theme?.getAttribute('content');
    theme?.setAttribute('content', '#08131F');

    if ('serviceWorker' in navigator && !['localhost', '127.0.0.1'].includes(window.location.hostname)) {
      navigator.serviceWorker.register('/admin-sw.js', { scope: '/admin' }).catch(() => {});
    }

    const onPrompt = (e) => {
      e.preventDefault();
      setPrompt(e);
    };
    const onInstalled = () => {
      setInstalled(true);
      setPrompt(null);
    };
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);

    return () => {
      link.remove();
      if (theme && prevTheme) theme.setAttribute('content', prevTheme);
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const install = async () => {
    if (!prompt) return false;
    prompt.prompt();
    const { outcome } = await prompt.userChoice;
    setPrompt(null);
    if (outcome === 'accepted') setInstalled(true);
    return true;
  };

  return { canInstall: Boolean(prompt), installed, install };
}
