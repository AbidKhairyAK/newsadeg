import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'

import { BaseText, BaseIcon, ShadowView } from '@/components'
import { sizes } from '@/constants'

const LogoutButton = () => {
	return (
		<ShadowView type="card" style={styles.container}>
			<TouchableOpacity>
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