import React, { useRef, useCallback } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

const commonLogic = ({ animRef }) => {
	const navigation = useNavigation()

	const toRegisterScreen = () => navigation.navigate('Register')

	useFocusEffect(useCallback(() => {
		animRef.current.play()
		return () => animRef.current.pause()
	}, []))

	return { toRegisterScreen }
}

export default commonLogic