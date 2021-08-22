import React, { useState } from 'react'
import { ScrollView, View, TouchableOpacity, StyleSheet } from 'react-native'
import { isEmpty } from 'validate.js'

import { FormInput, BaseHeader, BaseText, BaseIcon, FormImage, BaseButton, BaseCard } from '@/components'
import { sizes, colors } from '@/constants'

import crudLogic from './logics/crudLogic'
import FormSection from './sections/FormSection'

const DriverForm = ({ route, navigation }) => {
	const {
		initialForm,
		form,
		setFormInline,
		validateFormInline,
		formErrors,
		isLoading,
		handleSubmit,
	} = crudLogic({ route, navigation })
	
	return (
		<ScrollView>
			<BaseHeader title="RESTAURANT DATA FORM" withBack />

			<BaseCard padding="base" style={styles.card}>
				<FormSection
					initialForm={initialForm}
					form={form}
					setFormInline={setFormInline}
					validateFormInline={validateFormInline}
					formErrors={formErrors}
				/>

				<BaseButton
					title="Submit"
					icon="cloud-upload-outline"
					bg="green"
					color="white"
					isLoading={isLoading}
					onPress={handleSubmit}
				/>
			</BaseCard>
		</ScrollView>
	)
} 

export default DriverForm

const styles = StyleSheet.create({
	card: { margin: sizes.base, marginTop: 0 },
	passwordWrapper: { flexDirection: 'row' },
	passwordInput: { flex: 1 },
	passwordButton: { paddingHorizontal: sizes.xs, alignSelf: 'stretch', justifyContent: 'center', paddingTop: sizes.xs },
	vehicleWrapper: { flexDirection: 'row', marginTop: sizes.xxxs, marginHorizontal: sizes.xs / -2 },
	vehicleYear: { marginHorizontal: sizes.xs / 2, width: '25%' },
	vehicleModel: { marginHorizontal: sizes.xs / 2, flex: 1 },
	deleteButton: { marginTop: sizes.base }
})