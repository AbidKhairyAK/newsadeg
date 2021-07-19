import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ShadowFlex } from 'react-native-neomorph-shadows'

import { BaseText } from '@/components'
import { sizes, colors, shadows } from '@/constants'

import MenuItem from './MenuItem'

const OrderItem = () => (
	<ShadowFlex style={styles.container}>
		<View style={styles.headerSection}>
			<View>
				<BaseText>
					Fulan Bin Fulan
				</BaseText>
				<BaseText size="sm" type="semi-bold">
					Takeaway
				</BaseText>
			</View>

			<ShadowFlex style={styles.statusWrapper}>
				<BaseText type="bold" size="xxs" color="white">
					Pending
				</BaseText>
			</ShadowFlex>
		</View>

		<MenuItem />
		<MenuItem />
		<MenuItem />

		<View style={styles.footerSection}>
			<BaseText size="sm" type="semi-bold">
				Total
			</BaseText>
			<BaseText type="bold" color="green" size="lg">
				SR 60.00
			</BaseText>
		</View>

	</ShadowFlex>
)

export default OrderItem

const styles = StyleSheet.create({
	container: { 
		...shadows.card,
		backgroundColor: colors.white, 
		padding: sizes.xs, 
		borderRadius: sizes.base, 
		backgroundColor: colors.white, 
		marginBottom: sizes.lg, 
		marginHorizontal: sizes.base
	},
	headerSection: { flexDirection: 'row', justifyContent: 'space-between' },
	statusWrapper: { 
		...shadows.item,
		padding: sizes.xxxs, 
		backgroundColor: colors.red, 
		borderRadius: sizes.xxs, 
		alignSelf: 'flex-start' 
	},
	footerSection: { justifyContent: 'space-between', flexDirection: 'row', marginTop: sizes.sm, alignItems: 'center' }
})