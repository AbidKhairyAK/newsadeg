import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { MenuService } from '@/services'
import { setMenus } from '@/store/master'

const crudLogic = ({ navigation, route }) => {
	const dispatch = useDispatch()
	const { id } = route.params
	const { menus } = useSelector(state => state.master)
	const menu = menus.find(item => item.id === id) || {}
	
	const [isLoading, setIsLoading] = useState({
		updateStatus: false,
		delete: false
	})

	const changeLoading = (type, status) => setIsLoading(prev => ({ ...prev, [type]: status }))

	const toggleMenuStatus = async () => {
		try {
			changeLoading('updateStatus', true)
			const updateTo = menu.status === 'ready' ? 'sold' : 'ready'
			const res = await MenuService.update(id, { status: updateTo })

			const cloneMenus = [...menus]
			cloneMenus[cloneMenus.findIndex(item => item.id === id)] = res
			dispatch(setMenus(cloneMenus))
		} catch (err) {
			console.error(err)
		} finally {
			changeLoading('updateStatus', false)
		}
	}

	const deleteMenu = async () => {
		try {
			changeLoading('delete', true)
			await MenuService.delete(id)

			const cloneMenus = [...menus]
			cloneMenus.splice(cloneMenus.findIndex(item => item.id === id), 1)
			dispatch(setMenus(cloneMenus))
			navigation.goBack()
		} catch (err) {
			console.error(err)
		} finally {
			changeLoading('delete', false)
		}
	}

	const confirmDelete = () => {
		navigation.navigate('ConfirmDangerDialog', {
			desc: 'Deleted menu can\'t be recovered',
			positiveTitle: 'Delete',
			onPressPositive: deleteMenu,
		})
	}

	const toMenuForm = () => navigation.navigate('MenuForm', { initialForm: menu })

	return { menu, isLoading, toggleMenuStatus, confirmDelete, toMenuForm }
}

export default crudLogic