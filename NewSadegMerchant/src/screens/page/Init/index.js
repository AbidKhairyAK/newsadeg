import React, { useEffect, useState, useCallback } from 'react'
import { View, ActivityIndicator } from 'react-native'
import LottieView from 'lottie-react-native'
import { useFocusEffect } from '@react-navigation/native'
import { useDispatch } from 'react-redux'

import { getScreenSize } from '@/helpers'
import { colors, sizes } from '@/constants'
import { axiosInit, authInit } from '@/services'
import { storage } from '@/utils'
import { getRestaurantData } from '@/store/restaurant'

const devTargetScreen = false

const Init = ({ navigation }) => {
	const dispatch = useDispatch()

	const [targetScreen, setTargetScreen] = useState()
	const [trigger, setTrigger] = useState(0)
	const [isLoading, setIsLoading] = useState(false)

	const initProcess = async () => {
		await axiosInit()
		const isLogin = await authInit()
		const isOpened = await storage.getItem('isAppHasBeenOpened')

		if (isLogin) await dispatch(getRestaurantData())

		setTargetScreen(
			isLogin ? 'AppTabs' : 
			isOpened ? 'Login' : 
			'Onboarding'
		)
		setTrigger(prev => prev + 1)
	}

	const minScreenTime = () => {
		setTimeout(() => {
			setTrigger(prev => prev + 1)
		}, 2500)
	}

	useFocusEffect(useCallback(() => {
		setIsLoading(true)
		initProcess()
		minScreenTime()
	}, []))

	useEffect(() => {
		if (trigger < 2) return
		setTrigger(0)
		setIsLoading(false)
		navigation.replace(__DEV__ && devTargetScreen ? devTargetScreen : targetScreen)
		// navigation.replace(targetScreen)
	}, [trigger])

	return isLoading && (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<LottieView
				source={require('@/assets/animations/Logo Restaurant.json')}
				autoPlay
				loop={false}
				style={{ width: getScreenSize().width / 1.2, marginBottom: sizes.base }}
			/>
			<ActivityIndicator color={colors.green} />
		</View>
	)
}

export default Init