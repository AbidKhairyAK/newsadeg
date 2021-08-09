import React from 'react'
import { View, StyleSheet } from 'react-native'

import { BaseText } from '@/components'
import { sizes } from '@/constants'
import { getScreenSize } from '@/helpers'

const NoData = ({ illustration: Illustration, title, description, children }) =>
	<View style={styles.container}>
		<Illustration height={getScreenSize().width / 2.5} />
		<BaseText align="center" type="bold" color="gray" style={styles.title}>
			{title}
		</BaseText>
		<BaseText align="center" size="sm" color="gray">
			{description}
		</BaseText>
	</View>

export default NoData

const styles = StyleSheet.create({
	container: { alignItems: 'center', marginVertical: sizes.xxl, width: '80%', alignSelf: 'center' },
	title: { marginTop: sizes.xl, marginBottom: sizes.base / 2 },
})