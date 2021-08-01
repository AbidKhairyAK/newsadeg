import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import {
	OrderDetail,
	MenuDetail,
} from '@/screens/page/main'

import AppTabs from './AppTabs'

const Stack = createStackNavigator()

const MainScreens = () => 
	<Stack.Navigator headerMode="none">
		<Stack.Screen name="AppTabs" component={AppTabs} />
		<Stack.Screen name="MenuDetail" component={MenuDetail} />
		<Stack.Screen name="OrderDetail" component={OrderDetail} />
	</Stack.Navigator>

export default MainScreens