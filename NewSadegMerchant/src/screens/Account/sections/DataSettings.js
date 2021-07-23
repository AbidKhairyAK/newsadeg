import React from 'react'

import DataSettingCard from '../components/DataSettingCard'

const accountSettings = [
	{ title: 'Owner Data', icon: 'person-outline' },
	{ title: 'Email Account', icon: 'mail-outline' },
	{ title: 'Password', icon: 'lock-closed-outline' },
	{ title: 'Phone Number', icon: 'call-outline' },
]

const restaurantSettings = [
	{ title: 'Restaurant Data', icon: 'newspaper-outline' },
	{ title: 'Bank Account', icon: 'card-outline' },
	{ title: 'Address', icon: 'map-outline' },
	{ title: 'Open Hour', icon: 'alarm-outline' },
	{ title: 'Tab Categories', icon: 'pricetags-outline' },
]

const DataSettings = () => {
	return <>
		<DataSettingCard title="Account Settings" items={accountSettings} />
		<DataSettingCard title="Restaurant Settings" items={restaurantSettings} />
	</>
}

export default DataSettings