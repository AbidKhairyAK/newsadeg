import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { sizes } from '@/constants'

import AdditionalSettingItem from '../components/AdditionalSettingItem'

const AdditionalSettings = () => {
	const { navigate } = useNavigation()
	const toDriverList = () => navigate('DriverList')
	const toInsight = () => alert('this feature is under development')

	return (
		<View style={styles.container}>
			<AdditionalSettingItem
				title="Driver List"
				icon="car-sport-outline"
				onPress={toDriverList}
			/>
			<AdditionalSettingItem
				title="View Insight"
				icon="bar-chart-outline"
				onPress={toInsight}
			/>
		</View>
	)
}

export default AdditionalSettings

const styles = StyleSheet.create({
	container: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: sizes.base, marginBottom: sizes.base * 1.75 }
})