import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { colors } from '@/constants'
import {
	OrderList,
	OrderDetail,
	Menu,
	MenuDetail,
	Account
} from '@/screens/page'
import {
	FormExample,
} from '@/screens/modal/form'
import {
	InfoExample,
} from '@/screens/modal/info'

import { tabIcons, AppTheme, AppScreenOptions } from './config'
import CustomTabBar from './CustomTabBar/ver4'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const renderTabBar = props => <CustomTabBar icons={tabIcons} {...props} />

const AppTabs = () => 
	<Tab.Navigator tabBar={renderTabBar}>
		<Tab.Screen name="OrderList" component={OrderList} />
		<Tab.Screen name="Menu" component={Menu} />
		<Tab.Screen name="Account" component={Account} />
	</Tab.Navigator>

const MainScreens = () => 
	<Stack.Navigator headerMode="none">
		<Stack.Screen name="AppTabs" component={AppTabs} />
		<Stack.Screen name="MenuDetail" component={MenuDetail} />
		<Stack.Screen name="OrderDetail" component={OrderDetail} />
	</Stack.Navigator>

const InfoScreens = () =>
	<Stack.Navigator headerMode="none" mode="modal" screenOptions={AppScreenOptions(false)}>
		<Stack.Screen name="InfoExample" component={InfoExample} />
	</Stack.Navigator>

const FormScreens = () =>
	<Stack.Navigator headerMode="none" mode="modal" screenOptions={AppScreenOptions(true)}>
		<Stack.Screen name="FormExample" component={FormExample} />
	</Stack.Navigator>

const AppScreens = () =>
	<Stack.Navigator headerMode="none" mode="modal" screenOptions={AppScreenOptions(false)}>
		<Stack.Screen name="MainScreens" component={MainScreens} />
		<Stack.Screen name="FormScreens" component={FormScreens} />
		<Stack.Screen name="InfoScreens" component={InfoScreens} />
	</Stack.Navigator>

const AppNavigator = () =>
	<NavigationContainer theme={AppTheme}>
		<AppScreens />
	</NavigationContainer>

export default AppNavigator