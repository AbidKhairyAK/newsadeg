import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

import { BaseText, ShadowView } from '@/components'
import { sizes, colors } from '@/constants'

import BalanceInfo from '../components/BalanceInfo'

const HeaderSection = () => {
	return (
		<ShadowView type="cardHard" style={styles.container}>
			<Image
				source={{ uri: 'https://source.unsplash.com/640x360/?cafe' }}
				style={styles.banner}
			/>
			
			<View style={styles.overlay}>
				<BaseText color="white" type="bold" size="xl" align="center" style={styles.restaurantName}>
					Mie Eyang Sugeng
				</BaseText>
			</View>

			<BalanceInfo />
		</ShadowView>
	)
}

export default HeaderSection

const styles = StyleSheet.create({
	container: { marginBottom: sizes.base * 3.5, borderRadius: sizes.base, position: 'relative' },
	banner: { height: sizes.base * 12, borderBottomLeftRadius: sizes.base, borderBottomRightRadius: sizes.base },
	overlay: { justifyContent: 'center', alignItems: 'center', position: 'absolute', backgroundColor: colors.black + '99', top: 0, bottom: 0, left: 0, right: 0, borderBottomLeftRadius: sizes.base, borderBottomRightRadius: sizes.base },
	restaurantName: { marginBottom: sizes.base * 3, width: '75%' }
})