import React from 'react'
import { View, StyleSheet } from 'react-native'

import { BaseText, ShadowView, MoneyText } from '@/components'
import { sizes, colors } from '@/constants'

import MenuItem from './MenuItem'

const OrderItem = () => (
	<ShadowView type="card" style={styles.container}>
		<View style={styles.headerSection}>
			<View>
				<BaseText>
					Fulan Bin Fulan
				</BaseText>
				<BaseText size="sm" type="semi-bold">
					Takeaway
				</BaseText>
			</View>

			<ShadowView type="item" style={styles.statusWrapper}>
				<BaseText type="bold" size="xxs" color="white">
					Pending
				</BaseText>
			</ShadowView>
		</View>

		<MenuItem />
		<MenuItem />
		<MenuItem />

		<View style={styles.footerSection}>
			<BaseText size="sm" type="semi-bold">
				Total
			</BaseText>
			<MoneyText value={20} size="lg" />
		</View>

	</ShadowView>
)

export default OrderItem

const styles = StyleSheet.create({
	container: { 
		backgroundColor: colors.white, 
		padding: sizes.xs, 
		borderRadius: sizes.base, 
		backgroundColor: colors.white, 
		marginBottom: sizes.lg, 
		marginHorizontal: sizes.base
	},
	headerSection: { flexDirection: 'row', justifyContent: 'space-between' },
	statusWrapper: { 
		padding: sizes.xxxs, 
		backgroundColor: colors.red, 
		borderRadius: sizes.xxs, 
		alignSelf: 'flex-start' 
	},
	footerSection: { justifyContent: 'space-between', flexDirection: 'row', marginTop: sizes.sm, alignItems: 'center' }
})