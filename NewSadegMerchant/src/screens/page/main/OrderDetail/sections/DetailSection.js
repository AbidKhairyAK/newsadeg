import React from 'react'
import { StyleSheet, View } from 'react-native'

import { BaseText, ShadowView, MoneyText } from '@/components'
import { sizes, colors } from '@/constants'
import { toTitleCase } from '@/helpers'

import DetailItem from '../components/DetailItem'

const DetailSection = ({ order }) => {
	return (
		<ShadowView type="card" radius="base" style={styles.containerShadow}>
			<View style={styles.container}>
				<DetailItem label="Payment Method" icon="cash-outline">
					<BaseText size="sm" type="semi-bold">
						{toTitleCase(order.payment_method)}
					</BaseText>
				</DetailItem>

				<DetailItem label="Subtotal Menu" icon="fast-food-outline">
					<MoneyText value={order.price} />
				</DetailItem>

				<DetailItem label="Delivery Fee" icon="car-outline">
					<MoneyText value={order.delivery_cost} />
				</DetailItem>
				
				<DetailItem label="Total" icon="calculator-outline" noBorder>
					<MoneyText value={order.price + order.delivery_cost} size="xl" style={styles.total} />
				</DetailItem>
			</View>
		</ShadowView>
	)
}

export default DetailSection

const styles = StyleSheet.create({
	containerShadow: { marginHorizontal: sizes.base, marginBottom: sizes.base },
	container: { backgroundColor: colors.white, borderRadius: sizes.base, paddingHorizontal: sizes.xs, paddingVertical: sizes.base },
	total: { lineHeight: sizes.xl * 1.25 }
})