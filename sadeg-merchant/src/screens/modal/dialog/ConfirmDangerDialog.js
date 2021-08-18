import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { ModalDialog } from '@/components'
import QuestionIllustration from '@/assets/illustrations/question.svg'

const ConfirmDangerDialog = ({ navigation, route }) => {
	const { goBack } = useNavigation()

	const {
		title = 'Are you sure?',
		desc = 'Your action can\'t be undone',
		positiveTitle = 'OK',
		negativeTitle = 'Cancel',
		onPressPositive,
		onPressNegative,
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
			positiveColor="red"
			negativeColor="gray"
			onPressPositive={handleAction(onPressPositive)}
			onPressNegative={handleAction(onPressNegative)}
		/>
	)
}

export default ConfirmDangerDialog