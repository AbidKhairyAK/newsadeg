import React, { memo } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { BaseText, ShadowView, MoneyText, BaseIcon } from '@/components'
import { sizes, colors } from '@/constants'
import { toTitleCase, formatDate } from '@/helpers'

import MenuItem from './MenuItem'

const OrderItem = ({ order, onPress, withTotal, withDate }) => {
	return (
		<TouchableOpacity onPress={onPress} disabled={!onPress}>
			<ShadowView type="card" radius="base" style={styles.containerShadow}>
				<View style={styles.container}>
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
							<ShadowView type="item" radius="xxs" style={styles.statusWrapper}>
								<View style={styles.statusInner}>
									<BaseText type="bold" size="xxs" color="white">
										{toTitleCase(order.status)}
									</BaseText>
								</View>
							</ShadowView>
						</View>
					</View>

					{order.order_detail.map((detail, index, self) =>
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
				</View>

			</ShadowView>
		</TouchableOpacity>
)}

export default memo(OrderItem)

const styles = StyleSheet.create({
	containerShadow: {
		marginBottom: sizes.lg, 
		marginHorizontal: sizes.base
	},
	container: { 
		backgroundColor: colors.white, 
		padding: sizes.xs,
		borderRadius: sizes.base
	},
	headerSection: { flexDirection: 'row', justifyContent: 'space-between' },
	statusWrapper: { alignSelf: 'flex-end' },
	statusInner: { padding: sizes.xxxs, backgroundColor: colors.red, borderRadius: sizes.xxs },
	dateWrapper: { marginVertical: sizes.xxxs, flexDirection: 'row', alignItems: 'center' },
	dateIcon: { marginRight: sizes.base / 4 },
	footerSection: { justifyContent: 'space-between', flexDirection: 'row', marginTop: sizes.sm, alignItems: 'center' }
})