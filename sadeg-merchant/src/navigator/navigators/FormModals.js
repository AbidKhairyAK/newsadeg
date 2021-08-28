import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import {
	FormExample,
	NewCategoryForm,
	DriverSelection,
	OwnerDataForm,
	EmailAccountForm,
	PasswordForm,
	PhoneNumberForm,
	// RestaurantDataForm,
	// BankAccountForm,
	// AddressForm,
	TagCategoriesForm,
} from '@/screens/modal/form'

const { Screen } = createStackNavigator()

const FormModals = [
	<Screen key="FormExample" name="FormExample" component={FormExample} />,
	<Screen key="NewCategoryForm" name="NewCategoryForm" component={NewCategoryForm} />,
	<Screen key="DriverSelection" name="DriverSelection" component={DriverSelection} />,
	<Screen key="OwnerDataForm" name="OwnerDataForm" component={OwnerDataForm} />,
	<Screen key="EmailAccountForm" name="EmailAccountForm" component={EmailAccountForm} />,
	<Screen key="PasswordForm" name="PasswordForm" component={PasswordForm} />,
	<Screen key="PhoneNumberForm" name="PhoneNumberForm" component={PhoneNumberForm} />,
	// <Screen key="RestaurantDataForm" name="RestaurantDataForm" component={RestaurantDataForm} />,
	// <Screen key="BankAccountForm" name="BankAccountForm" component={BankAccountForm} />,
	// <Screen key="AddressForm" name="AddressForm" component={AddressForm} />,
	<Screen key="TagCategoriesForm" name="TagCategoriesForm" component={TagCategoriesForm} />,
]

export default FormModals