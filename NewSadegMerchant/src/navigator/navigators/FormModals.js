import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import {
	FormExample,
} from '@/screens/modal/form'

const { Screen } = createStackNavigator()

const FormModals = [
	<Screen key="FormExample" name="FormExample" component={FormExample} />
]

export default FormModals