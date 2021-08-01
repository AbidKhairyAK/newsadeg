import React, { useState } from 'react'
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native'
import LottieView from 'lottie-react-native'

import { BaseText, BaseIcon, FormInputCard, BaseButton, HorizontalRule } from '@/components'
import { sizes } from '@/constants'
import { getScreenSize } from '@/helpers'

const Register = ({ navigation }) => {
	const [hidePassword, setHidePassword] = useState(true)

	const toggleShowPassword = () => setHidePassword(prev => !prev)
	const toRegisterScreen = () => navigation.navigate('Register')
	const toMainScreens = () => navigation.navigate('MainScreens')

	return (
		<ScrollView>
			<View style={styles.wrapper}>
				<LottieView
					source={require('@/assets/animations/Koki.json')}
					style={styles.animation}
					autoPlay
					loop
				/>

				<FormInputCard 
					label="Email" 
					icon="mail-outline" 
					placeholder="enter your email ..." 
				/>
				<FormInputCard 
					label="Password" 
					icon="lock-closed-outline" 
					placeholder="enter your password ..."
					secureTextEntry={hidePassword}
				>
					<TouchableOpacity onPress={toggleShowPassword} style={styles.hidePassword}>
						<BaseIcon 
							name={hidePassword ? 'eye-off-outline' : 'eye-outline'} 
							size="lg" 
							color={hidePassword ? 'gray' : 'green'}
						/>
					</TouchableOpacity>
				</FormInputCard>

				<BaseButton 
					onPress={toMainScreens}
					title="Login" 
					icon="enter-outline" 
					bg="green" 
					color="white" 
					radius="xl" 
				/>

				<HorizontalRule />

				<BaseText align="center" color="gray" size="sm" style={styles.registerCaption}>
					Doesn't have an account yet?
				</BaseText>

				<BaseButton 
					onPress={toRegisterScreen}
					title="Register" 
					icon="cloud-upload-outline" 
					color="green" 
					radius="xl" 
				/>
			</View>
		</ScrollView>
	)
}

export default Register

const styles = StyleSheet.create({
	wrapper: { paddingHorizontal: sizes.base, paddingTop: sizes.base / 2, paddingBottom: sizes.base * 2 },
	animation: { width: getScreenSize().width, height: getScreenSize().width - sizes.base * 3, alignSelf: 'center', marginBottom: sizes.base * -1.5 },
	registerCaption: { marginBottom: sizes.base },
	hidePassword: { padding: sizes.base, margin: sizes.base * -1 }
})