import { ReBeltaLogo } from './ReBeltaLogo';
import { RouteType } from '../types';

interface FooterProps {
  onNavigate: (route: RouteType, hash?: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="relative bg-[#040609] border-t border-white/5 py-14 sm:py-16 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/10">
          {/* Brand & Description */}
          <div className="max-w-md">
            <button
              onClick={() => onNavigate('home', 'hero')}
              className="flex items-center gap-3 cursor-pointer group text-left mb-3"
            >
              <ReBeltaLogo className="h-7 w-7 transition-transform group-hover:scale-105" />
              <span className="text-xl font-semibold tracking-tight text-white group-hover:text-cyan-200 transition-colors">
                ReBelta
              </span>
            </button>
            <p className="text-sm text-white/60 font-light leading-relaxed">
              Цифровая платформа домашней реабилитации, объединяющая искусственный интеллект, компьютерное зрение и врачебный контроль.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-sm font-medium">
            <button
              onClick={() => onNavigate('home', 'hero')}
              className="text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              О проекте
            </button>
            <button
              onClick={() => onNavigate('home', 'architecture')}
              className="text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              Архитектура
            </button>
            <button
              onClick={() => onNavigate('home', 'safety')}
              className="text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              Безопасность
            </button>
            <button
              onClick={() => onNavigate('home', 'capabilities')}
              className="text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              Возможности
            </button>
            <button
              onClick={() => onNavigate('home', 'roadmap')}
              className="text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              Дорожная карта
            </button>
            <button
              onClick={() => onNavigate('demo')}
              className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer font-semibold"
            >
              Демо приложения
            </button>
          </div>
        </div>

        {/* Status Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/40">
          <p>
            Проект находится на стадии R&amp;D и демонстрационного прототипа. Не является медицинским изделием и не заменяет консультацию врача.
          </p>
          <div className="whitespace-nowrap font-mono">
            ReBelta R&amp;D Prototype © 2026
          </div>
        </div>
      </div>
    </footer>
  );
}
