import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import {
	FormExample,
} from '@/screens/modal/form'

import { AppScreenOptions } from '../config'

const Stack = createStackNavigator()

const FormModals = () =>
	<Stack.Navigator headerMode="none" mode="modal" screenOptions={AppScreenOptions(true)}>
		<Stack.Screen name="FormExample" component={FormExample} />
	</Stack.Navigator>

export default FormModals