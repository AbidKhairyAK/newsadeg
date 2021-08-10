import React from 'react'
import { StyleSheet, LogBox, View } from 'react-native'
import ActionButton from 'react-native-action-button'
import { useNavigation } from '@react-navigation/native'

import { BaseIcon, BaseText, ShadowView } from '@/components'
import { colors } from '@/constants'

LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified']);
LogBox.ignoreLogs(['Warning: componentWillReceiveProps has been renamed']);

const ActionSection = () => {
	const { navigate } = useNavigation()
	const toCategorySetting = () => navigate('CategorySetting')

	return <>
		<View style={styles.backupWrapper}>
			<ShadowView type="item" size={[56, 56]} radius={28} />
		</View>
		
		<ActionButton buttonColor={colors.green}>
			<ActionButton.Item 
				onPress={toCategorySetting}
				buttonColor={colors.white} 
				title="+ New Category" 
			>
				<BaseIcon name="ice-cream-outline" color="green"/>
			</ActionButton.Item>
			<ActionButton.Item 
				onPress={toCategorySetting}
				buttonColor={colors.white} 
				title="+ New Menu" 
			>
				<BaseIcon name="fast-food-outline" color="green"/>
			</ActionButton.Item>
		</ActionButton>
	</>
}

export default ActionSection

const styles = StyleSheet.create({
	backupWrapper: { height: 56, width: 56, position: 'absolute', right: 30, bottom: 30 },
})
