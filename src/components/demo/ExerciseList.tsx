import { CheckCircle2, Circle, Play, ChevronRight, Activity } from 'lucide-react';
import { Exercise } from '../../types';

interface ExerciseListProps {
  exercises: Exercise[];
  selectedExerciseId: string;
  onSelectExercise: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export function ExerciseList({
  exercises,
  selectedExerciseId,
  onSelectExercise,
  onToggleComplete,
}: ExerciseListProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between pb-2">
        <h4 className="text-lg font-medium text-white">Комплекс на сегодня</h4>
        <span className="text-xs text-white/50">
          Выполнено:{' '}
          <span className="text-cyan-400 font-semibold">
            {exercises.filter((e) => e.completed).length}
          </span>{' '}
          из {exercises.length}
        </span>
      </div>

      <div className="space-y-3">
        {exercises.map((item) => {
          const isSelected = item.id === selectedExerciseId;
          return (
            <div
              key={item.id}
              onClick={() => onSelectExercise(item.id)}
              className={`rounded-2xl p-5 transition-all duration-300 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isSelected
                  ? 'liquid-glass-glow bg-cyan-950/20 shadow-lg shadow-cyan-950/30'
                  : 'liquid-glass-card hover:bg-white/5'
              }`}
            >
              <div className="flex items-start sm:items-center gap-4">
                {/* Completion Toggle Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleComplete(item.id);
                  }}
                  className="mt-0.5 sm:mt-0 text-white/40 hover:text-emerald-400 transition-colors cursor-pointer"
                  title={item.completed ? 'Отметить как невыполненное' : 'Отметить выполненным'}
                  aria-label={item.completed ? 'Отметить как невыполненное' : 'Отметить выполненным'}
                >
                  {item.completed ? (
                    <CheckCircle2 className="h-6 w-6 text-emerald-400 fill-emerald-400/20" />
                  ) : (
                    <Circle className="h-6 w-6 text-white/40 hover:text-white" />
                  )}
                </button>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h5
                      className={`text-base font-medium transition-colors ${
                        item.completed ? 'text-white/60 line-through' : 'text-white'
                      }`}
                    >
                      {item.name}
                    </h5>
                    {isSelected && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 font-medium">
                        Выбрано в тренажёре
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-white/60">
                    <span className="font-mono text-cyan-300 font-medium">
                      {item.prescription}
                    </span>
                    <span>·</span>
                    <span className="text-emerald-400/90 font-light">
                      {item.status}
                    </span>
                    <span>·</span>
                    <span>Цель: {item.targetAngle}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectExercise(item.id);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-400 text-[#06080d] font-semibold'
                      : 'liquid-glass text-white/80 hover:text-white'
                  }`}
                >
                  <Play className="h-3 w-3 fill-current" />
                  <span>{isSelected ? 'Активно' : 'Начать'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
