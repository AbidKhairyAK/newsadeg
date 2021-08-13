import React, { useState } from 'react'
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { isEmpty } from 'validate.js'

import { BaseCard, BaseText, BaseHeader, BaseButton, ShadowView, FormInput, FormPicker, FormImage, HorizontalRule } from '@/components'
import { sizes, colors } from '@/constants'
import { useForm } from '@/hooks'
import { MenuService } from '@/services'
import { getMenus } from '@/store/master'
import { getUser, compressImage } from '@/helpers'

const MenuForm = ({ route }) => {
	const dispatch = useDispatch()
	const { goBack, navigate } = useNavigation()
	const initialForm = route.params?.initialForm || {}

	const { categories } = useSelector(state => state.master)
	const categoryOptions = categories.map(category => ({
		label: category.name,
		value: category.id,
		key: category.id,
	}))
	const { form, setFormInline, setForm, formErrors, validateForm, validateFormInline } = useForm({
		name: initialForm.name || '',
		menu_category_id: initialForm.menu_category_id || null,
		description: initialForm.description || '',
		price: initialForm.price?.toString() || '',
		image_file: null,
	}, {
		name: { presence: true, length: { maximum: 254 } },
		menu_category_id: { presence: true },
		description: { presence: false, length: { maximum: 254 } },
		price: { presence: true },
		image_file: { presence: isEmpty(initialForm) },
	})

	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = async () => {
		try {
			if (validateForm()) return

			setIsLoading(true)

			const formData = new FormData()

			formData.append('restaurant_id', getUser().id)
			formData.append('menu_category_id', form.menu_category_id)
			formData.append('name', form.name)
			formData.append('description', form.description)
			formData.append('price', parseInt(form.price))
			// formData.append('price', parseFloat(form.price.replace(/,/ig, '')))
			formData.append('status', initialForm.status || 'ready')

			if (form.image_file) {
				const thumbnail = await compressImage(form.image_file)

				formData.append('image_file', {
					uri: form.image_file.uri,
					name: form.image_file.fileName,
					type: form.image_file.type,
				})
				formData.append('image_thumbnail_file', {
					uri: thumbnail.uri,
					name: thumbnail.fileName,
					type: thumbnail.type,
				})
			}

			if (isEmpty(initialForm)) await MenuService.create(formData)
			else await MenuService.update(initialForm.id, formData)
			
			await dispatch(getMenus())

			setForm('reset')
			goBack()
		} catch (err) {
			console.error(err)
		} finally {
			setIsLoading(false)
		}
	}

	const openNewCategoryModal = () => navigate('NewCategoryForm')

	return (
		<ScrollView>
			<BaseHeader title="MENU FORM" withBack />

				<BaseCard padding="base" style={styles.card}>
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
						onChangeImage={setFormInline('image_file')}
					/>

					<HorizontalRule />

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