import React from 'react'
import { Image, View, StyleSheet } from 'react-native'

import { BaseText, BaseCard, ShadowView } from '@/components'
import { sizes } from '@/constants'

const DriverItem = ({ onPress, driver }) =>
	<BaseCard
		padding="xxxs"
		style={styles.card}
		innerStyle={styles.cardInner}
		onPress={onPress}
	>
		<ShadowView type="item" radius="xs" style={styles.imageWrapper}>
			<Image
				source={{ uri: driver.driver_photo }}
				style={styles.image}
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

export default DriverItem

const styles = StyleSheet.create({
	card: { margin: sizes.base, marginTop: 0 },
	cardInner: { flexDirection: 'row' },
	imageWrapper: { width: '25%', marginRight: sizes.xxs },
	image: { minHeight: sizes.base * 4, width: '100%', borderRadius: sizes.xs },
	
})