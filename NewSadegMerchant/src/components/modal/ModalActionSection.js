import React from 'react'
import { View, StyleSheet } from 'react-native'

import { BaseButton } from '@/components'
import { sizes } from '@/constants'

const ModalActionSection = ({ onPressPositive, onPressNegative, positiveTitle = 'Submit', negativeTitle = 'Cancel' }) =>
	<View style={styles.container}>
		{onPressNegative && <BaseButton onPress={onPressNegative} title={negativeTitle} bg="red" color="white" style={styles.button} />}
		{onPressPositive && <BaseButton onPress={onPressPositive} title={positiveTitle} bg="green" color="white" style={styles.button} />}
	</View>

export default ModalActionSection

const styles = StyleSheet.create({
	container: { flexDirection: 'row', paddingHorizontal: sizes.base / 2, paddingTop: sizes.base / 2 },
	button: { flex: 1, marginHorizontal: sizes.base / 2, marginBottom: sizes.base }
})