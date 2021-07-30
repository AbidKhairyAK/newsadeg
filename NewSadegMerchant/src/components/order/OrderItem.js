import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { BaseText, ShadowView, MoneyText, BaseIcon } from '@/components'
import { sizes, colors } from '@/constants'

import MenuItem from './MenuItem'

const OrderItem = ({ onPress, withTotal, withDate }) => {
	return (
		<TouchableOpacity onPress={onPress} disabled={!onPress}>
			<ShadowView type="card" style={styles.container}>
				<View style={styles.headerSection}>
					<View>
						<BaseText>
							Fulan Bin Fulan
						</BaseText>
						<BaseText size="sm" type="semi-bold">
							Takeaway
						</BaseText>

						{withDate &&
							<View style={{ marginVertical: sizes.xxxs, flexDirection: 'row', alignItems: 'center' }}>
								<BaseIcon name="time-outline" size="base" color="green" style={{ marginRight: sizes.base / 4 }} />
								<BaseText size="xs" color="gray" lineHeight={sizes.xs * 1.25}>
									20 June 2021, 20:30
								</BaseText>
							</View>
						}

					</View>

					<View>
						<ShadowView type="item" style={styles.statusWrapper}>
							<BaseText type="bold" size="xxs" color="white">
								Pending
							</BaseText>
						</ShadowView>
					</View>
				</View>

				{[...new Array(3).keys()].map((val, index, self) =>
					<MenuItem key={index} noBorder={!withTotal && index === self.length - 1} />
				)}

				{withTotal && 
					<View style={styles.footerSection}>
						<BaseText size="sm" type="semi-bold">
							Total
						</BaseText>
						<MoneyText value={20} size="lg" />
					</View>
				}

			</ShadowView>
		</TouchableOpacity>
)}

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
		alignSelf: 'flex-end' 
	},
	footerSection: { justifyContent: 'space-between', flexDirection: 'row', marginTop: sizes.sm, alignItems: 'center' }
})