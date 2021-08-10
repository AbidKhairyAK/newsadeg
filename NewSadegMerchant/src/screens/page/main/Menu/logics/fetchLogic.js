import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getCategories } from '@/store/master'
import { MenuService } from '@/services'

const CATEGORY_ALL = { id: 'all', name: 'all' }

const fetchLogic = () => {
	const dispatch = useDispatch()
	const { categories: rawCategories } = useSelector(state => state.master)

	const categories = [CATEGORY_ALL, ...rawCategories]

	const [selectedCategory, setSelectedCategory] = useState(categories[0])
	const [rawMenus, setRawMenus] = useState([])
	const [menus, setMenus] = useState([])
	const [isLoading, setIsLoading] = useState({
		menu: false,
		category: false
	})

	const changeLoading = (type, status) => setIsLoading(prev => ({ ...prev, [type]: status }))

	const changeCategory = val => e => setSelectedCategory(val)

	const getMenuList = async () => {
		try {
			changeLoading('menu', true)
			const res = await MenuService.getList()
			setRawMenus(res)
			filterMenu(res)
		} catch (err) { 
			console.error(err) 
		} finally {
			changeLoading('menu', false)
		}
	}

	const getCategoryList = async () => {
		try {
			changeLoading('category', true)
			await dispatch(getCategories())
		} catch (err) { 
			console.error(err) 
		} finally {
			changeLoading('category', false)
		}
	}

	const filterMenu = (currentMenus = rawMenus) => {
		const filtered = selectedCategory.id === 'all'
			? currentMenus
			: currentMenus.filter(menu => menu.menu_category_id === selectedCategory.id)

		setMenus(filtered)
	}

	useEffect(() => {
		getCategoryList()
		getMenuList()
	}, [])

	useEffect(() => {
		filterMenu()
	}, [selectedCategory.id])

	return { isLoading, menus, categories, selectedCategory, changeCategory }
}

export default fetchLogic