import React from 'react'
import { ScrollView } from 'react-native'

import HeaderSection from './sections/HeaderSection'
import AdditionalSettings from './sections/AdditionalSettings'
import DataSettings from './sections/DataSettings'

import LogoutButton from './components/LogoutButton'

const Account = () => {
	return (
		<ScrollView>
			<HeaderSection />
			<AdditionalSettings />
			<DataSettings />
			<LogoutButton />
		</ScrollView>
	)
}

export default Account