import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Camera, CameraOff, AlertCircle, CheckCircle, Eye, Activity } from 'lucide-react';
import { Exercise } from '../../types';

interface CVTrainerProps {
  exercise: Exercise;
  onCompleteRep: () => void;
}

export function CVTrainer({ exercise, onCompleteRep }: CVTrainerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Dynamic simulation values
  const [angle, setAngle] = useState<number>(125);
  const [repCount, setRepCount] = useState<number>(exercise.repsCompleted || 4);
  const [feedback, setFeedback] = useState<string>('Держите спину ровно, темп оптимальный');
  const [smoothness, setSmoothness] = useState<number>(90);
  const [accuracy, setAccuracy] = useState<number>(94);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Biomechanical oscillation effect when playing
  useEffect(() => {
    if (!isPlaying) return;

    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % 60;
      // Oscillate angle between 85 and 130
      const sinVal = Math.sin((step / 60) * Math.PI * 2);
      const calculatedAngle = Math.round(107 + sinVal * 20); // ~87° to 127°
      setAngle(calculatedAngle);

      // Rep counting when reaching peak extension
      if (step === 30) {
        setRepCount((prev) => {
          const next = prev + 1;
          onCompleteRep();
          return next;
        });
      }

      // Dynamic feedback based on motion phase
      if (calculatedAngle > 120) {
        setFeedback('Целевой угол достигнут, зафиксируйте на 1 секунду');
        setAccuracy(95);
      } else if (calculatedAngle < 95) {
        setFeedback('Плавное возвращение в исходную позицию');
        setAccuracy(93);
      } else {
        setFeedback('Держите спину ровно, темп оптимальный');
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, onCompleteRep]);

  // Handle webcam start / stop
  const toggleCamera = async () => {
    if (cameraActive) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setCameraActive(false);
      setCameraError(null);
    } else {
      setCameraError(null);
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Ваш браузер не поддерживает доступ к веб-камере');
        }
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
          audio: false,
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
        setCameraActive(true);
      } catch (err: unknown) {
        console.error('Camera access error:', err);
        setCameraError(
          err instanceof Error
            ? err.message
            : 'Не удалось получить доступ к веб-камере. Проверьте разрешения в браузере.'
        );
        setCameraActive(false);
      }
    }
  };

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="liquid-glass-card rounded-3xl p-6 sm:p-8 flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="text-xs text-white/50 mb-1">
            Демо тренажёра с CV-анализом
          </div>
          <h3 className="text-xl sm:text-2xl font-medium text-white flex items-center gap-2">
            <span>{exercise.name}</span>
            <span className="text-xs font-normal px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              {exercise.prescription}
            </span>
          </h3>
        </div>

        {/* Live Status indicator */}
        <div className="flex items-center gap-3">
          <div className="liquid-glass rounded-full px-3 py-1 flex items-center gap-2 text-xs font-mono text-cyan-300">
            <span
              className={`w-2 h-2 rounded-full ${
                isPlaying ? 'bg-cyan-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            <span>{isPlaying ? 'LIVE · 30 fps' : 'PAUSED'}</span>
          </div>

          <button
            onClick={toggleCamera}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              cameraActive
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'liquid-glass text-white/80 hover:text-white'
            }`}
          >
            {cameraActive ? (
              <>
                <CameraOff className="h-3.5 w-3.5" />
                <span>Остановить камеру</span>
              </>
            ) : (
              <>
                <Camera className="h-3.5 w-3.5 text-cyan-400" />
                <span>Включить камеру (опционально)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {cameraError && (
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 text-amber-400" />
          <span>{cameraError} — продолжается моделирование на синтетических данных.</span>
        </div>
      )}

      {/* Main Viewport & Overlay */}
      <div className="relative aspect-video sm:h-[380px] w-full rounded-2xl overflow-hidden bg-[#070b12] border border-white/10 flex items-center justify-center">
        {/* Real video if camera turned on */}
        <video
          ref={videoRef}
          playsInline
          muted
          className={`absolute inset-0 w-full h-full object-cover transform -scale-x-100 transition-opacity duration-300 ${
            cameraActive ? 'opacity-70' : 'hidden'
          }`}
        />

        {/* Biomechanical Wireframe Animation Background if camera off */}
        {!cameraActive && (
          <div className="absolute inset-0 flex items-center justify-center opacity-90">
            {/* Grid backdrop */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.4) 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* SVG Biomechanical articulated skeleton */}
            <svg
              className="w-full h-full max-w-md max-h-[320px]"
              viewBox="0 0 400 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Torso & spine */}
              <circle cx="200" cy="50" r="14" stroke="#38BDF8" strokeWidth="2.5" fill="#0E2F44" />
              <line x1="200" y1="64" x2="200" y2="150" stroke="#38BDF8" strokeWidth="3" />
              
              {/* Shoulders */}
              <line x1="160" y1="85" x2="240" y2="85" stroke="#38BDF8" strokeWidth="2.5" />
              
              {/* Arms */}
              <line x1="160" y1="85" x2="145" y2="130" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="145" y1="130" x2="155" y2="165" stroke="#38BDF8" strokeWidth="2" />
              <line x1="240" y1="85" x2="255" y2="130" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="255" y1="130" x2="245" y2="165" stroke="#38BDF8" strokeWidth="2" />

              {/* Pelvis / Hip joint */}
              <circle cx="200" cy="150" r="6" fill="#38BDF8" />
              <line x1="180" y1="150" x2="220" y2="150" stroke="#38BDF8" strokeWidth="3" />

              {/* Left Leg (static sitting) */}
              <line x1="180" y1="150" x2="170" y2="210" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" />
              <line x1="170" y1="210" x2="165" y2="270" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" />

              {/* Right Leg (Target joint flexion/extension dynamically calculated) */}
              {/* Thigh: from hip (220, 150) to Knee (260, 190) */}
              <line x1="220" y1="150" x2="260" y2="190" stroke="#38BDF8" strokeWidth="3.5" />
              
              {/* Knee joint circle */}
              <circle cx="260" cy="190" r="8" fill="#0284C7" stroke="#38BDF8" strokeWidth="2" />
              
              {/* Shin based on angle: knee is at (260, 190), shin length ~75px */}
              {(() => {
                const rad = ((angle - 40) * Math.PI) / 180;
                const shinX = 260 + Math.sin(rad) * 75;
                const shinY = 190 + Math.cos(rad) * 75;
                return (
                  <>
                    <line
                      x1="260"
                      y1="190"
                      x2={shinX}
                      y2={shinY}
                      stroke="#22D3EE"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    {/* Ankle joint */}
                    <circle cx={shinX} cy={shinY} r="6" fill="#22D3EE" />
                    {/* Foot */}
                    <line
                      x1={shinX}
                      y1={shinY}
                      x2={shinX + 20}
                      y2={shinY + 5}
                      stroke="#22D3EE"
                      strokeWidth="2.5"
                    />

                    {/* Joint Angle Arc & Callout */}
                    <path
                      d={`M 260 215 A 25 25 0 0 1 ${260 + Math.sin(rad * 0.5) * 25} ${
                        190 + Math.cos(rad * 0.5) * 25
                      }`}
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="2"
                    />
                  </>
                );
              })()}
            </svg>
          </div>
        )}

        {/* Real-time CV HUD Overlays */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          <div className="liquid-glass rounded-xl px-3 py-1.5 backdrop-blur-md flex items-center gap-2">
            <Activity className="h-4 w-4 text-cyan-400" />
            <span className="text-xs text-white/70">Суставной угол:</span>
            <span className="text-sm font-semibold text-white font-mono tabular-nums">
              {angle}°
            </span>
          </div>

          <div className="liquid-glass rounded-xl px-3 py-1.5 backdrop-blur-md flex items-center gap-2">
            <span className="text-xs text-white/70">Повторения:</span>
            <span className="text-sm font-semibold text-cyan-300 font-mono tabular-nums">
              {repCount} / 12
            </span>
          </div>
        </div>

        <div className="absolute top-4 right-4 flex flex-col items-end gap-2 z-10">
          <div className="liquid-glass rounded-xl px-3 py-1.5 backdrop-blur-md text-right">
            <div className="text-[11px] text-white/50">Точность техники</div>
            <div className="text-sm font-semibold text-emerald-400 font-mono tabular-nums">
              {accuracy}%
            </div>
          </div>
          <div className="liquid-glass rounded-xl px-3 py-1.5 backdrop-blur-md text-right">
            <div className="text-[11px] text-white/50">Плавность</div>
            <div className="text-sm font-semibold text-cyan-300 font-mono tabular-nums">
              {smoothness}%
            </div>
          </div>
        </div>

        {/* Live Coach Feedback Prompt Banner */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="liquid-glass rounded-xl px-4 py-2.5 backdrop-blur-lg flex items-center gap-3 border border-white/10">
            <div className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs sm:text-sm font-medium text-white/90">
              {feedback}
            </span>
          </div>
        </div>
      </div>

      {/* Control bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="liquid-glass rounded-full px-5 py-2.5 text-xs font-medium text-white hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer shadow-md"
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4 text-amber-400" />
                <span>Пауза</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4 text-emerald-400" />
                <span>Продолжить</span>
              </>
            )}
          </button>

          <button
            onClick={() => setRepCount(0)}
            className="liquid-glass rounded-full px-4 py-2.5 text-xs text-white/70 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Сбросить счётчик повторов"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Сброс</span>
          </button>
        </div>

        <div className="text-xs text-white/40 flex items-center gap-2">
          <Eye className="h-3.5 w-3.5 text-cyan-400" />
          <span>Демонстрационная модель биомеханики. Не является медицинским диагнозом.</span>
        </div>
      </div>
    </div>
  );
}
