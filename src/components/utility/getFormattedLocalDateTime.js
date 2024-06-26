import moment from 'moment-timezone';

const getFormattedLocalDateTime = (confirmedDateTime) => {
  // Get user's timezone
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (confirmedDateTime && userTimezone) {
    const convertedDateTime = new Date(confirmedDateTime);

    // Options without the timeZoneName to prevent duplication
    const options = {
      timeZone: userTimezone,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    const localDateTimeString = convertedDateTime.toLocaleString('en-US', options);

    // Extract components of the date string
    const [weekday, month, day, time, period] = localDateTimeString.split(/[\s,]+/);

    // Get timezone abbreviation
    const timeZoneName = new Intl.DateTimeFormat('en-US', {
      timeZone: userTimezone,
      timeZoneName: 'short'
    }).formatToParts(convertedDateTime).find(part => part.type === 'timeZoneName').value;

    // Format the date string as desired
    const formattedDateTimeString = `${weekday.toUpperCase()}, ${month.toUpperCase()} ${day} · ${time} ${period.replace(/\./g, '')} ${timeZoneName}`;

    return formattedDateTimeString;
  }

  return null;
};

export default getFormattedLocalDateTime;
