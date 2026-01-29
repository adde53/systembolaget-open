import { useSystembolagetStatus } from '@/hooks/useSystembolagetStatus';

export function StatusDisplay() {
  const { 
    isOpen, 
    status, 
    message, 
    countdown, 
    countdownLabel, 
    currentTime, 
    currentDate,
    todayHours,
    holiday,
    isHoliday 
  } = useSystembolagetStatus();

  const statusClasses = {
    open: 'bg-success text-success-foreground',
    soon: 'bg-warning text-warning-foreground',
    closed: 'bg-closed text-closed-foreground',
  };

  const statusText = {
    open: 'JA',
    soon: 'SNART',
    closed: 'NEJ',
  };

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center gap-6 animate-fade-in w-full">
      {/* Main answer - optimized for featured snippet */}
      <div 
        className={`
          ${statusClasses[status]}
          px-12 sm:px-16 py-6 sm:py-8 rounded-2xl
          shadow-2xl
          transition-all duration-500
          ${status === 'open' ? 'animate-pulse-soft' : ''}
        `}
      >
        <p className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight">
          {statusText[status]}
        </p>
      </div>

      {/* Full answer text for SEO */}
      <p className="text-xl sm:text-2xl text-foreground font-semibold text-center max-w-lg">
        {message}
      </p>

      {/* Holiday notice */}
      {isHoliday && holiday && (
        <div className="bg-accent border border-border px-4 py-2 rounded-lg">
          <p className="text-sm text-foreground font-medium">
            🔴 Idag är det <strong>{holiday}</strong>
          </p>
        </div>
      )}

      {/* Current date and time */}
      <div className="text-center text-muted-foreground">
        <p className="text-sm capitalize">{currentDate}</p>
        <p className="text-lg font-mono font-semibold">{currentTime}</p>
      </div>

      {/* Today's hours */}
      <div className="bg-card border border-border px-6 py-3 rounded-lg">
        <p className="text-sm text-muted-foreground">
          Dagens öppettider: <span className="font-semibold text-foreground">{todayHours}</span>
        </p>
      </div>

      {/* Countdown timer */}
      <div className="flex flex-col items-center gap-2 mt-2">
        <div className="flex items-center gap-1 sm:gap-2 text-3xl sm:text-4xl font-bold text-foreground tabular-nums">
          <span className="bg-card px-3 py-2 rounded-lg shadow-sm border border-border min-w-[3rem] text-center">
            {formatTime(countdown.hours)}
          </span>
          <span className="text-muted-foreground">:</span>
          <span className="bg-card px-3 py-2 rounded-lg shadow-sm border border-border min-w-[3rem] text-center">
            {formatTime(countdown.minutes)}
          </span>
          <span className="text-muted-foreground">:</span>
          <span className="bg-card px-3 py-2 rounded-lg shadow-sm border border-border min-w-[3rem] text-center">
            {formatTime(countdown.seconds)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground font-medium">
          {countdownLabel}
        </p>
      </div>
    </div>
  );
}
