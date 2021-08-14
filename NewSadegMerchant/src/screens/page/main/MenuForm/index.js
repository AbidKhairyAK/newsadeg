
import React, { useState } from 'react'
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { isEmpty } from 'validate.js'

import { BaseCard, BaseText, BaseHeader, BaseButton, ShadowView, FormInput, FormPicker, FormImage } from '@/components'
import { sizes, colors } from '@/constants'
import { useForm } from '@/hooks'
import { MenuService } from '@/services'
import { getMenus, setMenus } from '@/store/master'
import { getUser, compressImage } from '@/helpers'

const MenuForm = ({ route }) => {
	const dispatch = useDispatch()
	const { goBack, navigate } = useNavigation()
	const initialForm = route.params?.initialForm || {}

	const { categories, menus } = useSelector(state => state.master)
	const categoryOptions = categories.map(category => ({
		label: category.name,
		value: category.id,
		key: category.id,
	}))
	const { form, setFormInline, resetForm, formErrors, validateForm, validateFormInline, getFormData } = useForm({
		restaurant_id: getUser().id,
		name: initialForm.name || '',
		menu_category_id: initialForm.menu_category_id || null,
		description: initialForm.description || '',
		price: initialForm.price?.toString() || '',
		status: initialForm.status || 'ready',
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

			const formData = getFormData({
				price: parseInt(form.price)
			})

			if (form.image_file) {
				const thumbnail = await compressImage(form.image_file)

				formData.append('image_thumbnail_file', {
					uri: thumbnail.uri,
					name: thumbnail.fileName,
					type: thumbnail.type,
				})
			}

			if (isEmpty(initialForm)) {
				const res = await MenuService.create(getFormData())
				dispatch(setMenus([res, ...menus]))
			} else {
				const res = await MenuService.update(initialForm.id, getFormData())
				const copiedData = [...menus]
				copiedData[copiedData.findIndex(item => item.id === initialForm.id)] = res
				dispatch(setMenus(copiedData))
			}

			resetForm()
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