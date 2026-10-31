const calendarValuePattern = /^(\d{4})-(\d{1,2})(?!\d)/;
const timezoneOffsetPattern = /(?:Z|[+-]\d{2}:?\d{2})$/i;

interface CalendarDate {
  year: number;
  month: number;
}

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

export const getCalendarYear = (value: string): number => parseCalendarDate(value).year;

export const getCurrentYear = (): number => new Date().getUTCFullYear();

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
