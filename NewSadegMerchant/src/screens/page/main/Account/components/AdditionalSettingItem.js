import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'

import { BaseText, ShadowView, BaseIcon } from '@/components'
import { sizes } from '@/constants'

const AdditionalSettingItem = ({ title, icon }) => (
	<ShadowView type="card" style={styles.container}>
		<TouchableOpacity delayPressIn={100} style={styles.button}>
			<BaseIcon name={icon} color="green" size="xxl" />
			<BaseText size="sm" color="gray" type="semi-bold" style={styles.text}>
				{title}
			</BaseText>
		</TouchableOpacity>
	</ShadowView>
)

export default AdditionalSettingItem

const styles = StyleSheet.create({
	container: { borderRadius: sizes.base, width: '46%', paddingVertical: sizes.xs },
	button: { alignItems: 'center' },
	text: { marginTop: sizes.base / 3 }
})