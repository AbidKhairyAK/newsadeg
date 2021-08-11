import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'

import { BaseText, BaseHeader, BaseButton, ShadowView, FormInput, FormPicker, FormImage, HorizontalRule } from '@/components'
import { sizes, colors } from '@/constants'
import { useForm } from '@/hooks'

// menu data
// 'restaurant_id', 'menu_category_id', 'name', 'description', 'image', 'image_thumbnail', 'price', 'status'

const MenuForm = () => {
	const { categories } = useSelector(state => state.master)
	const categoryOptions = categories.map(category => ({
		label: category.name,
		value: category.id
	}))
	const { form, setFormInline, formErrors, validateForm, validateFormInline } = useForm({
		name: '',
		menu_category_id: null,
		description: '',
		price: '',
		image: null,
	}, {
		name: { presence: true, length: { maximum: 254 } },
		menu_category_id: { presence: true },
		description: { presence: false, length: { maximum: 254 } },
		price: { presence: true, length: { maximum: 254 } },
		image: { presence: true, length: { maximum: 254 } },
	})

	return (
		<ScrollView>
			<BaseHeader title="MENU FORM" withBack />

			<ShadowView type="card" radius="base" style={styles.wrapper}>
				<View style={styles.inner}>
					<FormInput 
						value={form.name}
						error={formErrors.name}
						onChangeText={setFormInline('name')}
						onEndEditing={validateFormInline('name')}
						label="Menu Name" 
					/>
					<FormPicker
						value={form.menu_category_id}
						error={formErrors.menu_category_id}
						onValueChange={setFormInline('menu_category_id')}
						label="Category"
						items={categoryOptions}
					/>
					<FormInput 
						value={form.description}
						error={formErrors.description}
						onChangeText={setFormInline('description')}
						onEndEditing={validateFormInline('description')}
						label="Description"
						optional
						multiline
						numberOfLines={3}
						inputStyle={{ textAlignVertical: 'top' }}
					/>
					<FormInput 
						value={form.price}
						error={formErrors.price}
						onChangeText={setFormInline('price')}
						onEndEditing={validateFormInline('price')}
						label="Price" 
						keyboardType="number-pad"
						placeholder="e.g. 30,000.50"
					/>
					<FormImage
						value={form.image}
						error={formErrors.image}
						onChangeImage={setFormInline('image')}
						label="Menu Image"
					/>

					<HorizontalRule />

					<BaseButton title="Submit" icon="cloud-upload-outline" color="white" bg="green" />

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