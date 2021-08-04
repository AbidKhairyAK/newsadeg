import React, { useRef } from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native'

import { BaseText, BaseButton, HorizontalRule } from '@/components'
import { sizes } from '@/constants'
import { getScreenSize } from '@/helpers'

import commonLogic from './logics/commonLogic'
import loginLogic from './logics/loginLogic'
import FormSection from './sections/FormSection'

const Login = () => {
	const animRef = useRef()
	const { toRegisterScreen } = commonLogic({ animRef })
	const { isLoading, form, setFormInline, handleLogin, validateFormInline, formErrors } = loginLogic()

	return (
		<ScrollView>
			<View style={styles.wrapper}>
				<LottieView
					ref={animRef}
					source={require('@/assets/animations/Koki.json')}
					style={styles.animation}
					loop
				/>

				<FormSection
					form={form}
					setFormInline={setFormInline}
					validateFormInline={validateFormInline}
					formErrors={formErrors}
				/>

				<BaseButton 
					isLoading={isLoading}
					onPress={handleLogin}
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
					disabled={isLoading}
					title="Register" 
					icon="cloud-upload-outline" 
					color="green" 
					radius="xl" 
				/>
			</View>
		</ScrollView>
	)
}

export default Login

const styles = StyleSheet.create({
	wrapper: { paddingHorizontal: sizes.base, paddingTop: sizes.base / 2, paddingBottom: sizes.base * 2 },
	animation: { width: getScreenSize().width, height: getScreenSize().width - sizes.base * 3, alignSelf: 'center', marginBottom: sizes.base * -1.5 },
	registerCaption: { marginBottom: sizes.base },
})