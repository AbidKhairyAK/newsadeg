import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

import { BaseText } from '@/components'
import { colors, sizes } from '@/constants'

const LoadingOverlay = ({ loading }) => loading &&
	<View style={styles.container}>
		<ActivityIndicator size="large" color={colors.green} />
		<BaseText align="center" style={styles.text} type="medium">
			{loading}
		</BaseText>
	</View>

export default LoadingOverlay

const styles = StyleSheet.create({
	container: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.white + 'AA' },
	text: { width: '80%', marginTop: sizes.base }
})