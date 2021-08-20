import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { BaseText, BaseButton, BaseCard, HorizontalRule } from '@/components'
import { colors, sizes } from '@/constants'
import { toTitleCase } from '@/helpers'

const timeOptions = ['2', '5', '10', '15', '20', '30']
const driverOptions = ['driver_partner', 'driver_restaurant']

const FormSection = ({ changeCookingTime, cookingTime, driverType, changeDriverType }) => {
	return (
		<BaseCard style={styles.card}>
			<BaseText size="sm">
				Driver Option
			</BaseText>
			<View style={styles.optionWrapper}>
				{driverOptions.map(driver =>
					<BaseButton
						key={driver}
						title={toTitleCase(driver)}
						bg={driver === driverType ? 'green' : 'shallowGray'}
						color="white"
						size="sm"
						style={styles.driverOption}
						onPress={changeDriverType(driver)}
					/>
				)}
			</View>

			<HorizontalRule />

			<BaseText size="sm">
				Estimated Cooking Time
			</BaseText>
			{[...new Array(2).keys()].map(val =>
				<View key={val} style={styles.optionWrapper}>
					{timeOptions.slice(val * 3, val * 3 + 3).map(time =>					
						<BaseButton 
							key={time} 
							onPress={changeCookingTime(time)} 
							title={time + ' Minutes'} 
							bg={time === cookingTime ? 'green' : 'shallowGray'} 
							color="white" 
							size="sm" 
							style={styles.timeOption} 
						/>
					)}
				</View>
			)}
		</BaseCard>
	)
}

export default FormSection

const styles = StyleSheet.create({
	card: { marginHorizontal: sizes.base, marginBottom: sizes.base },
	optionWrapper: { flexDirection: 'row', justifyContent: 'space-between', marginTop: sizes.xs },
	driverOption: { width: '47.5%' },
	timeOption: { width: '30%' }
})