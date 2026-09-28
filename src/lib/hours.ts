import type { hours as Hours } from '../data/site';

type Week = typeof Hours;

const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function formatTime(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  const ap = h >= 12 ? 'pm' : 'am';
  return `${h % 12 || 12}${m ? `:${String(m).padStart(2, '0')}` : ''} ${ap}`;
}

/** Current day and minute in Hamilton, whatever time zone the visitor is in. */
export function hamiltonNow(date = new Date()): { day: number; minute: number } {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Toronto',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    }).formatToParts(date);
    const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
    return {
      day: DAY_SHORT.indexOf(get('weekday')),
      minute: Number(get('hour')) * 60 + Number(get('minute')),
    };
  } catch {
    return { day: date.getDay(), minute: date.getHours() * 60 + date.getMinutes() };
  }
}

export type Status =
  | { open: true; until: string }
  | { open: false; when: string; time: string };

export function studioStatus(week: Week, now = hamiltonNow()): Status {
  const today = week[now.day];
  if (today && now.minute >= today.open && now.minute < today.close) {
    return { open: true, until: formatTime(today.close) };
  }
  for (let i = 0; i < 8; i++) {
    const d = (now.day + i) % 7;
    const slot = week[d];
    if (slot && (i > 0 || now.minute < slot.open)) {
      const when = i === 0 ? '' : i === 1 ? 'tomorrow' : DAY_SHORT[d];
      return { open: false, when, time: formatTime(slot.open) };
    }
  }
  return { open: false, when: '', time: '' };
}
