import { ArrowRight, ShieldCheck } from 'lucide-react';
import { RouteType } from '../types';

interface HeroProps {
  onNavigate: (route: RouteType, hash?: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const avatars = [
    'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=100',
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#06080d]"
    >
      {/* Background Video with absolute inset-0, object-cover, playsInline, autoplay, loop, muted */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60 scale-105 transition-transform duration-1000"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%2306080d'/%3E%3C/svg%3E"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260715_082433_69699cf8-444b-4484-93cc-053e57896dfd.mp4"
            type="video/mp4"
          />
        </video>
        {/* Measured scrim gradients for accessible contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#06080d]/80 via-[#06080d]/50 to-[#06080d]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06080d]/90 via-[#06080d]/40 to-transparent" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 pt-32 sm:pt-36 md:pt-40 pb-12 flex-1 flex flex-col justify-between">
        {/* Top block */}
        <div className="max-w-3xl">
          {/* Badge: Liquid Glass Pill with 4 overlapping avatars */}
          <div className="liquid-glass rounded-full inline-flex items-center gap-2.5 sm:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 mb-5 sm:mb-6 cursor-default">
            <div className="flex -space-x-2">
              {avatars.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt="ReBelta R&D Team"
                  className="h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 border-white/20 object-cover"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-light text-white/90 tracking-wide">
              Стадия проекта: R&D и демонстрационный прототип
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.08] text-white tracking-[-0.04em] text-balance">
            Персонализированная домашняя реабилитация под контролем врача и искусственного интеллекта
          </h1>

          {/* Supporting Description */}
          <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg font-light text-white/80 max-w-2xl leading-relaxed">
            Инновационный проект, объединяющий компьютерное зрение для анализа движений, многоуровневую проверку безопасности ИИ и прямую связь с врачом-реабилитологом.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 mt-8 sm:mt-10">
            {/* Primary CTA */}
            <button
              onClick={() => onNavigate('demo')}
              className="liquid-glass rounded-full px-7 py-3.5 sm:px-8 sm:py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10 inline-flex items-center gap-2.5 cursor-pointer shadow-lg group focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <span>Открыть демо приложения</span>
              <ArrowRight className="h-4 w-4 text-cyan-300 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={() => onNavigate('home', 'safety')}
              className="liquid-glass rounded-full px-6 py-3.5 sm:px-7 sm:py-4 text-sm font-normal text-white/80 hover:text-white transition-all duration-300 hover:bg-white/5 inline-flex items-center gap-2 cursor-pointer focus:outline-none"
            >
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Как устроена безопасность</span>
            </button>
          </div>
        </div>

        {/* Bottom stats block */}
        <div className="flex items-end gap-6 sm:gap-12 md:gap-16 pt-12 sm:pt-16 border-t border-white/5 mt-10">
          {/* Stat 1: 9-dot triangular pattern */}
          <div className="flex items-center gap-3.5 group">
            {/* 20x20 box with 9 absolutely positioned 2.5px white/60 squares */}
            <div className="relative w-5 h-5 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
              {/* Row 1: 1 dot */}
              <span className="absolute w-[2.5px] h-[2.5px] bg-white/70 rounded-[0.5px] top-[1px] left-[8.75px]" />
              {/* Row 2: 2 dots */}
              <span className="absolute w-[2.5px] h-[2.5px] bg-white/70 rounded-[0.5px] top-[5.5px] left-[5px]" />
              <span className="absolute w-[2.5px] h-[2.5px] bg-white/70 rounded-[0.5px] top-[5.5px] left-[12.5px]" />
              {/* Row 3: 3 dots */}
              <span className="absolute w-[2.5px] h-[2.5px] bg-white/70 rounded-[0.5px] top-[10px] left-[1.5px]" />
              <span className="absolute w-[2.5px] h-[2.5px] bg-white/70 rounded-[0.5px] top-[10px] left-[8.75px]" />
              <span className="absolute w-[2.5px] h-[2.5px] bg-white/70 rounded-[0.5px] top-[10px] left-[16px]" />
              {/* Row 4: 3 dots base */}
              <span className="absolute w-[2.5px] h-[2.5px] bg-white/70 rounded-[0.5px] top-[14.5px] left-[5px]" />
              <span className="absolute w-[2.5px] h-[2.5px] bg-white/70 rounded-[0.5px] top-[14.5px] left-[8.75px]" />
              <span className="absolute w-[2.5px] h-[2.5px] bg-white/70 rounded-[0.5px] top-[14.5px] left-[12.5px]" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-normal text-white tracking-tight tabular-nums">
                2 Режима
              </div>
              <div className="text-xs sm:text-sm font-light text-white/60">
                Medical &amp; Fitness
              </div>
            </div>
          </div>

          {/* Stat 2: 3x3 checkerboard grid icon */}
          <div className="flex items-center gap-3.5 group">
            {/* 3x3 grid icon of 4px rounded cells alternating bg-white/60 and bg-white/0 */}
            <div className="grid grid-cols-3 gap-[2.5px] w-5 h-5 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity p-[1px]">
              <span className="w-1 h-1 rounded-[1px] bg-white/70" />
              <span className="w-1 h-1 rounded-[1px] bg-transparent" />
              <span className="w-1 h-1 rounded-[1px] bg-white/70" />
              <span className="w-1 h-1 rounded-[1px] bg-transparent" />
              <span className="w-1 h-1 rounded-[1px] bg-white/70" />
              <span className="w-1 h-1 rounded-[1px] bg-transparent" />
              <span className="w-1 h-1 rounded-[1px] bg-white/70" />
              <span className="w-1 h-1 rounded-[1px] bg-transparent" />
              <span className="w-1 h-1 rounded-[1px] bg-white/70" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-normal text-white tracking-tight tabular-nums">
                4 Этапа
              </div>
              <div className="text-xs sm:text-sm font-light text-white/60">
                Цепочка безопасности
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
