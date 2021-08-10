import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { isEmpty } from 'validate.js'

import { ShadowView, FormInput, BaseButton } from '@/components'
import { sizes, colors } from '@/constants'

const ERR_MSG = 'This field is required'

const FormSection = ({ createCategory, isLoading }) => {
	const [inputValue, setInputValue] = useState('')
	const [isError, setIsError] = useState(false)

	const handleSubmit = async () => {
		try {
			if (isEmpty(inputValue)) return setIsError(true)
			else setIsError(false)
			
			await createCategory(inputValue)
			setInputValue('')
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<ShadowView type="card" radius="base" style={styles.shadow}>
			<View style={styles.inner}>
				<FormInput
					error={isError && ERR_MSG}
					value={inputValue}
					onChangeText={setInputValue}
					label="New Category"
					noMargin
					style={styles.input}
				/>
				<BaseButton
					isLoading={isLoading.create}
					onPress={handleSubmit}
					icon="add-outline"Snack
					bg="green"
					color="white"
					style={styles.button}
					innerStyle={styles.buttonInner}
				/>
			</View>
		</ShadowView>
	)
}

export default FormSection

const styles = StyleSheet.create({
	shadow: { marginBottom: sizes.base, marginHorizontal: sizes.base },
	inner: { backgroundColor: colors.white, padding: sizes.base, borderRadius: sizes.base, flexDirection: 'row' },
	input: { flex: 1 },
	button: { marginLeft: sizes.xs, marginTop: sizes.base * 1.8 },
	buttonInner: { paddingHorizontal: sizes.xs }
})