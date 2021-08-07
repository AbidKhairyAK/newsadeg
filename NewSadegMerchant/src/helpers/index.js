import React from 'react'
import { Dimensions } from 'react-native'
import store from '@/store'

export const getScreenSize = () => {
	return Dimensions.get('window')
}

export const isJsonParsable = (str) => {
	try {
		JSON.parse(str)
	} catch {
		return false
	}
	return true
}

export const getUser = () => store.getState().auth.user

export const toTitleCase = str => str.replace(/_/g, ' ').replace(
	/\w\S*/g,
	txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
)

export const formatNumber = val => val && val.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")

export const stringifyNumber = val => parseInt(val) < 10 ? '0' + val : '' + val

// supported format: second, minute, hour, day, date, month, monthName, year, iso. example: 'day, date month year'
export const formatDate = (val = new Date(), format = 'year-month-date') => {
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', `Friday`, 'Saturday']
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

	if (!(val instanceof Date && !isNaN(val.valueOf()))) val = new Date(val)

	let res = format
	if (format.includes('second')) res = res.replace('second', stringifyNumber(val.getSeconds()))
	if (format.includes('minute')) res = res.replace('minute', stringifyNumber(val.getMinutes()))
	if (format.includes('hour')) res = res.replace('hour', stringifyNumber(val.getHours()))
	if (format.includes('day')) res = res.replace('day', days[val.getDay()])
	if (format.includes('date')) res = res.replace('date', stringifyNumber(val.getDate()))
	if (format.includes('monthName')) res = res.replace('monthName', months[val.getMonth()])
	else if (format.includes('month')) res = res.replace('month', stringifyNumber(parseInt(val.getMonth()) + 1))
	if (format.includes('year')) res = res.replace('year', val.getFullYear())
	if (format.includes('iso')) res = formatDate(val, 'year-month-dateThour:minute:second.000Z')

	return res
}