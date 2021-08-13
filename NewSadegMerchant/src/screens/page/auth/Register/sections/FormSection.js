import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'

import { FormInputCard, BaseIcon } from '@/components'
import { sizes } from '@/constants'

const FormSection = ({ form, setFormInline, formErrors, validateFormInline }) => {
	const [hidePassword, setHidePassword] = useState(true)

	const toggleShowPassword = () => setHidePassword(prev => !prev)

	return <>
		<FormInputCard 
			value={form.email}
			error={formErrors.email}
			onChangeText={setFormInline('email')}
			onEndEditing={validateFormInline('email')}
			label="Email" 
			icon="mail-outline" 
			placeholder="enter your email ..." 
			keyboardType="email-address"
			autoCapitalize="none"
		/>
		<FormInputCard 
			value={form.password}
			error={formErrors.password}
			onChangeText={setFormInline('password')}
			onEndEditing={validateFormInline('password')}
			label="Password" 
			icon="lock-closed-outline" 
			placeholder="enter your password ..."
			secureTextEntry={hidePassword}
		>
			<TouchableOpacity  onPress={toggleShowPassword} style={styles.hidePassword}>
				<BaseIcon 
					name={hidePassword ? 'eye-off-outline' : 'eye-outline'} 
					size="lg" 
					color={hidePassword ? 'gray' : 'green'}
				/>
			</TouchableOpacity>
		</FormInputCard>
		<FormInputCard 
			value={form.owner_name}
			error={formErrors.owner_name}
			onChangeText={setFormInline('owner_name')}
			onEndEditing={validateFormInline('owner_name')}
			label="Owner Name" 
			icon="person-outline" 
			placeholder="enter your full name ..." 
			autoCapitalize="words"
		/>
		<FormInputCard 
			value={form.identity_card_number}
			error={formErrors.identity_card_number}
			onChangeText={setFormInline('identity_card_number')}
			onEndEditing={validateFormInline('identity_card_number')}
			label="Identity Card Number" 
			icon="card-outline" 
			placeholder="enter your id card number ..." 
			keyboardType="number-pad"
		/>
		<FormInputCard 
			value={form.phone_number}
			error={formErrors.phone_number}
			onChangeText={setFormInline('phone_number')}
			onEndEditing={validateFormInline('phone_number')}
			label="Phone Number" 
			icon="call-outline" 
			placeholder="enter your phone number (+966) ..." 
			keyboardType="number-pad"
		/>
	</>
}

export default FormSection

const styles = StyleSheet.create({
	hidePassword: { padding: sizes.base, margin: sizes.base * -1 }
})