import React, { useState, useEffect } from 'react';

export default function timeConvertor(confirmedDateTime) {

	if (!confirmedDateTime) {
		return '';
	}

	console.log('confirmedDateTime', confirmedDateTime);

	// Get user's timezone
	const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	// Convert UTC time to user's timezone
	const convertedDateTime = new Date(confirmedDateTime);
	const options = {
		timeZone: userTimezone,
		weekday: 'short',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	};

	console.log('convertedDateTime', convertedDateTime);


	const localDateTimeString = convertedDateTime.toLocaleString('en-US', options);

	// Extract components of the date string
	const [weekday, month, day, time, period] = localDateTimeString.split(/[\s,]+/);

	// Get timezone abbreviation

	// let timeZoneName = '';
	// if (userTimezone) {
	// 	timeZoneName = new Intl.DateTimeFormat('en-US', {
	// 		timeZone: userTimezone,
	// 		timeZoneName: 'short'
	// 	}).formatToParts(convertedDateTime).find(part => part.type === 'timeZoneName')?.value;
	// }

	// // Format the date string as desired
	// const formattedDateTimeString = `${weekday.toUpperCase()}, ${month.toUpperCase()} ${day} · ${time} ${period.replace(/\./g, '')} ${timeZoneName}`;
	// console.log('formattedDateTimeString', formattedDateTimeString);
	// return formattedDateTimeString;
}


// // Get timezone abbreviation
// const timeZoneName = new Intl.DateTimeFormat('en-US', {
// 	timeZone: userTimezone,
// 	timeZoneName: 'short'
// }).formatToParts(convertedDateTime).find(part => part.type === 'timeZoneName').value;

// // Format the date string as desired
// const formattedDateTimeString = `${weekday.toUpperCase()}, ${month.toUpperCase()} ${day} · ${time} ${period.replace(/\./g, '')} ${timeZoneName}`;

// setLocalDateTime(formattedDateTimeString);
