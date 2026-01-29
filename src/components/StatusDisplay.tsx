import { useSystembolagetStatus } from '@/hooks/useSystembolagetStatus';

export function StatusDisplay() {
  const { status, message, countdown, countdownLabel, currentTime, largerStoresMayBeOpen } = useSystembolagetStatus();

  const statusClasses = {
    open: 'bg-success text-success-foreground',
    soon: 'bg-warning text-warning-foreground',
    closed: 'bg-closed text-closed-foreground',
  };

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center gap-8 animate-fade-in">
      {/* Main status badge */}
      <div 
        className={`
          ${statusClasses[status]}
          px-16 py-8 rounded-2xl
          shadow-2xl
          transition-all duration-500
          ${status === 'open' ? 'animate-pulse-soft' : ''}
        `}
      >
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tight">
          {message}
        </h1>
      </div>

      {/* Countdown timer */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 text-4xl sm:text-5xl font-bold text-foreground tabular-nums">
          <span className="bg-card px-4 py-2 rounded-lg shadow-sm border border-border">
            {formatTime(countdown.hours)}
          </span>
          <span className="text-muted-foreground">:</span>
          <span className="bg-card px-4 py-2 rounded-lg shadow-sm border border-border">
            {formatTime(countdown.minutes)}
          </span>
          <span className="text-muted-foreground">:</span>
          <span className="bg-card px-4 py-2 rounded-lg shadow-sm border border-border">
            {formatTime(countdown.seconds)}
          </span>
        </div>
        <p className="text-lg text-muted-foreground font-medium">
          {countdownLabel}
        </p>
      </div>

      {/* Larger stores notice */}
      {largerStoresMayBeOpen && (
        <div className="bg-accent/50 border border-accent px-6 py-3 rounded-lg max-w-md text-center animate-fade-in">
          <p className="text-sm text-foreground/80">
            <span className="font-semibold">Tips:</span> Större Systembolag kan fortfarande ha öppet – 
            de har ofta lite längre öppettider.
          </p>
        </div>
      )}

      {/* Current time */}
      <p className="text-sm text-muted-foreground">
        Klockan i Stockholm: <span className="font-mono font-medium">{currentTime}</span>
      </p>
    </div>
  );
}
