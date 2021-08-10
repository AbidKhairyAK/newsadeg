import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Modal from 'react-navigation-modal'

import { BaseText, ModalActionSection } from '@/components'
import { colors, sizes } from '@/constants'
import { getScreenSize } from '@/helpers'

const ModalDialog = ({ 
	illustration,
	title, 
	desc, 
	onPressPositive, 
	onPressNegative, 
	positiveTitle = 'Ok', 
	negativeTitle = 'Cancel',
	positiveColor,
	negativeColor
}) => {
	const navigation = useNavigation()
	const Illustration = illustration // change to TitleCase

	return (
		<Modal style={styles.container} opacity={0.2}>
			<View style={styles.wrapper}>
				{!!Illustration && 
					<Illustration height={sizes.base * 10} />
				}
				{title && 
					<BaseText type="semi-bold" size="lg" align="center" style={{ marginBottom: sizes.xs }}>
						{title}
					</BaseText>
				}
				{desc && 
					<BaseText align="center" size="sm" style={{ marginBottom: sizes.xl }}>
						{desc}
					</BaseText>
				}
			</View>

			<ModalActionSection
				space={sizes.base}
				onPressPositive={onPressPositive}
				onPressNegative={onPressNegative}
				positiveTitle={positiveTitle}
				negativeTitle={negativeTitle}
				positiveColor={positiveColor}
				negativeColor={negativeColor}
			/>
		</Modal>
	)
}
export default ModalDialog

const styles = StyleSheet.create({
	container: { width: '70%', padding: 0, overflow: 'hidden' },
	wrapper: { paddingHorizontal: sizes.base, justifyContent: 'center', alignItems: 'center' },
})