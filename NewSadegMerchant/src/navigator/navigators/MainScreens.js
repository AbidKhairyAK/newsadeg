import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import {
	OrderDetail,
	MenuDetail,
} from '@/screens/page/main'

import AppTabs from './AppTabs'

const { Screen } = createStackNavigator()

const MainScreens = [
	<Screen key="AppTabs" name="AppTabs" component={AppTabs} />,
	<Screen key="MenuDetail" name="MenuDetail" component={MenuDetail} />,
	<Screen key="OrderDetail" name="OrderDetail" component={OrderDetail} />
]

export default MainScreens