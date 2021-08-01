import React from 'react'
import { StyleSheet, View } from 'react-native'

import { BaseText, ShadowView, BaseButton } from '@/components'
import { colors, sizes } from '@/constants'

const ActionSection = ({ scrollViewRef }) => {
	const toEnd = () => scrollViewRef.current.scrollToEnd()

	return (
		<ShadowView type="tabBar" style={styles.container}>
			<View style={styles.inner}>
				<BaseButton title="Reject" icon="close-circle-outline" bg="red" color="white" style={styles.newOrderButton} />
				<BaseButton onPress={toEnd} title="Accept" icon="checkmark-circle-outline" bg="green" color="white" style={styles.newOrderButton} />
			</View>
		</ShadowView>
	)
}

export default ActionSection

const styles = StyleSheet.create({
	container: { borderRadius: sizes.base },
	inner: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.white, borderTopLeftRadius: sizes.base, borderTopRightRadius: sizes.base, padding: sizes.xs },
	newOrderButton: { width: '47.5%' }
})