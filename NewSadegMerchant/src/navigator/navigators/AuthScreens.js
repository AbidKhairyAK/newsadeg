import React, { useState, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import {
	Onboarding,
	Register,
	Login,
} from '@/screens/page/auth'

const { Screen } = createStackNavigator()

const AuthScreens = [
		<Screen key="Onboarding" name="Onboarding" component={Onboarding} />,
		<Screen key="Register" name="Register" component={Register} />,
		<Screen key="Login" name="Login" component={Login} />,
]
export default AuthScreens