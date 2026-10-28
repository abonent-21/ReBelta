import { useState } from 'react';
import {
  Stethoscope,
  Dumbbell,
  CheckCircle2,
  Brain,
  Video,
  FileCheck,
  Sparkles,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { PlatformMode, RouteType } from '../types';

interface ArchitectureProps {
  onNavigate: (route: RouteType, hash?: string) => void;
}

export function Architecture({ onNavigate }: ArchitectureProps) {
  const [activeMode, setActiveMode] = useState<PlatformMode>('medical');

  return (
    <section id="architecture" className="relative py-24 sm:py-32 bg-[#06080d] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="text-xs sm:text-sm font-medium tracking-widest text-cyan-400 uppercase mb-3">
            Архитектура
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-[1.12]">
            Два режима — одна платформа
          </h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-white/70 font-light leading-relaxed">
            Fitness — самостоятельные домашние тренировки по программе от ИИ, Medical — восстановление по плану нейросети и врача. Режимы разрабатываются параллельно на общей технологической основе.
          </p>

          {/* Mode Switcher Buttons */}
          <div className="inline-flex p-1.5 rounded-full liquid-glass mt-8 gap-2">
            <button
              onClick={() => setActiveMode('medical')}
              className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeMode === 'medical'
                  ? 'bg-white/15 text-white shadow-md shadow-cyan-500/10 border border-white/20'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Stethoscope className="h-4 w-4 text-cyan-400" />
              <span>Режим Medical</span>
            </button>
            <button
              onClick={() => setActiveMode('fitness')}
              className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeMode === 'fitness'
                  ? 'bg-white/15 text-white shadow-md shadow-emerald-500/10 border border-white/20'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Dumbbell className="h-4 w-4 text-emerald-400" />
              <span>Режим Fitness</span>
            </button>
          </div>
        </div>

        {/* Dynamic Mode Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Card */}
          <div className="lg:col-span-7 liquid-glass-card rounded-3xl p-7 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl liquid-glass flex items-center justify-center text-cyan-400">
                    {activeMode === 'medical' ? (
                      <Stethoscope className="h-5 w-5" />
                    ) : (
                      <Dumbbell className="h-5 w-5 text-emerald-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-medium text-white">
                      {activeMode === 'medical'
                        ? 'Клиническая реабилитация'
                        : 'Самостоятельные тренировки'}
                    </h3>
                    <span className="text-xs text-white/50">
                      {activeMode === 'medical'
                        ? 'Нейросеть + врач-реабилитолог'
                        : 'Адаптивный алгоритм для дома'}
                    </span>
                  </div>
                </div>

                <span className="text-xs px-3 py-1 rounded-full border border-white/15 text-white/80 bg-white/5">
                  {activeMode === 'medical' ? 'Strict Protocol' : 'Adaptive Protocol'}
                </span>
              </div>

              <p className="text-white/80 text-base sm:text-lg font-light leading-relaxed mb-8">
                {activeMode === 'medical'
                  ? 'План восстановления составляют нейросеть и врач-реабилитолог. Приложение следит за выполнением, напоминает о занятиях и анализирует технику движений, а нейросеть передаёт врачу видеоотчёты с обратной связью от пациента — дальше программу корректирует врач.'
                  : 'Комплементарный сценарий платформы для регулярных оздоровительных тренировок. ИИ подбирает упражнения под уровень подвижности, контролирует углы в суставах и формирует историю активности без клинического назначения.'}
              </p>

              {/* Feature List */}
              <div className="space-y-4">
                {activeMode === 'medical' ? (
                  <>
                    <div className="flex items-start gap-3.5">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-white/90">
                        Нейросеть и врач совместно составляют индивидуальный план.
                      </span>
                    </div>
                    <div className="flex items-start gap-3.5">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-white/90">
                        Приложение следит за выполнением и напоминает о занятиях.
                      </span>
                    </div>
                    <div className="flex items-start gap-3.5">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-white/90">
                        CV-система анализирует технику движений в реальном времени.
                      </span>
                    </div>
                    <div className="flex items-start gap-3.5">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-white/90">
                        Нейросеть готовит врачу видеоотчёты с фидбеком от пациента.
                      </span>
                    </div>
                    <div className="flex items-start gap-3.5">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-white/90">
                        Врач изучает отчёты и корректирует программу.
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-3.5">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-white/90">
                        Подбор упражнений на гибкость, силу и подвижность суставов.
                      </span>
                    </div>
                    <div className="flex items-start gap-3.5">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-white/90">
                        Отслеживание сессий и счётчик повторений с помощью камеры устройства.
                      </span>
                    </div>
                    <div className="flex items-start gap-3.5">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-white/90">
                        Базовый анализ амплитуды и подсказки по темпу упражнений.
                      </span>
                    </div>
                    <div className="flex items-start gap-3.5">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-white/90">
                        Статистика регулярности занятий и динамика выполнения.
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-white/50">
                {activeMode === 'medical'
                  ? 'Требует назначения врача'
                  : 'Самостоятельный доступ без медицинских показаний'}
              </span>
              <button
                onClick={() => onNavigate('demo')}
                className="liquid-glass rounded-full px-5 py-2.5 text-xs font-medium text-white hover:bg-white/10 transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Проверить в демо</span>
                <ArrowRight className="h-3.5 w-3.5 text-cyan-400" />
              </button>
            </div>
          </div>

          {/* Side Highlights / Technical Foundation */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="liquid-glass-card rounded-3xl p-7 flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-xl liquid-glass flex items-center justify-center text-cyan-400">
                  <Brain className="h-4 w-4" />
                </div>
                <h4 className="text-lg font-medium text-white">Общее технологическое ядро</h4>
              </div>
              <p className="text-sm text-white/70 font-light leading-relaxed mb-5">
                Оба режима используют одну и ту же инфраструктуру компьютерного зрения (CV) для захвата координат скелета человека в 3D и расчёта кинематических углов без необходимости носимых датчиков.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-white/50 mb-1">Анализ скелета</div>
                  <div className="text-white font-medium">33 ключевые точки</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-white/50 mb-1">Частота расчёта</div>
                  <div className="text-white font-medium">До 30 FPS на устройстве</div>
                </div>
              </div>
            </div>

            <div className="liquid-glass-card rounded-3xl p-7 flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-xl liquid-glass flex items-center justify-center text-emerald-400">
                  <ShieldAlert className="h-4 w-4" />
                </div>
                <h4 className="text-lg font-medium text-white">Разделение ответственности</h4>
              </div>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                Режим Fitness не даёт медицинских заключений и не заменяет терапию. Режим Medical работает исключительно в связке с сертифицированным врачом клиники-партнёра.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
