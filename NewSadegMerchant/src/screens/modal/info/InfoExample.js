import React from 'react'
import { View, ScrollView } from 'react-native'

import { BaseText, ModalInfo } from '@/components'
import { colors, sizes } from '@/constants'
import CheckAltIllustration from '@/assets/illustrations/check-alt.svg'

const InfoExample = ({ navigation }) => {
	return (
		<ModalInfo
			illustration={CheckAltIllustration}
			title="Data Submitted"
			desc="Your account data has been submitted"
			onPressPositive={navigation.goBack}
		/>
	)
}

export default InfoExample