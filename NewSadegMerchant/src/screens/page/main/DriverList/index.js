import React, { useEffect } from 'react'
import { Image, View, ScrollView, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { BaseText, BaseHeader, BaseCard, ShadowView, BaseButton } from '@/components'
import { sizes, colors } from '@/constants'
import { getRestaurantDrivers } from '@/store/master'

/*
	'restaurant_id',
	'fullname',
	'email',
	'password',
	'phone_number',
	'vehicle_year',
	'vehicle_model',
	'driver_photo_file',
	'driver_licence_file',
*/

const DriverList = ({ navigation }) => {
	const dispatch = useDispatch()
	const { restaurant_drivers, isLoading } = useSelector(state => state.master)

	const toDriverForm = driver => e => {
		navigation.navigate('DriverForm', { initialForm: driver })
	}

	useEffect(() => {
		dispatch(getRestaurantDrivers())
	}, [])

	return (
		<ScrollView>
			<BaseHeader title="DRIVER LIST" withBack />

			{isLoading.restaurant_driver
				? <ActivityIndicator color={colors.green} />
				: restaurant_drivers.map(driver =>
					<BaseCard
						key={driver.id}
						padding="xxxs"
						style={{ margin: sizes.base, marginTop: 0 }}
						innerStyle={{ flexDirection: 'row' }}
						onPress={toDriverForm(driver)}
					>
						<ShadowView type="item" radius="xs" style={{ width: '25%', marginRight: sizes.xxs }}>
							<Image
								source={{ uri: driver.driver_photo }}
								style={{ minHeight: sizes.base * 4, width: '100%', borderRadius: sizes.xs }}
							/>
						</ShadowView>

						<View>
							<BaseText>
								{driver.fullname}
							</BaseText>
							<BaseText size="sm" type="semi-bold" color="gray">
								{driver.vehicle_year} {driver.vehicle_model}
							</BaseText> 
						</View>
					</BaseCard>
			)}

			<BaseButton
				title="+ New Driver" 
				shadowType="card" 
				color="green" 
				padding="base" 
				style={{ margin: sizes.base, marginTop: 0 }} 
				onPress={toDriverForm()}
			/>
		</ScrollView>
	)
}

export default DriverList