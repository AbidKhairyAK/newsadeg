import React, { useRef, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import LottieView from 'lottie-react-native'
import Swiper from 'react-native-swiper'

import { BaseText, BaseButton } from '@/components'
import { sizes } from '@/constants'
import { getScreenSize } from '@/helpers'
import { storage } from '@/utils'

const anims = [
	{
		caption: 'Serve your food well with sadeg', 
		source: require('@/assets/animations/mobil.json') 
	},
	{
		caption: 'Your honesty and integrity is the secret of your success', 
		source: require('@/assets/animations/Kasir.json') 
	}
]

const Onboarding = ({ navigation }) => {
	const swiperRef = useRef()

	const [currentAnim, setCurrentAnim] = useState(0)
	const [animStates, setAnimStates] = useState([
		false,
		false
	])

	useEffect(() => {
		setAnimStates(prev => {
			const copyPrev = [...prev]
			copyPrev[currentAnim] = true
			return copyPrev
		})
	}, [])

	const isLastAnim = currentAnim === anims.length - 1

	const buttonTitle = isLastAnim ? 'Get Started' : 'Next'

	const handleButton = () => {
		setAnimStates(prev => {
			const copyPrev = [...prev]
			copyPrev[currentAnim] = false
			if (!isLastAnim) copyPrev[currentAnim + 1] = true
			return copyPrev
		})

		if (isLastAnim) {
			navigation.replace('Register')
			storage.setItem('isAppHasBeenOpened', true)
		} else {
			setCurrentAnim(prev => prev + 1)
			swiperRef.current.scrollBy(1)
		}
	}

	return <>
		<Swiper ref={swiperRef} scrollEnabled={false}>
			{anims.map(({ caption, source }, index) =>
				<View key={index} style={styles.swiperItem}>
					<View style={styles.animWrapper}>
						<LottieView 
							key={'anim' + index + animStates[index]} 
							autoPlay={animStates[index]} 
							source={source} 
							loop 
							style={styles.anim}
						/>
					</View>

					<View style={styles.captionWrapper}>
						<BaseText align="center">
							{caption}
						</BaseText>
					</View>
				</View>
			)}
		</Swiper>

		<BaseButton
			title={buttonTitle}
			bg="green"
			color="white"
			style={styles.button}
			onPress={handleButton}
		/>
	</>
}

export default Onboarding

const styles = StyleSheet.create({
	swiperItem: { flex: 1, justifyContent: 'center', alignItems: 'center' },
	animWrapper: { flex: 2, justifyContent: 'flex-end', paddingBottom: sizes.base * 3 },
	anim: { height: getScreenSize().width / 2, width: '100%' },
	captionWrapper: { flex: 1, paddingHorizontal: sizes.base * 3 },
	button: { margin: sizes.base * 2, marginTop: 0 }
})