import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

const TimeConvertor = ({ confirmedDateTime }) => {
	const [userTimezone, setUserTimezone] = useState(null);
	const [localDateTime, setLocalDateTime] = useState(null);

	useEffect(() => {
		// Get user's timezone
		const getUserTimezone = () => {
			const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
			setUserTimezone(userTimezone);
		};

		getUserTimezone();
	}, []);

	useEffect(() => {
		// Convert UTC time to user's timezone
		if (confirmedDateTime && userTimezone) {
			const convertedDateTime = new Date(confirmedDateTime);
			const options = {
				timeZone: userTimezone,
				hour12: true,
				weekday: 'short',
				year: 'numeric',
				month: 'short',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				second: undefined,
			};
			const localDateTimeString = convertedDateTime.toLocaleString(undefined, options);
			setLocalDateTime(localDateTimeString);
		}
	}, [confirmedDateTime, userTimezone]);


	// Function to generate the timezone abbreviation map
	const generateTimezoneAbbreviationMap = () => {
		const timezoneAbbreviationMap = {};
		const timezones = moment.tz.names();

		timezones.forEach(timezone => {
			const abbreviation = moment.tz(timezone).format('z');
			timezoneAbbreviationMap[timezone] = abbreviation;
		});
		return timezoneAbbreviationMap;
	}

// Generate the timezone abbreviation map
const timezoneAbbreviationMap = generateTimezoneAbbreviationMap();

// Function to get timezone abbreviation
function getTimezoneAbbreviation(timezoneName) {
    return timezoneAbbreviationMap[timezoneName] || timezoneName;
}

	return (
		<div>
			{localDateTime && (
				<p>{localDateTime} {getTimezoneAbbreviation(userTimezone)}</p>
			)}
		</div>
	);
};

export default TimeConvertor;
