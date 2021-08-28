import React from 'react'
import { View, StyleSheet } from 'react-native'

import { BaseText, BaseCard, MoneyText } from '@/components'
import { sizes, colors } from '@/constants'

import BalanceButton from './BalanceButton'

const BalanceInfo = () => {
	const indev = () => alert('this feature is under development')
	return (
		<BaseCard padding="base" style={styles.card} innerStyle={styles.cardInner}>
			<View style={styles.infoWrapper}>
				<BaseText size="sm" color="gray">
					Balance
				</BaseText>
				<MoneyText value={0} size="lg" />
			</View>
			<View style={styles.actionWrapper}>
				<BalanceButton
					title="Withdraw"
					icon="download-outline"
					onPress={indev}
				/>
				<BalanceButton
					title="History"
					icon="reload-outline"
					onPress={indev}
				/>
			</View>
		</BaseCard>
	)
}

export default BalanceInfo

const styles = StyleSheet.create({
	card: { marginHorizontal: sizes.base, position: 'absolute', bottom: sizes.base * -2, left: 0, right: 0 },
	cardInner: { flexDirection: 'row' },
	infoWrapper: { flex: 4 },
	actionWrapper: { flex: 5, flexDirection: 'row', justifyContent: 'space-around', borderLeftWidth: 1, borderColor: colors.border },
})