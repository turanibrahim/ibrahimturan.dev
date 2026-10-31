const calendarValuePattern = /^(\d{4})-(\d{1,2})(?!\d)/;
const timezoneOffsetPattern = /(?:Z|[+-]\d{2}:?\d{2})$/i;

interface CalendarDate {
  year: number;
  month: number;
}

interface DurationLabels {
  year: string;
  yearPlural: string;
  month: string;
  monthPlural: string;
}

const durationLabels: Record<string, DurationLabels> = {
  en: { year: 'year', yearPlural: 'years', month: 'month', monthPlural: 'months' },
  tr: { year: 'yıl', yearPlural: 'yıl', month: 'ay', monthPlural: 'ay' },
};

const getCurrentCalendarDate = (): CalendarDate => {
  const now = new Date();

  return { year: now.getUTCFullYear(), month: now.getUTCMonth() + 1 };
};

const parseCalendarDate = (value: string): CalendarDate => {
  const calendarMatch = calendarValuePattern.exec(value);

  if (calendarMatch) {
    const calendarDate = { year: Number(calendarMatch[1]), month: Number(calendarMatch[2]) };

    if (calendarDate.month < 1 || calendarDate.month > 12) {
      throw new Error(`Unsupported date value: ${value}`);
    }

    return calendarDate;
  }

  const timestamp = new Date(value);

  if (!timezoneOffsetPattern.test(value) || Number.isNaN(timestamp.getTime())) {
    throw new Error(`Date value needs an explicit timezone: ${value}`);
  }

  return { year: timestamp.getUTCFullYear(), month: timestamp.getUTCMonth() + 1 };
};

const getDurationLabels = (locale: string): DurationLabels =>
  locale.toLowerCase().startsWith('tr') ? durationLabels.tr : durationLabels.en;

export const getCalendarYear = (value: string): number => parseCalendarDate(value).year;

export const getCurrentYear = (): number => getCurrentCalendarDate().year;

export const formatMonthYear = ({
  value,
  locale = 'en-US',
}: {
  value: string;
  locale?: string;
}): string => {
  const { year, month } = parseCalendarDate(value);

  return new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString(locale, {
    month: 'short',
    timeZone: 'UTC',
    year: 'numeric',
  });
};

export const countMonths = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate?: string;
}): number => {
  const start = parseCalendarDate(startDate);
  const end = endDate ? parseCalendarDate(endDate) : getCurrentCalendarDate();

  return (end.year - start.year) * 12 + (end.month - start.month);
};

export const formatDuration = ({
  months,
  locale = 'en-US',
}: {
  months: number;
  locale?: string;
}): string => {
  const labels = getDurationLabels(locale);
  const totalMonths = Math.max(0, months);
  const years = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;
  const parts: string[] = [];

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? labels.year : labels.yearPlural}`);
  }

  if (remainingMonths > 0 || years === 0) {
    parts.push(`${remainingMonths} ${remainingMonths === 1 ? labels.month : labels.monthPlural}`);
  }

  return parts.join(' ');
};

export const calculateDuration = ({
  startDate,
  endDate,
  locale,
}: {
  startDate: string;
  endDate?: string;
  locale?: string;
}): string => formatDuration({ months: countMonths({ startDate, endDate }), locale });
