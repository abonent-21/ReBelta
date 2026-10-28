import { useState, useRef, useEffect } from 'react';
import { Send, UserCheck, Bot, Clock, AlertCircle } from 'lucide-react';
import { ChatMessage } from '../../types';

export function RehabChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'doctor',
      text: 'Здравствуйте! Я изучил видеоотчёт вашей последней тренировки. Сгибание коленного сустава выполняется стабильно, угол достиг 125°. Не было ли дискомфорта или тянущей боли в конце амплитуды?',
      time: '10:45',
    },
    {
      id: 'm-2',
      sender: 'patient',
      text: 'Добрый день, доктор! Боли не было, только лёгкое напряжение на третьем подходе.',
      time: '10:48',
    },
    {
      id: 'm-3',
      sender: 'doctor',
      text: 'Отлично, это нормальная реакция связочного аппарата. Оставляем текущую нагрузку ещё на 3 дня, затем добавим динамическое сопротивление.',
      time: '10:50',
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const newMsg: ChatMessage = {
      id: `patient-${Date.now()}`,
      sender: 'patient',
      text: trimmed,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate doctor's automated clinical response after 1.2s
    setTimeout(() => {
      const doctorReplies = [
        'Принял ваше сообщение. Обязательно сделаю пометку в вашей карте реабилитации к следующей сессии.',
        'Спасибо за оперативную обратную связь! Главное — не форсировать угол через силу, следуйте подсказкам CV-тренажёра.',
        'Отлично. Завтра оценим видеоаналитику следующего подхода. Продолжайте в том же темпе.',
      ];
      const replyText = doctorReplies[Math.floor(Math.random() * doctorReplies.length)];

      const doctorMsg: ChatMessage = {
        id: `doctor-${Date.now()}`,
        sender: 'doctor',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, doctorMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="liquid-glass-card rounded-3xl p-6 sm:p-8 flex flex-col h-[580px]">
      {/* Chat Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-10 w-10 rounded-2xl liquid-glass flex items-center justify-center text-cyan-400">
              <UserCheck className="h-5 w-5" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#06080d]" />
          </div>
          <div>
            <h4 className="text-base font-medium text-white">
              Врач-реабилитолог: И. В. Смирнов
            </h4>
            <span className="text-xs text-white/50">
              Клинический куратор программы · Онлайн
            </span>
          </div>
        </div>

        <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 hidden sm:inline-block">
          Демонстрационный чат
        </span>
      </div>

      {/* Notice Banner */}
      <div className="py-2.5 px-3.5 my-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-200 flex items-center gap-2 shrink-0">
        <AlertCircle className="h-4 w-4 shrink-0 text-cyan-400" />
        <span>
          Чат работает в демонстрационном режиме. Сообщения моделируют клиническую связь с реабилитологом.
        </span>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 py-2">
        {messages.map((msg) => {
          const isDoc = msg.sender === 'doctor';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isDoc ? 'items-start' : 'items-end'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[70%] rounded-2xl p-4 text-sm font-light leading-relaxed ${
                  isDoc
                    ? 'liquid-glass text-white/95 rounded-tl-sm'
                    : 'bg-cyan-500/20 text-white border border-cyan-400/30 rounded-tr-sm'
                }`}
              >
                <div className="text-[11px] text-white/40 mb-1 font-medium">
                  {isDoc ? 'И. В. Смирнов' : 'Вы (Пациент)'}
                </div>
                <p>{msg.text}</p>
                <div className="text-[10px] text-white/40 text-right mt-1.5 font-mono">
                  {msg.time}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-white/50 pl-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
            <span>Доктор печатает ответ...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSendMessage}
        className="pt-4 border-t border-white/10 flex items-center gap-3 shrink-0"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Напишите вопрос реабилитологу о самочувствии или технике..."
          className="flex-1 bg-white/5 border border-white/15 rounded-full px-5 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/50 transition-colors"
        />
        <button
          type="submit"
          disabled={!inputValue.trim()}
          className="liquid-glass rounded-full h-11 w-11 flex items-center justify-center text-white hover:bg-white/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
          aria-label="Отправить сообщение"
        >
          <Send className="h-4 w-4 text-cyan-300" />
        </button>
      </form>
    </div>
  );
}
