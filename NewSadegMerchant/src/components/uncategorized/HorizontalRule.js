import React from 'react'
import { StyleSheet, View } from 'react-native'

import { colors, sizes } from '@/constants'

const HorizontalRule = ({ margin, style = {} }) => <View style={styles.rule(margin, style)} />

export default HorizontalRule

const styles = StyleSheet.create({
	rule: (margin, style) => ({ 
		borderBottomWidth: 1, 
		borderColor: colors.gray + '33', 
		marginVertical: margin || sizes.base,
		...style 
	})
})