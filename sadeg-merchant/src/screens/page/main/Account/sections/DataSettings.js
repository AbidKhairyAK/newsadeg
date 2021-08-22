import React from 'react'
import { useNavigation } from '@react-navigation/native'

import DataSettingCard from '../components/DataSettingCard'
import store from '@/store'

const DataSettings = () => {
	const navigation = useNavigation()

	const accountSettings = [
		{ title: 'Owner Data', icon: 'person-outline', onPress: () => navigation.navigate('OwnerDataForm') },
		{ title: 'Email Account', icon: 'mail-outline', onPress: () => navigation.navigate('EmailAccountForm') },
		{ title: 'Password', icon: 'lock-closed-outline', onPress: () => navigation.navigate('PasswordForm') },
		{ title: 'Phone Number', icon: 'call-outline', onPress: () => navigation.navigate('PhoneNumberForm') },
	]

	const restaurantSettings = [
		{ title: 'Restaurant Data', icon: 'newspaper-outline', onPress: () => navigation.navigate('RestaurantDataForm') },
		{ title: 'Bank Account', icon: 'card-outline', onPress: () => navigation.navigate('BankAccountForm') },
		{ title: 'Address', icon: 'map-outline', onPress: () => navigation.navigate('AddressForm') },
		// { title: 'Open Hour', icon: 'alarm-outline' },
		{ title: 'Tag Categories', icon: 'pricetags-outline', onPress: () => navigation.navigate('TagCategoriesForm') },
	]

	return <>
		<DataSettingCard title="Account Settings" items={accountSettings} />
		<DataSettingCard title="Restaurant Settings" items={restaurantSettings} />
	</>
}

export default DataSettings