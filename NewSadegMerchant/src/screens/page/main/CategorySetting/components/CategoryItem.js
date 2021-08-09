import React, { useState } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

import { BaseText, BaseButton, BaseIcon } from '@/components'
import { sizes, colors, fontTypes } from '@/constants'

const CategoryItem = ({ cat }) => {
	const [isFocus, setIsFocus] = useState(false)

	const changeFocus = val => e => setIsFocus(val)

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input(isFocus)}
				value={cat}
				placeholder="Category name ..."
				onFocus={changeFocus(true)}
				onEndEditing={changeFocus(false)}
			/>

			<View style={styles.itemWrapper}>
				<BaseIcon name="fast-food-outline" color="gray" size="sm" style={styles.itemIcon} />
				<BaseText size="sm">
					2 item
				</BaseText>
			</View>

			<BaseButton icon="trash-outline" bg="red" color="white" iconSize="base" radius="xxxs" innerStyle={styles.buttonInner} />
		</View>
	)
}

export default CategoryItem

const styles = StyleSheet.create({
	container: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
	input: isFocus => ({ 
		backgroundColor: colors[isFocus ? 'lightGray' : 'white'],
		padding: 0,
		paddingVertical: sizes.xxxs,
		paddingLeft: sizes.xxxs,
		marginLeft: sizes.xxxs * -1,
		fontFamily: fontTypes.regular,
		fontSize: sizes.sm,
		borderRadius: sizes.xs,
		width: '40%' 
	}),
	itemWrapper: { flexDirection: 'row', alignItems: 'center' },
	itemIcon: { marginRight: sizes.base / 4 },
	buttonInner: { paddingVertical: sizes.base / 3, paddingHorizontal: sizes.base / 3 }
})