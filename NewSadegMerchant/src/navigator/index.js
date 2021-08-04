import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector } from 'react-redux'

import {
	AuthScreens,
	MainScreens,
	FormModals,
	InfoModals
} from './navigators'
import Init from '@/screens/page/Init'

import { AppTheme, AppScreenOptions } from './config'

const Stack = createStackNavigator()

const AppScreens = () =>{
	const { isLogin } = useSelector(state => state.auth)

	return (
		<Stack.Navigator 
			headerMode="none" 
			mode="modal" 
			screenOptions={AppScreenOptions(false)}
		>
			<Stack.Screen name="Init" component={Init} />
			{
				isLogin 
				? <Stack.Screen name="MainScreens" component={MainScreens} />
				: <Stack.Screen name="AuthScreens" component={AuthScreens} />
			}
			<Stack.Screen name="FormModals" component={FormModals} />
			<Stack.Screen name="InfoModals" component={InfoModals} />
		</Stack.Navigator>
	)
}
const AppNavigator = () =>
	<NavigationContainer theme={AppTheme}>
		<AppScreens />
	</NavigationContainer>

export default AppNavigator