import React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'

import { ShadowView, BaseText } from '@/components'
import { sizes, colors } from '@/constants'

const CategoryItem = ({ name, selected, firstItem, asAction, onPress }) => (
	<ShadowView type="card" style={styles.itemWrapper(firstItem)}>
		<TouchableOpacity delayPressIn={100} onPress={onPress}>
			<View style={styles.itemInner(selected)}>
				<BaseText size="sm" type="semi-bold" color={asAction ? 'green' : selected ? 'white' : 'gray'}>
					{name}
				</BaseText>
			</View>
		</TouchableOpacity>
	</ShadowView>
)

export default CategoryItem

const styles = StyleSheet.create({
	itemWrapper: (firstItem) => ({ marginLeft: (firstItem ? sizes.base : 0), marginRight: sizes.xs, marginBottom: sizes.base, marginTop: sizes.xs, borderRadius: sizes.xl }),
	itemInner: (selected) => ({ backgroundColor: (selected ? colors.green : colors.white), paddingHorizontal: sizes.xs, paddingVertical: sizes.xxxs, borderRadius: sizes.base })
})