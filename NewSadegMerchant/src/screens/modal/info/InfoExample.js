import React from 'react'
import { View, ScrollView } from 'react-native'

import { BaseText, ModalInfo } from '@/components'
import { colors, sizes } from '@/constants'
import CheckSVG from '@/assets/illustrations/check.svg'

const InfoExample = ({ navigation }) => {
	return (
		<ModalInfo
			Illustration={CheckSVG}
			title="Data Submitted"
			desc="Your account data has been submitted"
			onPressPositive={navigation.goBack}
		/>
	)
}

export default InfoExample