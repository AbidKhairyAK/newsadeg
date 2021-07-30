import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { BaseText, BaseButton, ShadowView, HorizontalRule } from '@/components'
import { colors, sizes } from '@/constants'

const timeOptions = [2, 5, 10, 15, 20, 30]

const FormSection = () => {
	const [selectedTime, setSelectedTime] = useState()

	const changeSelectedTIme = val => e => setSelectedTime(val)

	return (
		<ShadowView type="card" style={styles.container}>
			<BaseText size="sm">
				Driver Option
			</BaseText>
			<View style={styles.optionWrapper}>
				<BaseButton
					title="Driver Partner"
					bg="green"
					color="white"
					size="sm"
					style={styles.driverOption}
				/>
				<BaseButton
					title="Driver Restaurant"
					bg="lightGray"
					color="white"
					size="sm"
					style={styles.driverOption}
				/>
			</View>

			<HorizontalRule />

			<BaseText size="sm">
				Estimated Cooking Time
			</BaseText>
			{[...new Array(2).keys()].map(val =>
				<View key={val} style={styles.optionWrapper}>
					{timeOptions.slice(val * 3, val * 3 + 3).map(time =>					
						<BaseButton 
							key={time + (time === selectedTime ? 1 : 0)} 
							onPress={changeSelectedTIme(time)} 
							title={time + ' Minutes'} 
							bg={time === selectedTime ? 'green' : 'lightGray'} 
							color="white" 
							size="sm" 
							style={styles.timeOption} 
						/>
					)}
				</View>
			)}
		</ShadowView>
	)
}

export default FormSection

const styles = StyleSheet.create({
	container: { borderRadius: sizes.base, marginHorizontal: sizes.base, marginBottom: sizes.base, padding: sizes.xs },
	optionWrapper: { flexDirection: 'row', justifyContent: 'space-between', marginTop: sizes.xs },
	driverOption: { width: '47.5%' },
	timeOption: { width: '30%' }
})