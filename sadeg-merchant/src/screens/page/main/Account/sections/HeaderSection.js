import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

import { BaseText, ShadowView } from '@/components'
import { sizes, colors } from '@/constants'

import BalanceInfo from '../components/BalanceInfo'

const HeaderSection = () => {
	const { restaurant_name, banner_restaurant } = useSelector(state => state.restaurant)

	return (
		<ShadowView type="cardHard" radius="base" style={styles.container}>
			<View style={styles.inner}>
				<Image
					source={{ uri: banner_restaurant }}
					style={styles.banner}
				/>
				
				<View style={styles.overlay}>
					<BaseText color="white" type="bold" size="xl" align="center" style={styles.restaurantName}>
						{restaurant_name}
					</BaseText>
				</View>

				<BalanceInfo />
			</View>
		</ShadowView>
	)
}

export default HeaderSection

const styles = StyleSheet.create({
	container: { marginBottom: sizes.base * 3.5 },
	inner: { borderRadius: sizes.base },
	banner: { height: sizes.base * 12, borderBottomLeftRadius: sizes.base, borderBottomRightRadius: sizes.base },
	overlay: { justifyContent: 'center', alignItems: 'center', position: 'absolute', backgroundColor: colors.black + '99', top: 0, bottom: 0, left: 0, right: 0, borderBottomLeftRadius: sizes.base, borderBottomRightRadius: sizes.base },
	restaurantName: { marginBottom: sizes.base * 3, width: '75%' }
})