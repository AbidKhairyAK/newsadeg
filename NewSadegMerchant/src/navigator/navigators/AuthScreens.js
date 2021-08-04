import React, { useState, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import {
	Onboarding,
	Register,
	Login,
} from '@/screens/page/auth'

const Stack = createStackNavigator()

const AuthScreens = () => 
	<Stack.Navigator headerMode="none">
		<Stack.Screen name="Onboarding" component={Onboarding} />
		<Stack.Screen name="Register" component={Register} />
		<Stack.Screen name="Login" component={Login} />
	</Stack.Navigator>

export default AuthScreens