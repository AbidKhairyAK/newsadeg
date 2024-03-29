import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector } from 'react-redux'
import FlashMessage from 'react-native-flash-message'

import {
	AuthScreens,
	MainScreens,
	FormModals,
	DialogModals
} from './navigators'
import Init from '@/screens/page/Init'

import { AppTheme } from './config'
import { navigationRef } from './RootNavigation'

const { Navigator, Screen } = createStackNavigator()

const AppScreens = () => {
	const { isLogin } = useSelector(state => state.auth)

	return (
		<Navigator headerMode="none" mode="modal">
			<Screen name="Init" component={Init} />
			{AuthScreens.map(screen => screen)}
			{MainScreens.map(screen => screen)}
			{FormModals.map(screen => screen)}
			{DialogModals.map(screen => screen)}
		</Navigator>
	)
}

const AppNavigator = () => <>
	<NavigationContainer ref={navigationRef} theme={AppTheme}>
		<AppScreens />
	</NavigationContainer>
	<FlashMessage />
</>

export default AppNavigator


/*
return (
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
*/