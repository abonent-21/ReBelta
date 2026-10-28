import { useState } from 'react';
import {
  Stethoscope,
  Dumbbell,
  CheckCircle2,
  ShieldCheck,
  ArrowLeft,
  Activity,
  MessageSquare,
  ListTodo,
  TrendingUp,
} from 'lucide-react';
import { DemoTab, Exercise, PlatformMode, RouteType } from '../../types';
import { ReBeltaLogo } from '../ReBeltaLogo';
import { CVTrainer } from './CVTrainer';
import { ExerciseList } from './ExerciseList';
import { ProgressDashboard } from './ProgressDashboard';
import { RehabChat } from './RehabChat';

interface DemoAppProps {
  onNavigate: (route: RouteType, hash?: string) => void;
}

export function DemoApp({ onNavigate }: DemoAppProps) {
  const [mode, setMode] = useState<PlatformMode>('medical');
  const [activeTab, setActiveTab] = useState<DemoTab>('exercises');

  // Initial demonstration exercise list
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: 'ex-1',
      name: 'Сгибание коленного сустава сидя',
      prescription: '3 подхода × 12',
      status: 'Утверждено врачом',
      completed: false,
      targetJoint: 'Коленный сустав',
      targetAngle: '125°',
      repsTarget: 12,
      repsCompleted: 4,
      accuracy: 94,
    },
    {
      id: 'ex-2',
      name: 'Отведение плеча в плоскости лопатки',
      prescription: '3 подхода × 10',
      status: 'Утверждено врачом',
      completed: false,
      targetJoint: 'Плечевой сустав',
      targetAngle: '90°',
      repsTarget: 10,
      repsCompleted: 0,
      accuracy: 91,
    },
    {
      id: 'ex-3',
      name: 'Удержание баланса',
      prescription: '2 подхода × 30 с',
      status: 'Утверждено врачом',
      completed: false,
      targetJoint: 'Голеностоп и корпус',
      targetAngle: 'Вертикаль 0°',
      repsTarget: 30,
      repsCompleted: 0,
      accuracy: 96,
    },
  ]);

  const [selectedExerciseId, setSelectedExerciseId] = useState<string>('ex-1');

  const selectedExercise =
    exercises.find((e) => e.id === selectedExerciseId) || exercises[0];

  const handleToggleComplete = (id: string) => {
    setExercises((prev) =>
      prev.map((e) => (e.id === id ? { ...e, completed: !e.completed } : e))
    );
  };

  const handleCompleteRep = () => {
    setExercises((prev) =>
      prev.map((e) =>
        e.id === selectedExerciseId
          ? {
              ...e,
              repsCompleted: Math.min(e.repsCompleted + 1, e.repsTarget),
              completed: e.repsCompleted + 1 >= e.repsTarget ? true : e.completed,
            }
          : e
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#06080d] text-white flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#06080d]/85 backdrop-blur-md border-b border-white/10 px-5 sm:px-8 md:px-12 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-xs font-medium cursor-pointer liquid-glass rounded-full px-3 py-1.5"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Вернуться на сайт</span>
          </button>

          <div className="flex items-center gap-2.5">
            <ReBeltaLogo className="h-6 w-6" />
            <span className="font-semibold text-lg tracking-tight">ReBelta</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 font-mono">
              App Prototype
            </span>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-2 p-1 rounded-full liquid-glass">
          <button
            onClick={() => setMode('medical')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              mode === 'medical'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Stethoscope className="h-3.5 w-3.5" />
            <span>Medical</span>
          </button>
          <button
            onClick={() => setMode('fitness')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              mode === 'fitness'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shadow-sm'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Dumbbell className="h-3.5 w-3.5" />
            <span>Fitness</span>
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-5 sm:px-8 md:px-12 py-6 sm:py-8 space-y-6">
        {/* Medical Status & Program Banner */}
        <div className="liquid-glass-card rounded-3xl p-6 sm:p-7 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1.5">
                <ShieldCheck className="h-4 w-4" />
                <span>
                  {mode === 'medical'
                    ? 'Medical · Под контролем врача'
                    : 'Fitness · Самостоятельные тренировки'}
                </span>
              </div>
              <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
                {mode === 'medical'
                  ? 'План составляют нейросеть и врач. Приложение следит за выполнением, напоминает о занятиях и анализирует технику, нейросеть передаёт врачу видеоотчёты с вашей обратной связью — дальше программу корректирует врач.'
                  : 'Адаптивный алгоритм подбирает упражнения на подвижность и выносливость, а компьютерное зрение подсчитывает повторения и следит за правильностью движения.'}
              </p>
            </div>

            {/* Validation Badge */}
            <div className="liquid-glass rounded-2xl p-4 shrink-0 flex flex-col gap-1 border border-white/10">
              <div className="text-[11px] text-white/50">Статус программы:</div>
              <div className="text-xs sm:text-sm font-medium text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>
                  {mode === 'medical'
                    ? 'Программа утверждена врачом И. В. Смирновым'
                    : 'Программа сгенерирована алгоритмом'}
                </span>
              </div>
              <div className="text-[11px] text-white/60 font-mono">
                Валидатор безопасности: <span className="text-emerald-400">Пройдено</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Application Tabs Navigation */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl liquid-glass w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setActiveTab('exercises')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'exercises'
                ? 'bg-white/15 text-white shadow-sm border border-white/20'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <ListTodo className="h-4 w-4 text-cyan-400" />
            <span>Мои упражнения</span>
          </button>

          <button
            onClick={() => setActiveTab('progress')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'progress'
                ? 'bg-white/15 text-white shadow-sm border border-white/20'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            <span>Мой прогресс</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'chat'
                ? 'bg-white/15 text-white shadow-sm border border-white/20'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <MessageSquare className="h-4 w-4 text-indigo-400" />
            <span>Чат с реабилитологом</span>
          </button>
        </div>

        {/* Tab 1: Exercises and CV Trainer */}
        {activeTab === 'exercises' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Exercise List */}
            <div className="lg:col-span-5 space-y-4">
              <ExerciseList
                exercises={exercises}
                selectedExerciseId={selectedExerciseId}
                onSelectExercise={(id) => setSelectedExerciseId(id)}
                onToggleComplete={handleToggleComplete}
              />
            </div>

            {/* Right Column: CV Trainer View */}
            <div className="lg:col-span-7">
              <CVTrainer
                exercise={selectedExercise}
                onCompleteRep={handleCompleteRep}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Progress Dashboard */}
        {activeTab === 'progress' && <ProgressDashboard />}

        {/* Tab 3: Chat with Doctor */}
        {activeTab === 'chat' && <RehabChat />}
      </main>
    </div>
  );
}
