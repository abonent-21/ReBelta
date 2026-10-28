import { useState, useEffect } from 'react';
import { CircleUserRound, Menu, X, ArrowUpRight } from 'lucide-react';
import { ReBeltaLogo } from './ReBeltaLogo';
import { RouteType } from '../types';

interface NavbarProps {
  currentRoute: RouteType;
  onNavigate: (route: RouteType, hash?: string) => void;
}

export function Navbar({ currentRoute, onNavigate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (route: RouteType, hash?: string) => {
    setMenuOpen(false);
    onNavigate(route, hash);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-[#06080d]/80 backdrop-blur-md py-4' : 'pt-6 sm:pt-8 md:pt-8 pb-4'
        }`}
      >
        <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 flex items-center justify-between">
          {/* Left: Brand Identity */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
            aria-label="ReBelta главная страница"
          >
            <ReBeltaLogo className="h-8 w-8 md:h-9 md:w-9 transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-semibold tracking-tight text-white group-hover:text-cyan-200 transition-colors">
                ReBelta
              </span>
            </div>
          </button>

          {/* Center: Desktop Liquid Glass Pill */}
          <nav
            aria-label="Основная навигация"
            className="hidden md:flex items-center gap-7 px-8 py-3 rounded-full liquid-glass text-sm font-medium shadow-lg"
          >
            <button
              onClick={() => handleNavClick('home', 'hero')}
              className={`transition-colors whitespace-nowrap cursor-pointer ${
                currentRoute === 'home'
                  ? 'text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              О проекте
            </button>
            <button
              onClick={() => handleNavClick('home', 'architecture')}
              className="text-white/70 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
            >
              Архитектура
            </button>
            <button
              onClick={() => handleNavClick('home', 'safety')}
              className="text-white/70 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
            >
              Безопасность
            </button>
            <button
              onClick={() => handleNavClick('home', 'capabilities')}
              className="text-white/70 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
            >
              Возможности
            </button>
            <button
              onClick={() => handleNavClick('home', 'roadmap')}
              className="text-white/70 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
            >
              Дорожная карта
            </button>
            <button
              onClick={() => handleNavClick('demo')}
              className={`flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                currentRoute === 'demo'
                  ? 'text-cyan-300 font-semibold'
                  : 'text-cyan-400 hover:text-cyan-200'
              }`}
            >
              <span>Демо приложения</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </nav>

          {/* Right (Desktop): Liquid Glass Circle & Primary Action */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('demo')}
              className="liquid-glass rounded-full px-5 py-2.5 text-xs font-medium text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm"
              title="Открыть интерактивное демо"
            >
              <span>Открыть демо</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            </button>
            <div
              className="liquid-glass h-10 w-10 rounded-full flex items-center justify-center text-white/80 cursor-default"
              title="ReBelta Platform Client"
            >
              <CircleUserRound className="h-5 w-5" strokeWidth={1.5} />
            </div>
          </div>

          {/* Right (Mobile): Liquid Glass Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden liquid-glass h-10 w-10 rounded-full relative z-50 flex items-center justify-center text-white focus:outline-none cursor-pointer"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menuOpen}
          >
            <span
              className={`absolute transition-all duration-300 ${
                menuOpen
                  ? 'rotate-90 scale-0 opacity-0'
                  : 'rotate-0 scale-100 opacity-100'
              }`}
            >
              <Menu className="h-5 w-5 text-white/90" />
            </span>
            <span
              className={`absolute transition-all duration-300 ${
                menuOpen
                  ? 'rotate-0 scale-100 opacity-100'
                  : '-rotate-90 scale-0 opacity-0'
              }`}
            >
              <X className="h-5 w-5 text-white/90" />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-30 md:hidden bg-black/85 backdrop-blur-xl transition-all duration-500 flex flex-col items-center justify-center ${
          menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`flex flex-col items-center gap-6 px-6 text-center transition-all duration-500 ${
            menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
          }`}
        >
          <button
            onClick={() => handleNavClick('home', 'hero')}
            className="text-2xl font-medium text-white hover:text-cyan-300 transition-colors"
          >
            О проекте
          </button>
          <button
            onClick={() => handleNavClick('home', 'architecture')}
            className="text-xl font-medium text-white/80 hover:text-white transition-colors"
          >
            Архитектура
          </button>
          <button
            onClick={() => handleNavClick('home', 'safety')}
            className="text-xl font-medium text-white/80 hover:text-white transition-colors"
          >
            Безопасность
          </button>
          <button
            onClick={() => handleNavClick('home', 'capabilities')}
            className="text-xl font-medium text-white/80 hover:text-white transition-colors"
          >
            Возможности
          </button>
          <button
            onClick={() => handleNavClick('home', 'roadmap')}
            className="text-xl font-medium text-white/80 hover:text-white transition-colors"
          >
            Дорожная карта
          </button>
          <button
            onClick={() => handleNavClick('demo')}
            className="text-2xl font-semibold text-cyan-300 hover:text-cyan-200 transition-colors flex items-center gap-2 mt-2"
          >
            <span>Демо приложения</span>
            <ArrowUpRight className="h-5 w-5" />
          </button>

          <div className="pt-8 border-t border-white/10 flex flex-col items-center gap-2 mt-4">
            <div className="liquid-glass h-12 w-12 rounded-full flex items-center justify-center text-white/90">
              <CircleUserRound className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <span className="text-sm font-light text-white/60">
              Личный кабинет пациента · R&D Demo
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
