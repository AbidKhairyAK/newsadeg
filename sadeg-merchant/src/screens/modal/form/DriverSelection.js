import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { isEmpty } from 'validate.js'
import { useSelector, useDispatch } from 'react-redux'

import { ModalForm, DriverItem } from '@/components'
import { colors, sizes } from '@/constants'
import { getRestaurantDrivers } from '@/store/master'

const DriverSelection = ({ navigation, route }) => {
	const dispatch = useDispatch()
	const { restaurant_drivers, isLoading } = useSelector(state => state.master)

	const { onSelectDriver } = route.params || {}

	const selectDriver = driver => e => {
		onSelectDriver(driver.id)
		navigation.goBack()
	}

	useEffect(() => {
		if (isEmpty(restaurant_drivers)) dispatch(getRestaurantDrivers())
	}, [])

	return (
		<ModalForm title="Select Driver Restaurant">
			{isLoading.restaurant_driver
				? <ActivityIndicator color={colors.green} />
				: restaurant_drivers.map(driver => 
					<DriverItem 
						key={driver.id}
						driver={driver} 
						onPress={selectDriver(driver)} 
						style={{ margin: 0, marginBottom: sizes.base }}
					/>
			)}
		</ModalForm>
	)
}

export default DriverSelection