import React from 'react'
import { View, StyleSheet } from 'react-native'

import { ShadowView, BaseText, HorizontalRule } from '@/components'
import { sizes, colors } from '@/constants'

import CategoryItem from '../components/CategoryItem'

const categories = ['Food', 'Beverages', 'Snack', 'Dinner', 'Lunch', 'Breakfast']

const ListSection = () => {
	return (
		<ShadowView type="card" radius="base" style={styles.shadow}>
			<View style={styles.inner}>
				<BaseText size="sm" type="bold" color="gray" style={styles.title}>
					Categories List
				</BaseText>
				<BaseText size="xs" color="gray" style={styles.subtitle}>
					Click on category name to edit
				</BaseText>

				{categories.map((cat, index) =>
					<View key={cat}>
						{index !== 0 && <HorizontalRule margin={sizes.xxxs}/>}

						<CategoryItem cat={cat} />
					</View>
				)}
			</View>
		</ShadowView>
	)
}

export default ListSection

const styles = StyleSheet.create({
	shadow: { marginBottom: sizes.base, marginHorizontal: sizes.base },
	inner: { backgroundColor: colors.white, padding: sizes.base, borderRadius: sizes.base },
	title: { marginBottom: sizes.base / 4 },
	subtitle: { marginBottom: sizes.xxxs },
})