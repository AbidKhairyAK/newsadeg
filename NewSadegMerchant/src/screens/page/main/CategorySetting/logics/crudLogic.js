import React, { useState, useEffect } from 'react'

import { MenuCategoryService } from '@/services'

const crudLogic = () => {
	const [categories, setCategories] = useState([])
	const [isLoading, setIsLoading] = useState({
		create: false,
		read: false,
		update: false,
		delete: false
	})

	const changeLoading = (type, status) => setIsLoading(prev => ({ ...prev, [type]: status }))

	const getCategoryList = async () => {
		try {
			changeLoading('read', true)
			const res = await MenuCategoryService.getList()
			setCategories(res)
		} catch (err) { console.error(err) } finally {
			changeLoading('read', false)
		}
	}

	const createCategory = async categoryName => {
		try {
			changeLoading('create', true)
			const res = await MenuCategoryService.create(categoryName)
			setCategories(prev => ([res, ...prev]))
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
			setCategories([...categories])
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

			categories.splice(categories.findIndex(item => item.id === id), 1)
			setCategories([...categories])
		} catch (err) { 
			console.error(err) 
		} finally {
			changeLoading('delete', false)
		}
	}

	useEffect(() => {
		getCategoryList()
	}, [])

	return { isLoading, categories, createCategory, updateCategory, deleteCategory }
}

export default crudLogic