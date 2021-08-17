import React, { useEffect } from 'react'
import { ScrollView, ActivityIndicator, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { DriverItem, BaseHeader, BaseButton } from '@/components'
import { sizes, colors } from '@/constants'
import { getRestaurantDrivers } from '@/store/master'

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
					<DriverItem 
						key={driver.id}
						driver={driver} 
						onPress={toDriverForm(driver)} 
					/>
			)}

			<BaseButton
				title="+ New Driver" 
				shadowType="card" 
				color="green" 
				padding="base" 
				style={styles.addButton} 
				onPress={toDriverForm()}
			/>
		</ScrollView>
	)
}

export default DriverList

const styles = StyleSheet.create({
	addButton: { margin: sizes.base, marginTop: 0 }
})