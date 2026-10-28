import { UserCheck, Scan, MessageSquare, TrendingUp, Sparkles } from 'lucide-react';
import { RouteType } from '../types';

interface CapabilitiesProps {
  onNavigate: (route: RouteType, hash?: string) => void;
}

export function Capabilities({ onNavigate }: CapabilitiesProps) {
  const capabilities = [
    {
      id: '01',
      title: 'Наблюдение реабилитологов',
      description: 'Курс восстановления под дистанционным контролем профильного специалиста.',
      icon: UserCheck,
      details: 'Регулярная верификация видеоотчётов и персональная адаптация программы реабилитологом.',
      badge: 'Клинический куратор',
    },
    {
      id: '02',
      title: 'Компьютерное зрение',
      description: 'Отслеживание положения тела и углов в суставах через камеру устройства.',
      icon: Scan,
      details: 'Локальная обработка ключевых точек в 30 FPS без отправки сырого видео в облако.',
      badge: 'Edge CV Анализ',
    },
    {
      id: '03',
      title: 'Прямой чат с врачом',
      description: 'Обратная связь по самочувствию и корректировка нагрузок.',
      icon: MessageSquare,
      details: 'Фиксация болевых ощущений, передача заметок и оперативная связь с ведущим специалистом.',
      badge: 'Связь 1-на-1',
    },
    {
      id: '04',
      title: 'Аналитика прогресса',
      description: 'Динамика восстановления, точности техники и регулярности занятий.',
      icon: TrendingUp,
      details: 'Наглядные графики прироста амплитуды движения, аккуратности выполнения и соблюдения плана.',
      badge: 'Биометрия и отчёты',
    },
  ];

  return (
    <section id="capabilities" className="relative py-24 sm:py-32 bg-[#06080d] overflow-hidden border-t border-white/5">
      {/* Glow */}
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="text-xs sm:text-sm font-medium tracking-widest text-cyan-400 uppercase mb-3">
            Возможности
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-[1.12]">
            Что умеет приложение
          </h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-white/70 font-light leading-relaxed">
            Технологии на стыке биомеханики и искусственного интеллекта для поддержки пациента на каждом шаге домашнего восстановления.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {capabilities.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="liquid-glass-card rounded-3xl p-8 sm:p-9 flex flex-col justify-between group hover:border-white/30 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-12 w-12 rounded-2xl liquid-glass flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs text-white/50 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-medium text-white mb-3 group-hover:text-cyan-200 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-base text-white/80 font-light leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <p className="text-xs sm:text-sm text-white/50 font-light leading-relaxed">
                    {item.details}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-white/40">Модуль платформы {item.id}</span>
                  <button
                    onClick={() => onNavigate('demo')}
                    className="text-xs text-cyan-400 hover:text-cyan-200 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Смотреть в прототипе</span>
                    <Sparkles className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
