import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import {
	InfoExample,
} from '@/screens/modal/info'

import { AppScreenOptions } from '../config'

const Stack = createStackNavigator()

const InfoModals = () =>
	<Stack.Navigator headerMode="none" mode="modal" screenOptions={AppScreenOptions(false)}>
		<Stack.Screen name="InfoExample" component={InfoExample} />
	</Stack.Navigator>

export default InfoModals