import React from 'react'

import { ModalDialog } from '@/components'
import CheckAltIllustration from '@/assets/illustrations/check-alt.svg'

const DialogExample = ({ navigation }) => {
	return (
		<ModalDialog
			illustration={CheckAltIllustration}
			title="Data Submitted"
			desc="Your account data has been submitted"
			onPressPositive={navigation.goBack}
		/>
	)
}

export default DialogExample