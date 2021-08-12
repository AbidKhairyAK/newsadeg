import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { BaseText, BaseHeader, BaseButton, ShadowView, FormInput, FormPicker, FormImage, HorizontalRule } from '@/components'
import { sizes, colors } from '@/constants'
import { useForm } from '@/hooks'
import { MenuService } from '@/services'
import { getMenus } from '@/store/master'
import { getUser, compressImage } from '@/helpers'

// menu data

const MenuForm = () => {
	const dispatch = useDispatch()
	const { goBack } = useNavigation()

	const { categories } = useSelector(state => state.master)
	const categoryOptions = categories.map(category => ({
		label: category.name,
		value: category.id,
		key: category.id,
	}))
	const { form, setFormInline, setForm, formErrors, validateForm, validateFormInline } = useForm({
		name: '',
		menu_category_id: null,
		description: '',
		price: '',
		image_file: null,
	}, {
		name: { presence: true, length: { maximum: 254 } },
		menu_category_id: { presence: true },
		description: { presence: false, length: { maximum: 254 } },
		price: { presence: true },
		image_file: { presence: true },
	})

	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = async () => {
		try {
			if (validateForm()) return

			setIsLoading(true)

			// 'restaurant_id', 'menu_category_id', 'name', 'description', 'image', 'image_thumbnail', 'price', 'status'
			const formData = new FormData()

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

			formData.append('restaurant_id', getUser().id)
			formData.append('menu_category_id', form.menu_category_id)
			formData.append('name', form.name)
			formData.append('description', form.description)
			formData.append('price', Number(form.price))
			// formData.append('price', parseFloat(form.price.replace(/,/ig, '')))
			formData.append('status', 'ready')

			await MenuService.create(formData)
			await dispatch(getMenus())

			setForm('reset')
			goBack()
		} catch (err) {
			console.error(err)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<ScrollView>
			<BaseHeader title="MENU FORM" withBack />

			<ShadowView type="card" radius="base" style={styles.wrapper}>
				<View style={styles.inner}>
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
					/>
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
						value={form.image_file}
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

				</View>
			</ShadowView>
		</ScrollView>
	)
}

export default MenuForm

const styles = StyleSheet.create({
	wrapper: { marginHorizontal: sizes.base, marginBottom: sizes.base },
	inner: { backgroundColor: colors.white, padding: sizes.base, borderRadius: sizes.base }
})