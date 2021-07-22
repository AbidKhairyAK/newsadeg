import React from 'react'
import { StyleSheet, View } from 'react-native'

import { BaseText } from '@/components'
import { sizes } from '@/constants'

import MenuItem from '../components/MenuItem'

const ListSection = () => {
	return (
		<View style={styles.container}>
			{[...new Array(6).keys()].map((val, i) =>
				<MenuItem key={i} isTopItem={i === 0} />
			)}
		</View>
	)
}

export default ListSection

const styles = StyleSheet.create({
	container: { marginTop: sizes.xs * -1 }
})