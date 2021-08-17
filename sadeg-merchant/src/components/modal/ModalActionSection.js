import React from 'react'
import { View, StyleSheet } from 'react-native'

import { BaseButton } from '@/components'
import { sizes } from '@/constants'

const ModalActionSection = ({ 
	isLoading,
	onPressPositive, 
	onPressNegative, 
	positiveTitle = 'Submit', 
	negativeTitle = 'Cancel', 
	positiveColor = 'green',
	negativeColor = 'red',
	space = sizes.xl 
}) =>
	<View style={styles.container(space)}>
		{onPressNegative && 
			<BaseButton
				isLoading={isLoading}
				onPress={onPressNegative}
				title={negativeTitle}
				bg={negativeColor}
				color="white"
				style={styles.button(space)}
			/>
		}
		{onPressPositive && 
			<BaseButton
				isLoading={isLoading}
				onPress={onPressPositive}
				title={positiveTitle}
				bg={positiveColor}
				color="white"
				style={styles.button(space)}
			/>
		}
	</View>

export default ModalActionSection

const styles = StyleSheet.create({
	container: space => ({ flexDirection: 'row', paddingHorizontal: space / 2, paddingTop: space / 2 }),
	button: space => ({ flex: 1, marginHorizontal: space / 2, marginBottom: space })
})