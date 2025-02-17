const getTimeNotation = (isoDate: string) => {
  const date = new Date(isoDate).getTime();
  const now = new Date().getTime();
  const diffInSeconds = Math.floor((now - date) / 1000);

  const oneYearInSeconds = 365 * 24 * 60 * 60;
  if (Math.floor(diffInSeconds / oneYearInSeconds) >= 1) {
    return isoDate.slice(0, 10);
  }

  const intervals = {
    month: 30 * 24 * 60 * 60,
    week: 7 * 24 * 60 * 60,
    day: 24 * 60 * 60,
    hour: 60 * 60,
    minute: 60,
    second: 1,
  };

  for (const [unit, seconds] of Object.entries(intervals)) {
    const count = Math.floor(diffInSeconds / seconds);
    if (count >= 1) {
      return `${count} ${unit}${count > 1 ? 's' : ''}`;
    }
  }
  return 'a second ago';
};

export default getTimeNotation;
