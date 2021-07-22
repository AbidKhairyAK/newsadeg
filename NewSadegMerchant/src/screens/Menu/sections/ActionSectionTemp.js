import React from 'react'
import { StyleSheet, LogBox } from 'react-native'
import ActionButton from 'react-native-action-button'

import { BaseIcon, ShadowView } from '@/components'
import { colors } from '@/constants'

LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified']);
LogBox.ignoreLogs(['Warning: componentWillReceiveProps has been renamed']);

const ActionSection = () => {
	return (
		<ShadowView useManual type="item" style={styles.shadowWrapper}>
			<ActionButton buttonColor={colors.green} offsetX={0} offsetY={0}>
				<ActionButton.Item 
					onPress={() => alert('test')}
					buttonColor={colors.white} 
					title="Category" 
					textContainerStyle={styles.textContainer}
				>
					<BaseIcon name="ice-cream-outline" color="green"/>
				</ActionButton.Item>
				<ActionButton.Item 
					onPress={() => alert('test')}
					buttonColor={colors.white} 
					title="Menu" 
					textContainerStyle={styles.textContainer}
				>
					<BaseIcon name="fast-food-outline" color="green"/>
				</ActionButton.Item>
			</ActionButton>
		</ShadowView>
	)
}

export default ActionSection

const styles = StyleSheet.create({
	shadowWrapper: { width: 56, height: 56, borderRadius: 56, position: 'absolute', right: 30, bottom: 30 },
	textContainer: { width: 80, alignItems: 'center' }
})
