import { CheckCircle2, Clock, Info } from 'lucide-react';

export function Roadmap() {
  const milestones = [
    {
      id: '01',
      status: 'active',
      tag: 'Текущий этап · активно',
      title: 'R&D и интерактивный прототип',
      description: 'Проектная документация и демонстрационное приложение с моделями отслеживания положения тела пациента.',
    },
    {
      id: '02',
      status: 'planned',
      tag: 'В планах',
      title: 'Интеграция с партнёрской клиникой',
      description: 'Апробация протоколов передачи видеоотчётов и взаимодействия врачей-реабилитологов с интерфейсом.',
    },
    {
      id: '03',
      status: 'planned',
      tag: 'В планах',
      title: 'Клинические испытания',
      description: 'Научно-клиническая валидация точности оценки суставных углов и терапевтической эффективности методики.',
    },
    {
      id: '04',
      status: 'planned',
      tag: 'В планах',
      title: 'Государственная регистрация',
      description: 'Прохождение сертификации программного обеспечения в качестве медицинского изделия.',
    },
    {
      id: '05',
      status: 'planned',
      tag: 'В планах',
      title: 'Пациентский запуск',
      description: 'Масштабирование платформы для пациентов по назначениям врачей реабилитационных центров.',
    },
  ];

  return (
    <section id="roadmap" className="relative py-24 sm:py-32 bg-[#06080d] overflow-hidden border-t border-white/5">
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="text-xs sm:text-sm font-medium tracking-widest text-cyan-400 uppercase mb-3">
            Прозрачность
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-[1.12]">
            Статус и дорожная карта
          </h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-white/70 font-light leading-relaxed">
            Открытые ориентиры проекта на пути от алгоритмического R&D-прототипа до сертифицированного медицинского решения.
          </p>
        </div>

        {/* Milestones Flow */}
        <div className="space-y-4 sm:space-y-6">
          {milestones.map((item, idx) => {
            const isActive = item.status === 'active';
            return (
              <div
                key={item.id}
                className={`rounded-3xl p-6 sm:p-8 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                  isActive
                    ? 'liquid-glass-glow bg-cyan-950/20 shadow-xl shadow-cyan-950/30'
                    : 'liquid-glass-card opacity-85 hover:opacity-100'
                }`}
              >
                <div className="flex items-start sm:items-center gap-5">
                  <div
                    className={`h-11 w-11 rounded-2xl flex items-center justify-center shrink-0 ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                        : 'bg-white/5 text-white/40 border border-white/10'
                    }`}
                  >
                    {isActive ? (
                      <CheckCircle2 className="h-5 w-5 text-cyan-300" />
                    ) : (
                      <Clock className="h-5 w-5 text-white/40" />
                    )}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-1.5">
                      <span className="text-xs font-mono text-white/40">
                        Этап {item.id}
                      </span>
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-cyan-400/15 text-cyan-300 border border-cyan-400/30 font-medium'
                            : 'bg-white/5 text-white/40 border border-white/10'
                        }`}
                      >
                        {item.tag}
                      </span>
                    </div>

                    <h3
                      className={`text-lg sm:text-xl font-medium ${
                        isActive ? 'text-white' : 'text-white/90'
                      }`}
                    >
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="text-sm text-white/70 font-light mt-1.5 max-w-3xl leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="shrink-0 text-right md:pl-4">
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${
                      isActive
                        ? 'text-cyan-300 bg-cyan-400/10 border border-cyan-400/20'
                        : 'text-white/40 bg-white/5'
                    }`}
                  >
                    {isActive ? 'В процессе разработки' : 'Запланировано'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Concluding statement */}
        <div className="mt-12 liquid-glass rounded-2xl p-6 sm:p-7 flex items-start gap-4">
          <Info className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
          <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
            Параллельная разработка режимов Medical и Fitness сфокусирована на качестве и безопасности и не привязана к фиксированной дате коммерческого релиза.
          </p>
        </div>
      </div>
    </section>
  );
}
