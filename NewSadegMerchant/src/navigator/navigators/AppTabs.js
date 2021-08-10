import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import {
	OrderList,
	Menu,
	Account,
} from '@/screens/page/main'

import { tabIcons } from '../config'
import CustomTabBar from '../components/CustomTabBar'

const { Navigator, Screen } = createBottomTabNavigator()

const renderTabBar = props => <CustomTabBar icons={tabIcons} {...props} />

const AppTabs = () => 
	<Navigator tabBar={renderTabBar}>
		<Screen name="OrderList" component={OrderList} />
		<Screen name="Menu" component={Menu} />
		<Screen name="Account" component={Account} />
	</Navigator>

export default AppTabs