import { Database, ShieldCheck, UserCheck, Eye, ArrowRight } from 'lucide-react';

export function SafetyChain() {
  const stages = [
    {
      number: '01',
      title: 'Каталог + ИИ-ранжирование',
      description: 'Клинически проверенные упражнения, ранжированные ИИ под пациента.',
      icon: Database,
      badge: 'Базовый уровень',
      accent: 'border-white/20 text-white',
    },
    {
      number: '02',
      title: 'Независимый валидатор',
      description: 'Алгоритмическая проверка безопасности и совместимости.',
      icon: ShieldCheck,
      badge: 'Алгоритмический фильтр',
      accent: 'border-cyan-500/30 text-cyan-400',
    },
    {
      number: '03',
      title: 'Решение врача',
      description: 'Реабилитолог утверждает или корректирует программу.',
      icon: UserCheck,
      badge: 'Врачебный контроль',
      accent: 'border-indigo-500/30 text-indigo-400',
    },
    {
      number: '04',
      title: 'Выполнение дома',
      description: 'CV-контроль техники и отчёт для врача после каждой сессии.',
      icon: Eye,
      badge: 'Обратная связь',
      accent: 'border-emerald-500/30 text-emerald-400',
    },
  ];

  return (
    <section id="safety" className="relative py-24 sm:py-32 bg-[#06080d]/90 overflow-hidden border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-600/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="text-xs sm:text-sm font-medium tracking-widest text-cyan-400 uppercase mb-3">
            Безопасность
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-[1.12]">
            Цепочка безопасности в режиме Medical
          </h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-white/70 font-light leading-relaxed">
            Ни одно упражнение не попадает к пациенту без трёх уровней проверки.
          </p>
        </div>

        {/* Horizontal on Desktop / Stacked on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.number}
                className="liquid-glass-card rounded-3xl p-7 flex flex-col justify-between group hover:translate-y-[-2px] transition-all duration-300"
              >
                <div>
                  {/* Top row: Stage number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-light text-white/40 tabular-nums font-mono">
                      {stage.number}
                    </span>
                    <div className="h-10 w-10 rounded-2xl liquid-glass flex items-center justify-center text-white/90 group-hover:text-cyan-300 transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="text-xs text-white/50 mb-2 font-light">
                    {stage.badge}
                  </div>

                  <h3 className="text-lg sm:text-xl font-medium text-white mb-3">
                    {stage.title}
                  </h3>

                  <p className="text-sm text-white/70 font-light leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                {/* Bottom connector indicator for desktop sequence */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
                  <span>Этап {idx + 1} из 4</span>
                  {idx < 3 && (
                    <ArrowRight className="h-4 w-4 text-white/30 hidden lg:block" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Verification Summary Footnote */}
        <div className="mt-12 liquid-glass rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
            <p className="text-sm text-white/80 font-light">
              <strong className="font-medium text-white">Принцип нулевого риска:</strong> Если биомеханический валидатор или врач находят противопоказания, упражнение мгновенно исключается из активного плана.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
