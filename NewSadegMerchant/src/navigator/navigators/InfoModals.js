import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import {
	InfoExample,
} from '@/screens/modal/info'

const { Screen } = createStackNavigator()

const InfoModals = [
	<Screen key="InfoExample" name="InfoExample" component={InfoExample} />
]

export default InfoModals