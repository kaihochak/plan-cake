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

			setLocalDateTime(formattedDateTimeString);
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
