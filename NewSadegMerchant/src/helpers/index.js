import React from 'react'
import { Dimensions } from 'react-native'

export const getScreenSize = () => {
	return Dimensions.get('window')
}