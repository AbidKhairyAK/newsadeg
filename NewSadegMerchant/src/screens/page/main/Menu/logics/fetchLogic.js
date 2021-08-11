import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getCategories, getMenus } from '@/store/master'

const CATEGORY_ALL = { id: 'all', name: 'all' }

const fetchLogic = () => {
	const dispatch = useDispatch()

	const { categories: rawCategories, menus: rawMenus } = useSelector(state => state.master)

	const categories = [CATEGORY_ALL, ...rawCategories]

	const [selectedCategory, setSelectedCategory] = useState(categories[0])

	const changeCategory = val => e => setSelectedCategory(val)

	const menus = selectedCategory.id === 'all'
		? rawMenus
		: rawMenus.filter(menu => menu.menu_category_id === selectedCategory.id)

	useEffect(() => {
		dispatch(getMenus())
		dispatch(getCategories())
	}, [])

	return { menus, categories, selectedCategory, changeCategory }
}

export default fetchLogic