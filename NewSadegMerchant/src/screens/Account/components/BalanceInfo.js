import React from 'react'
import { View, StyleSheet } from 'react-native'

import { BaseText, ShadowView, MoneyText } from '@/components'
import { sizes, colors } from '@/constants'

import BalanceButton from './BalanceButton'

const BalanceInfo = () => {
	return (
		<ShadowView type="card" style={styles.container}>
			<View style={styles.infoWrapper}>
				<BaseText size="sm" color="gray">
					Balance
				</BaseText>
				<MoneyText value={1350} size="lg" />
			</View>
			<View style={styles.actionWrapper}>
				<BalanceButton title="Withdraw" icon="download-outline" />
				<BalanceButton title="History" icon="reload-outline" />
			</View>
		</ShadowView>
	)
}

export default BalanceInfo

const styles = StyleSheet.create({
	container: { flexDirection: 'row', borderRadius: sizes.base, marginHorizontal: sizes.base, padding: sizes.base, position: 'absolute', bottom: sizes.base * -2, left: 0, right: 0 },
	infoWrapper: { flex: 4 },
	actionWrapper: { flex: 5, flexDirection: 'row', justifyContent: 'space-around', borderLeftWidth: 1, borderColor: colors.gray + '33' },
})