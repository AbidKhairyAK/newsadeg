import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { BaseText, BaseButton, BaseCard, HorizontalRule } from '@/components'
import { colors, sizes } from '@/constants'

const timeOptions = [2, 5, 10, 15, 20, 30]

const FormSection = ({ changeCookingTime, cookingTime }) => {
	return (
		<BaseCard style={styles.card}>
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
					bg="darkGray"
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
							key={time + (time === cookingTime ? 1 : 0)} 
							onPress={changeCookingTime(time)} 
							title={time + ' Minutes'} 
							bg={time === cookingTime ? 'green' : 'darkGray'} 
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