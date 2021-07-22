import React from 'react'
import { StyleSheet, View } from 'react-native'

import { BaseText } from '@/components'
import { sizes } from '@/constants'

import MenuItem from '../components/MenuItem'

const ListSection = () => {
	return (
		<View style={styles.container}>
			{[...new Array(6).keys()].map((val, i) =>
				<MenuItem key={i} index={i} />
			)}
		</View>
	)
}

export default ListSection

const styles = StyleSheet.create({
	container: { flexDirection: 'row', flexWrap: 'wrap', flex: 1, justifyContent: 'space-between', marginTop: sizes.xs * -1 }
})