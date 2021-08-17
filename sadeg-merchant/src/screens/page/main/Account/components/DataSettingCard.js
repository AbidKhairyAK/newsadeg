import React from 'react'
import { View, StyleSheet } from 'react-native'

import { BaseText, BaseCard, HorizontalRule } from '@/components'
import { sizes, colors } from '@/constants'

import DataSettingItem from './DataSettingItem'

const DataSettingCard = ({ title, items }) => {
	return (
		<BaseCard padding="base" style={styles.card}>
			<BaseText color="gray" size="xs" type="bold" style={styles.title}>
				{title}
			</BaseText>

			{items.map((item, index) =>
				<View key={index}>
					{index !== 0 && <HorizontalRule />}

					<DataSettingItem title={item.title} icon={item.icon} onPress={item.onPress} />
				</View>
			)}
		</BaseCard>
	)
}

export default DataSettingCard

const styles = StyleSheet.create({
	card: { marginHorizontal: sizes.base, marginBottom: sizes.base * 1.75 },
	title: { marginBottom: sizes.base },
})