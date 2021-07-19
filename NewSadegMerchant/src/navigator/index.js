import React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { colors } from '@/constants'
import {
	OrderList,
	Menu,
	Account
} from '@/screens'

import CustomTabBar from './CustomTabBar/ver4'

const AppTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: colors.background
	}
}

const tabIcons = {
	OrderList: 'receipt',
	Menu: 'fast-food',
	Account: 'home',
}

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const renderTabBar = props => <CustomTabBar icons={tabIcons} {...props} />

const AppTabs = () => 
	<Tab.Navigator tabBar={renderTabBar}>
		<Tab.Screen name="OrderList" component={OrderList} />
		<Tab.Screen name="Menu" component={Menu} />
		<Tab.Screen name="Account" component={Account} />
	</Tab.Navigator>

const AppNavigator = () =>
	<NavigationContainer theme={AppTheme}>
		<Stack.Navigator
			screenOptions={{
				headerShown: false
			}}
		>
			<Stack.Screen name="AppTabs" component={AppTabs} />
		</Stack.Navigator>
	</NavigationContainer>

export default AppNavigator