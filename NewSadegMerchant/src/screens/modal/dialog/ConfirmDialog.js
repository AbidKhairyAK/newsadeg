import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { ModalDialog } from '@/components'
import QuestionIllustration from '@/assets/illustrations/question.svg'

const ConfirmDialog = ({ navigation, route }) => {
	const { goBack } = useNavigation()

	const {
		title = 'Are you sure?',
		desc = 'press \'OK\' to continue your action',
		positiveTitle = 'OK',
		negativeTitle = 'Cancel',
		onPressPositive,
		onPressNegative,
		positiveColor,
		negativeColor,
	} = route.params || {}

	const handleAction = action => e => {
		if (action) action()
		goBack()
	}

	return (
		<ModalDialog
			illustration={QuestionIllustration}
			title={title}
			desc={desc}
			positiveTitle={positiveTitle}
			negativeTitle={negativeTitle}
			positiveColor={positiveColor}
			negativeColor={negativeColor}
			onPressPositive={handleAction(onPressPositive)}
			onPressNegative={handleAction(onPressNegative)}
		/>
	)
}

export default ConfirmDialog