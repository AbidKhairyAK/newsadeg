import React, { memo } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { BaseText, BaseCard, MoneyText, BaseIcon } from '@/components'
import { sizes, colors } from '@/constants'
import { toTitleCase, formatDate } from '@/helpers'

import StatusBadge from './StatusBadge'
import MenuItem from './MenuItem'

const OrderItem = ({ order, onPress, withTotal, withDate }) => {
	return (
		<BaseCard
			style={styles.card}
			delayPressIn={100} 
			onPress={onPress}
		>
			<View style={styles.headerSection}>
				<View>
					<BaseText>
						{order.name_customer}
					</BaseText>
					<BaseText size="sm" type="semi-bold">
						{toTitleCase(order.order_method)}
					</BaseText>

					{withDate &&
						<View style={styles.dateWrapper}>
							<BaseIcon name="time-outline" size="base" color="green" style={styles.dateIcon} />
							<BaseText size="xs" color="gray" lineHeight={sizes.xs * 1.25}>
								{formatDate(order.created_at, 'date monthName year, hour:minute')}
							</BaseText>
						</View>
					}

				</View>

				<View>
					<StatusBadge status={order.status} />
				</View>
			</View>

			{order.order_detail?.map((detail, index, self) =>
				<MenuItem 
					key={index}
					orderDetail={detail}
					noBorder={!withTotal && index === self.length - 1} 
				/>
			)}

			{withTotal && 
				<View style={styles.footerSection}>
					<BaseText size="sm" type="semi-bold">
						Total
					</BaseText>
					<MoneyText value={order.price} size="lg" />
				</View>
			}
		</BaseCard>
	)
}

export default memo(OrderItem)

const styles = StyleSheet.create({
	card: { marginBottom: sizes.lg, marginHorizontal: sizes.base },
	headerSection: { flexDirection: 'row', justifyContent: 'space-between' },
	dateWrapper: { marginVertical: sizes.xxxs, flexDirection: 'row', alignItems: 'center' },
	dateIcon: { marginRight: sizes.base / 4 },
	footerSection: { justifyContent: 'space-between', flexDirection: 'row', marginTop: sizes.sm, alignItems: 'center' }
})