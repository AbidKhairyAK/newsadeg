import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'

import { BaseButton } from '@/components'
import { sizes } from '@/constants'
import { logout } from '@/store/auth'

const LogoutButton = () => {
	const dispatch = useDispatch()

	const handleLogout = () => dispatch(logout())

	return <BaseButton
		style={styles.button}
		title="Logout"
		icon="log-out-outline"
		color="red"
		shadowType="card"
		radius="base"
		padding="base"
		onPress={handleLogout}
	/>
}

export default LogoutButton

const styles = StyleSheet.create({
	button: { margin: sizes.base, marginTop: 0 }
})