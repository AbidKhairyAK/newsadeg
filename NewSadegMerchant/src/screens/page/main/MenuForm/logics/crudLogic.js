import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isEmpty } from 'validate.js'

import { useForm } from '@/hooks'
import { MenuService } from '@/services'
import { getMenus, setMenus } from '@/store/master'
import { getUser, compressImage } from '@/helpers'

const crudLogic = ({ route, navigation }) => {
	const dispatch = useDispatch()
	const { initialForm = {} } = route.params || {}

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
			navigation.goBack()
		} catch (err) {
			console.error(err)
		} finally {
			setIsLoading(false)
		}
	}

	const openNewCategoryModal = () => navigation.navigate('NewCategoryForm')

	return { initialForm, categoryOptions, form, setFormInline, formErrors, validateFormInline, isLoading, handleSubmit, openNewCategoryModal }
}

export default crudLogic