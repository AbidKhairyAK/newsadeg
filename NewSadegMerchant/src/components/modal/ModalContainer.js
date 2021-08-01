import React from 'react'
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'

import { ShadowView, BaseText, BaseIcon } from '@/components'
import { colors, sizes } from '@/constants'

const ModalContainer = ({ children }) => {
	return (
		<View style={styles.container}>
			<ShadowView type="modal" style={styles.shadow}>
				<View style={styles.inner}>
					<ScrollView>
						{children}
					</ScrollView>
				</View>
			</ShadowView>
		</View>
	)
}

export default ModalContainer

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: sizes.base, paddingVertical: sizes.base * 4 },
	shadow: { width: '100%', borderRadius: sizes.base },
	inner: { width: '100%', backgroundColor: colors.white, borderRadius: sizes.base, position: 'relative' },
})