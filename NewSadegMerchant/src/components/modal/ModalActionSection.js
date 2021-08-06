import React from 'react'
import { View, StyleSheet } from 'react-native'

import { BaseButton } from '@/components'
import { sizes } from '@/constants'

const ModalActionSection = ({ onPressPositive, onPressNegative, positiveTitle = 'Submit', negativeTitle = 'Cancel', space = sizes.xl }) =>
	<View style={styles.container(space)}>
		{onPressNegative && <BaseButton onPress={onPressNegative} title={negativeTitle} bg="red" color="white" style={styles.button(space)} />}
		{onPressPositive && <BaseButton onPress={onPressPositive} title={positiveTitle} bg="green" color="white" style={styles.button(space)} />}
	</View>

export default ModalActionSection

const styles = StyleSheet.create({
	container: space => ({ flexDirection: 'row', paddingHorizontal: space / 2, paddingTop: space / 2 }),
	button: space => ({ flex: 1, marginHorizontal: space / 2, marginBottom: space })
})