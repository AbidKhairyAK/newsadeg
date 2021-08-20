import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'

import { BaseText, MoneyText, BaseCard } from '@/components'
import { sizes, colors } from '@/constants'
import { toTitleCase } from '@/helpers'
import { RestaurantDriverService, DriverService } from '@/services'

import DetailItem from '../components/DetailItem'

const AdditionalDetailSection = ({ order }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [driverDetail, setDriverDetail] = useState({})

	const hasDriver = order.order_method === 'delivery' && order.user_driver_id

	const serviceMap = {
		driver_restaurant: RestaurantDriverService,
		driver_partner: DriverService
	}

	const getDriverDetail = async () => {
		try {
			setIsLoading(true)
			const Service = serviceMap[order.driver_type]
			const res = await Service.detail(order.user_driver_id)
			setDriverDetail(res)
		} catch (err) {
			console.error(err)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (hasDriver) getDriverDetail()
	}, [])

	return (
		<BaseCard style={styles.card} innerStyle={styles.cardInner}>
			{ hasDriver &&
				<DetailItem label="Selected Driver" icon="person-outline">
					{isLoading
						? <ActivityIndicator color={colors.green} />
						: <BaseText size="sm" type="semi-bold">
							{driverDetail.fullname}
						</BaseText>
					}
				</DetailItem>
			}

			<DetailItem label="Cooking Time" icon="alarm-outline" noBorder>
				<BaseText size="sm" type="semi-bold">
					{order.estimated_cooking} Minutes
				</BaseText>
			</DetailItem>
		</BaseCard>
	)
}

export default AdditionalDetailSection

const styles = StyleSheet.create({
	card: { marginHorizontal: sizes.base, marginBottom: sizes.base },
	cardInner: { paddingVertical: sizes.base },
	total: { lineHeight: sizes.xl * 1.25 }
})