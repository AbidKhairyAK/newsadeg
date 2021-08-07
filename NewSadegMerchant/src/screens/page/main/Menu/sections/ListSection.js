import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'

import { BaseText, ShadowView } from '@/components'
import { sizes } from '@/constants'

import MenuItem from '../components/MenuItem'

const ListSection = ({ orders }) => {
	return (
		<View style={styles.container}>
			{[...new Array(6).keys()].map((val, i) =>
				<MenuItem key={i} isTopItem={i === 0} />
			)}

			<TouchableOpacity>
				<ShadowView type="card" style={styles.addButton}>
					<BaseText type="semi-bold" color="green" align="center">
						+ New Menu
					</BaseText>
				</ShadowView>
			</TouchableOpacity>
		</View>
	)
}

export default ListSection

const styles = StyleSheet.create({
	container: { marginTop: sizes.xs * -1 },
	addButton: { borderRadius: sizes.base, padding: sizes.base, margin: sizes.base, marginTop: 0 }
})