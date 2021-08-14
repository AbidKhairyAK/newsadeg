import React from 'react'
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native'

import { BaseCard, BaseText, BaseHeader, BaseButton, ShadowView, FormInput, FormPicker, FormImage } from '@/components'
import { sizes, colors } from '@/constants'

import crudLogic from './logics/crudLogic'
import FormSection from './sections/FormSection'

const MenuForm = ({ route, navigation }) => {
	const { initialForm, categoryOptions, form, setFormInline, formErrors, validateFormInline, isLoading, handleSubmit, openNewCategoryModal } = crudLogic({ route, navigation })
	
	return (
		<ScrollView>
			<BaseHeader title="MENU FORM" withBack />

				<BaseCard padding="base" style={styles.card}>
					<FormSection
						initialForm={initialForm}
						form={form}
						formErrors={formErrors}
						setFormInline={setFormInline}
						validateFormInline={validateFormInline}
						categoryOptions={categoryOptions}
						openNewCategoryModal={openNewCategoryModal}
					/>

					<BaseButton
						title="Submit"
						icon="cloud-upload-outline"
						color="white"
						bg="green"
						isLoading={isLoading}
						onPress={handleSubmit}
					/>

				</BaseCard>
		</ScrollView>
	)
}

export default MenuForm

const styles = StyleSheet.create({
	card: { marginHorizontal: sizes.base, marginBottom: sizes.base },
})