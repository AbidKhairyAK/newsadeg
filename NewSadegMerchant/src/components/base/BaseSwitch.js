import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, ActivityIndicator } from 'react-native'

import { BaseText, ShadowView } from '@/components'
import { shadows, colors, sizes } from '@/constants'

const SWITCH_HEIGHT = sizes.xl

const BaseSwitch = ({ style, trueTitle, falseTitle, status, onPress, isLoading }) => {
	return (
		<View style={{
			...styles.switchWrapper,
			...styles[status ? 'switchWrapperTrue' : 'switchWrapperFalse'],
			...style
		}}>
			<TouchableOpacity delayPressIn={100} onPress={onPress} disabled={isLoading}>
				<ShadowView type="item" radius={SWITCH_HEIGHT / 5}>
					<View style={{
						...styles.switchItemInner,
						...styles[status ? 'switchItemTrue' : 'switchItemFalse']
					}}>
						{ 
							isLoading
							? <ActivityIndicator color="white" />
							: <BaseText size="xs" type="semi-bold" color="white" style={styles.switchText}>
								{status ? trueTitle : falseTitle }
							</BaseText>
						}
					</View>
				</ShadowView>
			</TouchableOpacity>
		</View>
	)
}

export default BaseSwitch

const styles = StyleSheet.create({
	switchWrapper: { height: SWITCH_HEIGHT / 1.5, borderRadius: SWITCH_HEIGHT / 5, justifyContent: 'center', backgroundColor: colors.gray + '55' },
	switchWrapperTrue: { paddingLeft: sizes.xxs, alignItems: 'flex-end' },
	switchWrapperFalse: { paddingRight: sizes.xxs, alignItems: 'flex-start' },
	switchItemInner: { height: SWITCH_HEIGHT, justifyContent: 'center', alignItems: 'center', paddingHorizontal: sizes.xxs, borderRadius: SWITCH_HEIGHT / 5 },
	switchItemTrue: { backgroundColor: colors.green },
	switchItemFalse: { backgroundColor: colors.red },
	switchText: { lineHeight: sizes.xs * 1.35 }
})