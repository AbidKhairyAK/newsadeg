import React, { useState } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { isEmpty } from 'validate.js'
import { useNavigation } from '@react-navigation/native'

import { BaseText, BaseButton, BaseIcon } from '@/components'
import { sizes, colors, fontTypes } from '@/constants'

const CategoryItem = ({ category, isLoading, updateCategory, deleteCategory }) => {
	const { navigate } = useNavigation()

	const [isFocus, setIsFocus] = useState(false)
	const [inputValue, setInputValue] = useState(category.name)

	const changeFocus = val => e => setIsFocus(val)

	const isEditable = [isLoading.update, isLoading.delete].includes(category.id)

	const handleUpdate = () => {
		setIsFocus(false)
		if (isEmpty(inputValue)) setInputValue(category.name)
		else updateCategory(category.id, inputValue)
	}

	const confirmDelete = () => {
		navigate('ConfirmDangerDialog', {
			desc: 'All menu with this category will be deleted',
			positiveTitle: 'Delete',
			onPressPositive: () => deleteCategory(category.id),
		})
	}

	return (
		<View style={styles.container}>
			<TextInput
				editable={!isEditable}
				style={styles.input(isFocus, isEditable)}
				value={inputValue}
				onChangeText={setInputValue}
				placeholder="Category name ..."
				onFocus={changeFocus(true)}
				onEndEditing={handleUpdate}
			/>

			<BaseButton
				onPress={confirmDelete}
				isLoading={isLoading.delete == category.id}
				disabled={isLoading.update == category.id}
				icon="trash-outline" 
				bg="red" 
				color="white" 
				iconSize="base" 
				radius="xxxs" 
				innerStyle={styles.buttonInner} 
			/>
		</View>
	)
}

export default CategoryItem

const styles = StyleSheet.create({
	container: { flexDirection: 'row', alignItems: 'center' },
	input: (isFocus, isEditable) => ({ 
		backgroundColor: colors[isFocus ? 'dullWhite' : 'white'],
		color: colors[isEditable ? 'shallowGray' : 'black'],
		padding: 0,
		paddingVertical: sizes.xxxs,
		paddingLeft: sizes.xxxs,
		marginLeft: sizes.xxxs * -1,
		fontFamily: fontTypes.regular,
		fontSize: sizes.sm,
		borderRadius: sizes.xs,
		marginRight: sizes.xxxs,
		flex: 1,
	}),
	buttonInner: { paddingVertical: sizes.base / 3, paddingHorizontal: sizes.base / 3 }
	// rightSection: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
	// itemWrapper: { flexDirection: 'row', alignItems: 'center' },
	// itemIcon: { marginRight: sizes.base / 4 },
})



// <View style={styles.rightSection}>
// 	<View style={styles.itemWrapper}>
// 		<BaseIcon name="fast-food-outline" color="gray" size="sm" style={styles.itemIcon} />
// 		<BaseText size="sm">
// 			2 item
// 		</BaseText>
// 	</View>

// 	<BaseButton icon="trash-outline" bg="red" color="white" iconSize="base" radius="xxxs" innerStyle={styles.buttonInner} />
// </View>