import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'

import { FormInputCard, BaseIcon } from '@/components'
import { sizes } from '@/constants'

const FormSection = ({ form, setFormInline, validateFormInline, formErrors }) => {
	const [isShowPassword, setShowPassword] = useState(false)

	const toggleShowPassword = () => setShowPassword(prev => !prev)

	return <>
		<FormInputCard 
			value={form.email}
			error={formErrors.email}
			onChangeText={setFormInline('email')}
			onEndEditing={validateFormInline('email')}
			label="Email" 
			icon="mail-outline" 
			placeholder="enter your email ..." 
		/>
		<FormInputCard 
			value={form.password}
			error={formErrors.password}
			onChangeText={setFormInline('password')}
			onEndEditing={validateFormInline('password')}
			label="Password" 
			icon="lock-closed-outline" 
			placeholder="enter your password ..."
			secureTextEntry={!isShowPassword}
		>
			<TouchableOpacity onPress={toggleShowPassword} style={styles.showPassword}>
				<BaseIcon 
					name={isShowPassword ? 'eye-outline' : 'eye-off-outline'} 
					size="lg" 
					color={isShowPassword ? 'green' : 'gray'}
				/>
			</TouchableOpacity>
		</FormInputCard>
	</>
}

export default FormSection

const styles = StyleSheet.create({
	showPassword: { padding: sizes.base, margin: sizes.base * -1 }
})