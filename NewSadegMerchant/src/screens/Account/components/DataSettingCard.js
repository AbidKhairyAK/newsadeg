import React from 'react'
import { View, StyleSheet } from 'react-native'

import { BaseText, ShadowView, HorizontalRule } from '@/components'
import { sizes } from '@/constants'

import DataSettingItem from './DataSettingItem'

const DataSettingCard = ({ title, items }) => {
	return (
		<ShadowView type="card" style={styles.container}>
			<BaseText color="gray" size="xs" type="bold" style={styles.title}>
				{title}
			</BaseText>

			{items.map((item, index) =>
				<View key={index}>
					{index !== 0 && <HorizontalRule />}

					<DataSettingItem title={item.title} icon={item.icon} />
				</View>
			)}
		</ShadowView>
	)
}

export default DataSettingCard

const styles = StyleSheet.create({
	container: { padding: sizes.base, marginHorizontal: sizes.base, borderRadius: sizes.base, marginBottom: sizes.base * 1.75 },
	title: { marginBottom: sizes.base },
})