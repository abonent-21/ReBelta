import { useState, useEffect } from 'react';
import { RouteType } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Architecture } from './components/Architecture';
import { SafetyChain } from './components/SafetyChain';
import { Capabilities } from './components/Capabilities';
import { Roadmap } from './components/Roadmap';
import { Footer } from './components/Footer';
import { DemoApp } from './components/demo/DemoApp';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<RouteType>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.includes('/demo')) return 'demo';
    }
    return 'home';
  });

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.includes('/demo')) {
        setCurrentRoute('demo');
      } else {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (route: RouteType, hash?: string) => {
    setCurrentRoute(route);

    const targetUrl = route === 'demo' ? '/demo' : '/';
    if (window.location.pathname !== targetUrl) {
      window.history.pushState(null, '', targetUrl);
    }

    if (route === 'home' && hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    } else if (route === 'home' && !hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#06080d] text-white flex flex-col font-['Inter',sans-serif] selection:bg-cyan-500/30 selection:text-white">
      {currentRoute === 'home' ? (
        <>
          <Navbar currentRoute="home" onNavigate={handleNavigate} />
          <main className="flex-1">
            <Hero onNavigate={handleNavigate} />
            <Architecture onNavigate={handleNavigate} />
            <SafetyChain />
            <Capabilities onNavigate={handleNavigate} />
            <Roadmap />
          </main>
          <Footer onNavigate={handleNavigate} />
        </>
      ) : (
        <DemoApp onNavigate={handleNavigate} />
      )}
    </div>
  );
}
