import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector } from 'react-redux'

import {
	AuthScreens,
	MainScreens,
	FormModals,
	DialogModals
} from './navigators'
import Init from '@/screens/page/Init'

import { AppTheme } from './config'

const { Navigator, Screen } = createStackNavigator()

const AppScreens = () => {
	const { isLogin } = useSelector(state => state.auth)

	return __DEV__
	? (
		<Navigator headerMode="none" mode="modal">
			<Screen name="Init" component={Init} />
			{MainScreens.map(screen => screen)}
			{AuthScreens.map(screen => screen)}
			{FormModals.map(screen => screen)}
			{DialogModals.map(screen => screen)}
		</Navigator>
	) : (
		<Navigator headerMode="none" mode="modal">
			<Screen name="Init" component={Init} />
			{
				isLogin 
				? MainScreens.map(screen => screen)
				: AuthScreens.map(screen => screen)
			}
			{FormModals.map(screen => screen)}
			{DialogModals.map(screen => screen)}
		</Navigator>
	)
}

const AppNavigator = () =>
	<NavigationContainer theme={AppTheme}>
		<AppScreens />
	</NavigationContainer>

export default AppNavigator