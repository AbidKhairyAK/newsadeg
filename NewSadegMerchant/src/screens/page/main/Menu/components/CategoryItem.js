import React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'

import { ShadowView, BaseText } from '@/components'
import { sizes, colors } from '@/constants'
import { toTitleCase } from '@/helpers'

const CategoryItem = ({ name, selected, firstItem, asAction, onPress }) => (
	<ShadowView type="card" radius="base" style={styles.itemWrapper(firstItem)}>
		<TouchableOpacity delayPressIn={100} onPress={onPress}>
			<View style={styles.itemInner(selected)}>
				<BaseText size="sm" type="semi-bold" color={asAction ? 'green' : selected ? 'white' : 'gray'}>
					{toTitleCase(name)}
				</BaseText>
			</View>
		</TouchableOpacity>
	</ShadowView>
)

export default CategoryItem

const styles = StyleSheet.create({
	itemWrapper: (firstItem) => ({ marginLeft: (firstItem ? sizes.base : 0), marginRight: sizes.xs, marginBottom: sizes.base, marginTop: sizes.xs }),
	itemInner: (selected) => ({ backgroundColor: (selected ? colors.green : colors.white), paddingHorizontal: sizes.xs, paddingVertical: sizes.xxxs, borderRadius: sizes.base })
})