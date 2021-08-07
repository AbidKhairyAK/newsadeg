import React, { useState } from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'

import { BaseText, BaseHeader, BaseButton, HorizontalRule } from '@/components'
import { sizes } from '@/constants'

import registerLogic from './logics/registerLogic'
import FormSection from './sections/FormSection'

const Register = ({ navigation }) => {
	const { form, setFormInline, handleRegister, isLoading, validateFormInline, formErrors } = registerLogic()

	const toLoginScreen = () => navigation.navigate('Login')

	return (
		<ScrollView>
			<BaseHeader title="REGISTRATION FORM" />
			<View style={styles.wrapper}>
				<FormSection 
					form={form} 
					setFormInline={setFormInline} 
					validateFormInline={validateFormInline}
					formErrors={formErrors}
				/>

				<BaseButton 
					onPress={handleRegister}
					isLoading={isLoading}
					title="Register" 
					icon="cloud-upload-outline" 
					bg="green" 
					color="white" 
					radius={sizes.base * 1.4} 
				/>

				<HorizontalRule />

				<BaseText align="center" color="gray" size="sm" style={styles.loginCaption}>
					Already have an account?
				</BaseText>

				<BaseButton 
					onPress={toLoginScreen}
					disabled={isLoading}
					title="Login" 
					icon="enter-outline" 
					color="green" 
					radius={sizes.base * 1.4} 
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