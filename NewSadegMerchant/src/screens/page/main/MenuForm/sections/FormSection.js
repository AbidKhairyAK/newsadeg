import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { BaseText, FormInput, FormPicker, FormImage } from '@/components'
import { sizes } from '@/constants'

const FormSection = ({ initialForm, form, formErrors, setFormInline, validateFormInline, categoryOptions, openNewCategoryModal }) => <>
	<FormInput 
		label="Menu Name" 
		value={form.name}
		error={formErrors.name}
		onChangeText={setFormInline('name')}
		onEndEditing={validateFormInline('name')}
	/>
	<FormPicker
		label="Category"
		value={form.menu_category_id}
		error={formErrors.menu_category_id}
		onValueChange={setFormInline('menu_category_id')}
		items={categoryOptions}
		noMargin
	/>

	<TouchableOpacity onPress={openNewCategoryModal} style={{ paddingBottom: sizes.base, paddingTop: sizes.xxxs, alignSelf: 'flex-start' }}>
		<BaseText color="green" size="xs" type="semi-bold">
			+ New Category
		</BaseText>
	</TouchableOpacity>

	<FormInput 
		label="Description"
		value={form.description}
		error={formErrors.description}
		onChangeText={setFormInline('description')}
		onEndEditing={validateFormInline('description')}
		optional
		multiline
		numberOfLines={3}
		inputStyle={{ textAlignVertical: 'top' }}
	/>
	<FormInput 
		label="Price" 
		value={form.price}
		error={formErrors.price}
		onChangeText={setFormInline('price')}
		onEndEditing={validateFormInline('price')}
		keyboardType="number-pad"
		placeholder="e.g. 30,000.50"
	/>
	<FormImage
		label="Menu Image"
		initialImage={initialForm.image}
		error={formErrors.image_file}
		onChangeImage={setFormInline('image_file', true)}
	/>
</>

export default FormSection