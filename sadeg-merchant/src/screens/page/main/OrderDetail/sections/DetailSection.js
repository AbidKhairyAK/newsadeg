import React from 'react'
import { StyleSheet, View } from 'react-native'

import { BaseText, MoneyText, BaseCard } from '@/components'
import { sizes, colors } from '@/constants'
import { toTitleCase } from '@/helpers'

import DetailItem from '../components/DetailItem'

const DetailSection = ({ order }) => {
	return (
		<BaseCard style={styles.card} innerStyle={styles.cardInner}>
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
		</BaseCard>
	)
}

export default DetailSection

const styles = StyleSheet.create({
	card: { marginHorizontal: sizes.base, marginBottom: sizes.base },
	cardInner: { paddingVertical: sizes.base },
	total: { lineHeight: sizes.xl * 1.25 }
})