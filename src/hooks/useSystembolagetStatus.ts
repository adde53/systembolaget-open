import { useState, useEffect } from 'react';

interface SystembolagetStatus {
  status: 'open' | 'closed' | 'soon';
  message: string;
  countdown: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  countdownLabel: string;
  currentTime: string;
  largerStoresMayBeOpen: boolean;
}

// Standard Systembolaget hours
const HOURS = {
  weekday: { open: 10, close: 19 },      // Mon-Fri
  saturday: { open: 10, close: 15 },      // Saturday
  sunday: null,                            // Closed
};

// Larger stores may have extended hours
const EXTENDED_HOURS = {
  weekday: { open: 10, close: 20 },
  saturday: { open: 10, close: 17 },
};

const SOON_THRESHOLD_MINUTES = 30;

function getStockholmTime(): Date {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Stockholm" }));
}

function getMinutesUntil(targetHour: number, targetMinute: number = 0): number {
  const now = getStockholmTime();
  const target = new Date(now);
  target.setHours(targetHour, targetMinute, 0, 0);
  
  if (target <= now) {
    target.setDate(target.getDate() + 1);
  }
  
  return Math.floor((target.getTime() - now.getTime()) / (1000 * 60));
}

function getSecondsUntil(targetHour: number, targetMinute: number = 0): number {
  const now = getStockholmTime();
  const target = new Date(now);
  target.setHours(targetHour, targetMinute, 0, 0);
  
  if (target <= now) {
    target.setDate(target.getDate() + 1);
  }
  
  return Math.floor((target.getTime() - now.getTime()) / 1000);
}

function formatCountdown(totalSeconds: number): { hours: number; minutes: number; seconds: number } {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { hours, minutes, seconds };
}

export function useSystembolagetStatus(): SystembolagetStatus {
  const [status, setStatus] = useState<SystembolagetStatus>({
    status: 'closed',
    message: 'Nej',
    countdown: { hours: 0, minutes: 0, seconds: 0 },
    countdownLabel: '',
    currentTime: '',
    largerStoresMayBeOpen: false,
  });

  useEffect(() => {
    const updateStatus = () => {
      const now = getStockholmTime();
      const day = now.getDay(); // 0 = Sunday
      const hour = now.getHours();
      const minute = now.getMinutes();
      const currentMinutes = hour * 60 + minute;

      const timeString = now.toLocaleTimeString('sv-SE', { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZone: 'Europe/Stockholm'
      });

      // Sunday - always closed
      if (day === 0) {
        const secondsUntilMondayOpen = getSecondsUntil(10, 0);
        // Adjust for Monday
        const adjustedSeconds = secondsUntilMondayOpen + (24 - hour) * 3600 - minute * 60;
        
        setStatus({
          status: 'closed',
          message: 'Nej',
          countdown: formatCountdown(adjustedSeconds > 0 ? adjustedSeconds : secondsUntilMondayOpen),
          countdownLabel: 'Öppnar på måndag kl 10:00',
          currentTime: timeString,
          largerStoresMayBeOpen: false,
        });
        return;
      }

      const isSaturday = day === 6;
      const todayHours = isSaturday ? HOURS.saturday : HOURS.weekday;
      const extendedHours = isSaturday ? EXTENDED_HOURS.saturday : EXTENDED_HOURS.weekday;
      
      if (!todayHours) return;

      const openMinutes = todayHours.open * 60;
      const closeMinutes = todayHours.close * 60;
      const extendedCloseMinutes = extendedHours.close * 60;

      // Check if currently open (standard hours)
      if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
        const secondsUntilClose = getSecondsUntil(todayHours.close, 0);
        setStatus({
          status: 'open',
          message: 'Ja!',
          countdown: formatCountdown(secondsUntilClose),
          countdownLabel: `Stänger kl ${todayHours.close}:00`,
          currentTime: timeString,
          largerStoresMayBeOpen: false,
        });
        return;
      }

      // Check if opening soon (before opening)
      if (currentMinutes < openMinutes) {
        const minutesUntilOpen = openMinutes - currentMinutes;
        const secondsUntilOpen = getSecondsUntil(todayHours.open, 0);
        
        if (minutesUntilOpen <= SOON_THRESHOLD_MINUTES) {
          setStatus({
            status: 'soon',
            message: 'Snart!',
            countdown: formatCountdown(secondsUntilOpen),
            countdownLabel: `Öppnar kl ${todayHours.open}:00`,
            currentTime: timeString,
            largerStoresMayBeOpen: false,
          });
        } else {
          setStatus({
            status: 'closed',
            message: 'Nej',
            countdown: formatCountdown(secondsUntilOpen),
            countdownLabel: `Öppnar kl ${todayHours.open}:00`,
            currentTime: timeString,
            largerStoresMayBeOpen: false,
          });
        }
        return;
      }

      // After standard closing time
      if (currentMinutes >= closeMinutes) {
        // Check if larger stores might still be open
        const largerStoresMayBeOpen = currentMinutes < extendedCloseMinutes;
        
        // Calculate next opening
        let nextOpenLabel = '';
        let secondsUntilNextOpen = 0;

        if (isSaturday) {
          // Next opening is Monday
          nextOpenLabel = 'Öppnar på måndag kl 10:00';
          // Calculate seconds until Monday 10:00
          const hoursUntilMidnight = 24 - hour;
          const sundayHours = 24;
          secondsUntilNextOpen = (hoursUntilMidnight + sundayHours + 10) * 3600 - minute * 60;
        } else if (day === 5) {
          // Friday after closing, next is Saturday
          nextOpenLabel = 'Öppnar imorgon kl 10:00';
          secondsUntilNextOpen = (24 - hour + 10) * 3600 - minute * 60;
        } else {
          // Weekday, next opening is tomorrow
          nextOpenLabel = 'Öppnar imorgon kl 10:00';
          secondsUntilNextOpen = (24 - hour + 10) * 3600 - minute * 60;
        }

        setStatus({
          status: 'closed',
          message: 'Nej',
          countdown: formatCountdown(secondsUntilNextOpen),
          countdownLabel: nextOpenLabel,
          currentTime: timeString,
          largerStoresMayBeOpen,
        });
      }
    };

    updateStatus();
    const interval = setInterval(updateStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  return status;
}
