import React from 'react'
import { StyleSheet, View, TouchableOpacity, ActivityIndicator } from 'react-native'

import { BaseText, ShadowView } from '@/components'
import { sizes, colors } from '@/constants'

import MenuItem from '../components/MenuItem'

const ListSection = ({ menus, isLoading }) => {

	return isLoading
	? <ActivityIndicator color={colors.green} />
	: (
		<View style={styles.container}>
			{menus.map((menu, i) =>
				<MenuItem key={menu.id} menu={menu} isTopItem={i === 0} />
			)}

			<TouchableOpacity delayPressIn={100} style={styles.addButtonWrapper}>
				<ShadowView type="card" radius="base" >
					<View style={styles.addButton}>
						<BaseText type="semi-bold" color="green" align="center">
							+ New Menu
						</BaseText>
					</View>
				</ShadowView>
			</TouchableOpacity>
		</View>
	)
}

export default ListSection

const styles = StyleSheet.create({
	container: { marginTop: sizes.xs * -1 },
	addButtonWrapper: { margin: sizes.base, marginTop: 0 },
	addButton: { backgroundColor: colors.white, borderRadius: sizes.base, padding: sizes.base }
})