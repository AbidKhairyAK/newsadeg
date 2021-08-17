import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import { NoData, BaseButton } from '@/components'
import { sizes, colors } from '@/constants'
import { getScreenSize } from '@/helpers'
import DonutIllustration from '@/assets/illustrations/donut.svg'

import MenuItem from '../components/MenuItem'

const ListSection = ({ menus }) => {
	const { isLoading } = useSelector(state => state.master)
	const { navigate } = useNavigation()

	const toMenuForm = () => navigate('MenuForm')

	return isLoading.menu
	? <ActivityIndicator color={colors.green} />
	: (
		<View style={styles.container}>
			{menus.length
			? menus.map((menu, i) =>
				<MenuItem key={menu.id} menu={menu} isTopItem={i === 0} />
			) : (
				<NoData
					illustration={DonutIllustration}
					title="Menu is empty"
					description="Try to select another category or create a new menu"
				/>
			)}

			<BaseButton
				title="+ New Menu"
				padding="base"
				shadowType="card"
				color="green"
				onPress={toMenuForm}
				style={styles.addButton}
			/>
		</View>
	)
}

export default ListSection

const styles = StyleSheet.create({
	container: { marginTop: sizes.xs * -1 },
	addButton: { margin: sizes.base, marginTop: 0 },
})