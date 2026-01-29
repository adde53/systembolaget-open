import { useState, useEffect } from 'react';
import { isSwedishHoliday } from '@/lib/swedishHolidays';

export interface SystembolagetStatus {
  isOpen: boolean;
  status: 'open' | 'closed' | 'soon';
  message: string;
  countdown: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  countdownLabel: string;
  currentTime: string;
  currentDate: string;
  dayName: string;
  todayHours: string;
  holiday: string | null;
  isHoliday: boolean;
}

// Standard Systembolaget hours
const HOURS = {
  weekday: { open: 10, close: 19 },
  saturday: { open: 10, close: 15 },
  sunday: null,
};

const DAY_NAMES = ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'];
const SOON_THRESHOLD_MINUTES = 30;

function getStockholmTime(): Date {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Stockholm" }));
}

function formatCountdown(totalSeconds: number): { hours: number; minutes: number; seconds: number } {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { hours, minutes, seconds };
}

export function useSystembolagetStatus(): SystembolagetStatus {
  const [status, setStatus] = useState<SystembolagetStatus>({
    isOpen: false,
    status: 'closed',
    message: 'Nej, Systembolaget är stängt just nu.',
    countdown: { hours: 0, minutes: 0, seconds: 0 },
    countdownLabel: '',
    currentTime: '',
    currentDate: '',
    dayName: '',
    todayHours: '',
    holiday: null,
    isHoliday: false,
  });

  useEffect(() => {
    const updateStatus = () => {
      const now = getStockholmTime();
      const day = now.getDay();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const second = now.getSeconds();
      const currentMinutes = hour * 60 + minute;

      const timeString = now.toLocaleTimeString('sv-SE', { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZone: 'Europe/Stockholm'
      });

      const dateString = now.toLocaleDateString('sv-SE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Europe/Stockholm'
      });

      const dayName = DAY_NAMES[day];
      
      // Check for holiday
      const holiday = isSwedishHoliday(now);
      
      // Calculate seconds until a target time
      const getSecondsUntil = (targetHour: number, targetMin: number = 0, daysAhead: number = 0): number => {
        const target = new Date(now);
        target.setDate(target.getDate() + daysAhead);
        target.setHours(targetHour, targetMin, 0, 0);
        return Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));
      };

      // Holiday - closed all day
      if (holiday && holiday.closed) {
        const nextOpenDay = getNextOpenDay(now);
        setStatus({
          isOpen: false,
          status: 'closed',
          message: 'Nej, Systembolaget är stängt just nu.',
          countdown: formatCountdown(nextOpenDay.seconds),
          countdownLabel: nextOpenDay.label,
          currentTime: timeString,
          currentDate: dateString,
          dayName,
          todayHours: 'Stängt (helgdag)',
          holiday: holiday.name,
          isHoliday: true,
        });
        return;
      }

      // Sunday - always closed
      if (day === 0) {
        const secondsUntilMonday = getSecondsUntil(10, 0, 1);
        setStatus({
          isOpen: false,
          status: 'closed',
          message: 'Nej, Systembolaget är stängt just nu.',
          countdown: formatCountdown(secondsUntilMonday),
          countdownLabel: 'Öppnar imorgon kl 10:00',
          currentTime: timeString,
          currentDate: dateString,
          dayName,
          todayHours: 'Stängt',
          holiday: null,
          isHoliday: false,
        });
        return;
      }

      const isSaturday = day === 6;
      const todayHours = isSaturday ? HOURS.saturday : HOURS.weekday;
      
      if (!todayHours) return;

      const openMinutes = todayHours.open * 60;
      const closeMinutes = todayHours.close * 60;
      const todayHoursStr = `${todayHours.open}:00 – ${todayHours.close}:00`;

      // Currently open
      if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
        const secondsUntilClose = getSecondsUntil(todayHours.close, 0);
        setStatus({
          isOpen: true,
          status: 'open',
          message: 'Ja, Systembolaget är öppet just nu.',
          countdown: formatCountdown(secondsUntilClose),
          countdownLabel: `Stänger kl ${todayHours.close}:00`,
          currentTime: timeString,
          currentDate: dateString,
          dayName,
          todayHours: todayHoursStr,
          holiday: null,
          isHoliday: false,
        });
        return;
      }

      // Before opening
      if (currentMinutes < openMinutes) {
        const minutesUntilOpen = openMinutes - currentMinutes;
        const secondsUntilOpen = getSecondsUntil(todayHours.open, 0);
        
        if (minutesUntilOpen <= SOON_THRESHOLD_MINUTES) {
          setStatus({
            isOpen: false,
            status: 'soon',
            message: 'Systembolaget öppnar snart.',
            countdown: formatCountdown(secondsUntilOpen),
            countdownLabel: `Öppnar kl ${todayHours.open}:00`,
            currentTime: timeString,
            currentDate: dateString,
            dayName,
            todayHours: todayHoursStr,
            holiday: null,
            isHoliday: false,
          });
        } else {
          setStatus({
            isOpen: false,
            status: 'closed',
            message: 'Nej, Systembolaget är stängt just nu.',
            countdown: formatCountdown(secondsUntilOpen),
            countdownLabel: `Öppnar kl ${todayHours.open}:00`,
            currentTime: timeString,
            currentDate: dateString,
            dayName,
            todayHours: todayHoursStr,
            holiday: null,
            isHoliday: false,
          });
        }
        return;
      }

      // After closing
      const nextOpenDay = getNextOpenDay(now);
      setStatus({
        isOpen: false,
        status: 'closed',
        message: 'Nej, Systembolaget är stängt just nu.',
        countdown: formatCountdown(nextOpenDay.seconds),
        countdownLabel: nextOpenDay.label,
        currentTime: timeString,
        currentDate: dateString,
        dayName,
        todayHours: todayHoursStr,
        holiday: null,
        isHoliday: false,
      });
    };

    updateStatus();
    const interval = setInterval(updateStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  return status;
}

function getNextOpenDay(now: Date): { seconds: number; label: string } {
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();
  
  let daysUntilOpen = 1;
  let nextDayName = '';
  
  if (day === 6) {
    // Saturday after closing -> Monday
    daysUntilOpen = 2;
    nextDayName = 'måndag';
  } else if (day === 0) {
    // Sunday -> Monday
    daysUntilOpen = 1;
    nextDayName = 'måndag';
  } else if (day === 5) {
    // Friday after closing -> Saturday (if not closed)
    daysUntilOpen = 1;
    nextDayName = 'lördag';
  } else {
    nextDayName = 'imorgon';
  }

  const target = new Date(now);
  target.setDate(target.getDate() + daysUntilOpen);
  target.setHours(10, 0, 0, 0);
  
  // Check if next day is a holiday
  const holiday = isSwedishHoliday(target);
  if (holiday && holiday.closed) {
    // Skip to next non-holiday weekday
    for (let i = 1; i <= 7; i++) {
      const checkDate = new Date(target);
      checkDate.setDate(checkDate.getDate() + i);
      const checkHoliday = isSwedishHoliday(checkDate);
      const checkDay = checkDate.getDay();
      
      if (checkDay !== 0 && (!checkHoliday || !checkHoliday.closed)) {
        target.setDate(checkDate.getDate());
        nextDayName = DAY_NAMES[checkDay];
        break;
      }
    }
  }
  
  const seconds = Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));
  const label = nextDayName === 'imorgon' 
    ? 'Öppnar imorgon kl 10:00'
    : `Öppnar på ${nextDayName} kl 10:00`;
  
  return { seconds, label };
}

