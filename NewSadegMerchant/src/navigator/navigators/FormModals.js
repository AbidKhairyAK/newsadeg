import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import {
	FormExample,
	NewCategoryForm,
} from '@/screens/modal/form'

const { Screen } = createStackNavigator()

const FormModals = [
	<Screen key="FormExample" name="FormExample" component={FormExample} />,
	<Screen key="NewCategoryForm" name="NewCategoryForm" component={NewCategoryForm} />,
]

export default FormModals