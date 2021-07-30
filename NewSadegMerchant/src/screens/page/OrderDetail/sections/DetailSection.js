import React from 'react'
import { StyleSheet, View } from 'react-native'

import { BaseText, ShadowView, MoneyText } from '@/components'
import { sizes, colors } from '@/constants'

import DetailItem from '../components/DetailItem'

const DetailSection = () => {
	return (
		<ShadowView type="card" style={styles.container}>
			<DetailItem label="Payment Method" icon="cash-outline">
				<BaseText size="sm" type="semi-bold">
					Credit Card
				</BaseText>
			</DetailItem>

			<DetailItem label="Subtotal Menu" icon="fast-food-outline">
				<MoneyText value={25} />
			</DetailItem>

			<DetailItem label="Delivery Fee" icon="car-outline">
				<MoneyText value={5} />
			</DetailItem>
			
			<DetailItem label="Total" icon="calculator-outline" noBorder>
				<MoneyText value={30} size="xl" style={styles.total} />
			</DetailItem>
		</ShadowView>
	)
}

export default DetailSection

const styles = StyleSheet.create({
	container: { marginHorizontal: sizes.base, marginBottom: sizes.base, borderRadius: sizes.base, paddingHorizontal: sizes.xs, paddingVertical: sizes.base },
	total: { lineHeight: sizes.xl * 1.25 }
})