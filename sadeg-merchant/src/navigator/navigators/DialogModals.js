import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import {
	DialogExample,
	ConfirmDialog,
} from '@/screens/modal/dialog'

const { Screen } = createStackNavigator()

const DialogModals = [
	<Screen key="DialogExample" name="DialogExample" component={DialogExample} />,
	<Screen key="ConfirmDialog" name="ConfirmDialog" component={ConfirmDialog} />
]

export default DialogModals