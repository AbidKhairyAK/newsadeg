import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import {
	OrderList,
	Menu,
	Account,
} from '@/screens/page/main'

import { tabIcons } from '../config'
import CustomTabBar from '../CustomTabBar/ver4'

const Tab = createBottomTabNavigator()

const renderTabBar = props => <CustomTabBar icons={tabIcons} {...props} />

const AppTabs = () => 
	<Tab.Navigator tabBar={renderTabBar}>
		<Tab.Screen name="OrderList" component={OrderList} />
		<Tab.Screen name="Menu" component={Menu} />
		<Tab.Screen name="Account" component={Account} />
	</Tab.Navigator>

export default AppTabs