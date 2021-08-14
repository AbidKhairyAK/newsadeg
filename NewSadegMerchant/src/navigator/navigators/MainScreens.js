import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import {
	OrderDetail,
	MenuDetail,
	Menu,
	MenuForm,
	CategorySetting,
	DriverList,
	DriverForm,
} from '@/screens/page/main'

import AppTabs from './AppTabs'

const { Screen } = createStackNavigator()

const MainScreens = [
	<Screen key="AppTabs" name="AppTabs" component={AppTabs} />,
	<Screen key="MenuDetail" name="MenuDetail" component={MenuDetail} />,
	<Screen key="Menu" name="Menu" component={Menu} />,
	<Screen key="MenuForm" name="MenuForm" component={MenuForm} />,
	<Screen key="OrderDetail" name="OrderDetail" component={OrderDetail} />,
	<Screen key="CategorySetting" name="CategorySetting" component={CategorySetting} />,
	<Screen key="DriverList" name="DriverList" component={DriverList} />,
	<Screen key="DriverForm" name="DriverForm" component={DriverForm} />,
]

export default MainScreens