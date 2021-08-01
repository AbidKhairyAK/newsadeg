import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { ModalContainer, BaseText, BaseButton, BaseIcon, ModalActionSection } from '@/components'
import { colors, sizes } from '@/constants'

const ModalForm = ({ children, title, onPressPositive, onPressNegative }) => {
	const navigation = useNavigation()
	return (
		<ModalContainer>
			<View style={styles.wrapper}>
				<View style={{ position: 'relative' }}>
					<TouchableOpacity style={styles.closeButton} onPress={navigation.goBack}>
						<BaseIcon name="close" color="gray" size="lg" />
					</TouchableOpacity>
					<BaseText type="semi-bold" color="gray" align="center" style={styles.title}>
						{title}
					</BaseText>
				</View>
				{children}
			</View>

			<ModalActionSection onPressPositive={onPressPositive} onPressNegative={onPressNegative} />
		</ModalContainer>
	)
}
export default ModalForm

const styles = StyleSheet.create({
	title: { borderBottomWidth: 1, borderColor: colors.border, paddingBottom: sizes.sm, marginBottom: sizes.base },
	wrapper: { padding: sizes.base, paddingBottom: 0 },
	closeButton: { position: 'absolute', top: 0, left: 0, padding: sizes.base / 4, marginLeft: sizes.base / -2, zIndex: 1 }
})