import { useState } from 'react';
import { Activity, Calendar, CheckCircle2, ChevronRight, TrendingUp, Award, Clock } from 'lucide-react';
import { SessionHistoryItem } from '../../types';

export function ProgressDashboard() {
  const [history] = useState<SessionHistoryItem[]>([
    {
      id: 's-1',
      date: 'Сегодня, 10:30',
      exerciseName: 'Сгибание коленного сустава сидя',
      reps: '3 × 12',
      accuracy: 94,
      smoothness: 91,
      status: 'passed',
      notes: 'Отличная амплитуда, темп стабильный.',
    },
    {
      id: 's-2',
      date: 'Вчера, 17:15',
      exerciseName: 'Отведение плеча в плоскости лопатки',
      reps: '3 × 10',
      accuracy: 92,
      smoothness: 88,
      status: 'passed',
      notes: 'Небольшое отклонение корпуса на последних повторах.',
    },
    {
      id: 's-3',
      date: '26 октября, 11:00',
      exerciseName: 'Удержание баланса',
      reps: '2 × 30 с',
      accuracy: 96,
      smoothness: 94,
      status: 'passed',
      notes: 'Баланс удержан без потери опоры.',
    },
    {
      id: 's-4',
      date: '25 октября, 10:45',
      exerciseName: 'Сгибание коленного сустава сидя',
      reps: '3 × 12',
      accuracy: 89,
      smoothness: 86,
      status: 'passed',
      notes: 'Угол 122° зафиксирован в отчёте врача.',
    },
  ]);

  // Chart metrics for knee flexion angle recovery over 4 weeks
  const weeklyMobility = [
    { week: 'Нед 1', angle: 95, target: 90 },
    { week: 'Нед 2', angle: 108, target: 105 },
    { week: 'Нед 3', angle: 118, target: 115 },
    { week: 'Нед 4 (тек.)', angle: 125, target: 125 },
  ];

  return (
    <div className="space-y-8">
      {/* Disclaimer */}
      <div className="p-4 rounded-2xl liquid-glass border border-cyan-500/20 text-xs text-white/70 flex items-center justify-between">
        <span>
          Данные прогресса приведены в качестве демонстрационного примера аналитического модуля ReBelta.
        </span>
        <span className="font-mono text-cyan-400">Синтетический профиль</span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="liquid-glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3 text-white/50 text-xs">
            <span>Выполнено сессий</span>
            <Calendar className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-medium text-white tabular-nums">
            14 <span className="text-sm font-normal text-white/50">/ 20</span>
          </div>
          <div className="mt-2 text-xs text-emerald-400">
            70% от назначенного курса
          </div>
        </div>

        <div className="liquid-glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3 text-white/50 text-xs">
            <span>Точность движений</span>
            <Award className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-medium text-white tabular-nums">
            93.5%
          </div>
          <div className="mt-2 text-xs text-white/60">
            +4.2% по сравнению с 1-й неделей
          </div>
        </div>

        <div className="liquid-glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3 text-white/50 text-xs">
            <span>Регулярность занятий</span>
            <Clock className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-medium text-white tabular-nums">
            5.2 <span className="text-sm font-normal text-white/50">дней/нед</span>
          </div>
          <div className="mt-2 text-xs text-cyan-300">
            Соответствует назначению врача
          </div>
        </div>

        <div className="liquid-glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3 text-white/50 text-xs">
            <span>Динамика угла (колено)</span>
            <TrendingUp className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-medium text-white tabular-nums">
            125° <span className="text-sm font-normal text-white/50">/ 130°</span>
          </div>
          <div className="mt-2 text-xs text-emerald-400">
            Близко к норме движения
          </div>
        </div>
      </div>

      {/* Mobility Progress Chart */}
      <div className="liquid-glass-card rounded-3xl p-7">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h4 className="text-lg font-medium text-white">
              Динамика суставной подвижности (угол сгибания)
            </h4>
            <p className="text-xs text-white/50 mt-1">
              Сравнение фактических показателей амплитуды движения с клинической целью
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-cyan-400" />
              <span className="text-white/70">Фактический угол</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-white/20" />
              <span className="text-white/70">Цель программы</span>
            </div>
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="space-y-4 pt-2">
          {weeklyMobility.map((item) => (
            <div key={item.week} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/80 font-medium">{item.week}</span>
                <span className="text-cyan-300 font-mono tabular-nums font-semibold">
                  {item.angle}° / 130° max
                </span>
              </div>
              <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden relative">
                {/* Target line mark */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white/40 z-10"
                  style={{ left: `${(item.target / 130) * 100}%` }}
                />
                {/* Current progress fill */}
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-700"
                  style={{ width: `${(item.angle / 130) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Session History List */}
      <div className="liquid-glass-card rounded-3xl p-7">
        <h4 className="text-lg font-medium text-white mb-4">
          История последних сессий
        </h4>
        <div className="divide-y divide-white/10">
          {history.map((session) => (
            <div
              key={session.id}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 first:pt-0 last:pb-0"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-white">
                    {session.exerciseName}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    Пройдено
                  </span>
                </div>
                <div className="text-xs text-white/50 flex flex-wrap items-center gap-3">
                  <span>{session.date}</span>
                  <span>·</span>
                  <span>Объём: {session.reps}</span>
                  <span>·</span>
                  <span className="italic text-white/70">{session.notes}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono shrink-0">
                <div className="text-right">
                  <div className="text-white/40 text-[10px]">Точность</div>
                  <div className="text-emerald-400 font-semibold">{session.accuracy}%</div>
                </div>
                <div className="text-right">
                  <div className="text-white/40 text-[10px]">Плавность</div>
                  <div className="text-cyan-300 font-semibold">{session.smoothness}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
