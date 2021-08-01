import React, { useState } from 'react'
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native'

import { BaseText, BaseHeader, BaseIcon, FormInputCard, BaseButton, HorizontalRule } from '@/components'
import { sizes } from '@/constants'

const Register = ({ navigation }) => {
	const [hidePassword, setHidePassword] = useState(true)

	const toggleShowPassword = () => setHidePassword(prev => !prev)
	const toLoginScreen = () => navigation.navigate('Login')

	return (
		<ScrollView>
			<BaseHeader title="REGISTRATION FORM" />
			<View style={styles.wrapper}>
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
				<FormInputCard 
					label="Owner Name" 
					icon="person-outline" 
					placeholder="enter your full name ..." 
				/>
				<FormInputCard 
					label="Identity Card Number" 
					icon="card-outline" 
					placeholder="enter your id card number ..." 
				/>
				<FormInputCard 
					label="Phone Number" 
					icon="call-outline" 
					placeholder="enter your phone number (+966) ..." 
				/>

				<BaseButton 
					onPress={toLoginScreen}
					title="Register" 
					icon="cloud-upload-outline" 
					bg="green" 
					color="white" 
					radius="xl" 
				/>

				<HorizontalRule />

				<BaseText align="center" color="gray" size="sm" style={styles.loginCaption}>
					Already have an account?
				</BaseText>

				<BaseButton 
					onPress={toLoginScreen}
					title="Login" 
					icon="enter-outline" 
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
	loginCaption: { marginBottom: sizes.base },
	hidePassword: { padding: sizes.base, margin: sizes.base * -1 }
})