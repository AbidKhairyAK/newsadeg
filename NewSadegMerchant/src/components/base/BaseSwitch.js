import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { ShadowFlex } from 'react-native-neomorph-shadows'

import { BaseText } from '@/components'
import { shadows, colors, sizes } from '@/constants'

const SWITCH_HEIGHT = sizes.xl

const BaseSwitch = ({ style, trueTitle, falseTitle }) => {
	const [isOpen, setIsOpen] = useState(true)
	const toggleIsOpen = () => setIsOpen(prev => !prev)

	return (
		<View style={{
			...styles.switchWrapper,
			...styles[isOpen ? 'switchWrapperOpen' : 'switchWrapperClosed'],
			...style
		}}>
			<TouchableOpacity onPress={toggleIsOpen}>
				<ShadowFlex style={styles.switchItem}>
					<View style={{
						...styles.switchItemInner,
						...styles[isOpen ? 'switchItemOpen' : 'switchItemClosed']
					}}>
						<BaseText size="xs" type="semi-bold" color="white" style={styles.switchText}>
							{isOpen ? trueTitle : falseTitle }
						</BaseText>
					</View>
				</ShadowFlex>
			</TouchableOpacity>
		</View>
	)
}

export default BaseSwitch

const styles = StyleSheet.create({
	switchWrapper: { height: SWITCH_HEIGHT / 1.5, borderRadius: SWITCH_HEIGHT / 5, justifyContent: 'center', backgroundColor: colors.gray + '55' },
	switchWrapperOpen: { paddingLeft: sizes.xxs, alignItems: 'flex-end' },
	switchWrapperClosed: { paddingRight: sizes.xxs, alignItems: 'flex-start' },
	switchItem: { ...shadows.item, borderRadius: SWITCH_HEIGHT / 5 },
	switchItemInner: { height: SWITCH_HEIGHT, justifyContent: 'center', paddingHorizontal: sizes.xxs, borderRadius: SWITCH_HEIGHT / 5 },
	switchItemOpen: { backgroundColor: colors.green },
	switchItemClosed: { backgroundColor: colors.red },
	switchText: { lineHeight: sizes.xs * 1.35 }
})