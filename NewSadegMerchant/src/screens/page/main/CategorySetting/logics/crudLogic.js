import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { MenuCategoryService } from '@/services'
import { setCategories, getCategories } from '@/store/master'

const crudLogic = () => {
	const dispatch = useDispatch()
	const { categories } = useSelector(state => state.master)

	const [isLoading, setIsLoading] = useState({
		create: false,
		update: false,
		delete: false
	})

	const changeLoading = (type, status) => setIsLoading(prev => ({ ...prev, [type]: status }))

	const createCategory = async categoryName => {
		try {
			changeLoading('create', true)
			const res = await MenuCategoryService.create(categoryName)
			dispatch(setCategories([res, ...categories]))
		} catch (err) { 
			console.error(err) 
		} finally {
			changeLoading('create', false)
		}
	}

	const updateCategory = async (id, categoryName) => {
		try {
			changeLoading('update', id)
			await MenuCategoryService.update(id, categoryName)

			categories.find(item => item.id === id).name = categoryName
			dispatch(setCategories([...categories]))
		} catch (err) { 
			console.error(err) 
		} finally {
			changeLoading('update', false)
		}
	}

	const deleteCategory = async (id) => {
		try {
			changeLoading('delete', id)
			await MenuCategoryService.delete(id)

			const cloneCategories = [...categories]
			cloneCategories.splice(categories.findIndex(item => item.id === id), 1)
			dispatch(setCategories(cloneCategories))
		} catch (err) { 
			console.error(err) 
		} finally {
			changeLoading('delete', false)
		}
	}

	return { isLoading, categories, createCategory, updateCategory, deleteCategory }
}

export default crudLogic