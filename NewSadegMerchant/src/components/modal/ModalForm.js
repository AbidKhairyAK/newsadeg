import React from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Modal from 'react-navigation-modal'

import { ModalContainer, BaseText, BaseButton, BaseIcon, ModalActionSection } from '@/components'
import { colors, sizes } from '@/constants'
import { getScreenSize } from '@/helpers'

const ModalForm = ({ children, title, onPressPositive, onPressNegative }) => {
	const navigation = useNavigation()
	return (
		<Modal style={styles.container} cancelable={false}>
			<ScrollView style={styles.scrollview}>
				<View style={styles.wrapper}>
					<View style={styles.header}>
						<TouchableOpacity delayPressIn={100} style={styles.closeButton} onPress={navigation.goBack}>
							<BaseIcon name="close" color="gray" size="lg" />
						</TouchableOpacity>
						<BaseText type="semi-bold" color="gray" align="center" style={styles.title}>
							{title}
						</BaseText>
					</View>
					{children}
				</View>

				<ModalActionSection onPressPositive={onPressPositive} onPressNegative={onPressNegative} />
			</ScrollView>
		</Modal>
	)
}
export default ModalForm

const styles = StyleSheet.create({
	container: { width: '90%', padding: 0 },
	scrollview: { maxHeight: getScreenSize().height * 0.8 },
	wrapper: { padding: sizes.xl, paddingBottom: 0 },
	header: { position: 'relative' },
	title: { borderBottomWidth: 1, borderColor: colors.border, paddingBottom: sizes.sm, marginBottom: sizes.base },
	closeButton: { position: 'absolute', top: 0, left: 0, padding: sizes.base / 4, marginLeft: sizes.base / -2, zIndex: 1 }
})