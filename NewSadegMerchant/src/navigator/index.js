import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { AppTheme, AppScreenOptions } from './config'
import {
	AuthScreens,
	MainScreens,
	FormModals,
	InfoModals
} from './navigators'

const Stack = createStackNavigator()

const AppScreens = () =>
	<Stack.Navigator 
		headerMode="none" 
		mode="modal" 
		screenOptions={AppScreenOptions(false)}
	>
		<Stack.Screen name="AuthScreens" component={AuthScreens} />
		<Stack.Screen name="MainScreens" component={MainScreens} />
		<Stack.Screen name="FormModals" component={FormModals} />
		<Stack.Screen name="InfoModals" component={InfoModals} />
	</Stack.Navigator>

const AppNavigator = () =>
	<NavigationContainer theme={AppTheme}>
		<AppScreens />
	</NavigationContainer>

export default AppNavigator