import React from 'react'
import { Dimensions } from 'react-native'

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

export const isActionIncludes = params => action => params
	.map(param => param.type)
	.includes(action.type) 