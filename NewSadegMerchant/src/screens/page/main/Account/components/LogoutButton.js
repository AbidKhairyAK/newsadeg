import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'

import { BaseText, BaseIcon, ShadowView } from '@/components'
import { sizes } from '@/constants'
import { logout } from '@/store/auth'

const LogoutButton = () => {
	const dispatch = useDispatch()

	const handleLogout = () => dispatch(logout())

	return (
		<ShadowView type="card" style={styles.container}>
			<TouchableOpacity delayPressIn={100} onPress={handleLogout}>
				<View style={styles.inner}>
					<BaseIcon name="log-out-outline" color="red" style={styles.icon} />
					<BaseText type="semi-bold" align="center" color="red">
						Logout
					</BaseText>
				</View>
			</TouchableOpacity>
		</ShadowView>
	)
}

export default LogoutButton

const styles = StyleSheet.create({
	container: { borderRadius: sizes.base, marginHorizontal: sizes.xs, marginBottom: sizes.base },
	inner: { padding: sizes.base, borderRadius: sizes.base, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
	icon: { marginRight: sizes.xxxs }
})