import React, { memo } from 'react'
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { ShadowView, BaseText, MoneyText, BaseCard } from '@/components'
import { sizes, colors } from '@/constants'
import { toTitleCase } from '@/helpers'

import StatusBadge from './StatusBadge'

const MenuItem = ({ isTopItem, menu }) => {
	const navigation = useNavigation()

	const toDetailScreen = () => navigation.navigate('MenuDetail', { id: menu.id })

	return (
		<BaseCard
			padding="xxxs"
			style={styles.card(isTopItem)}
			innerStyle={styles.cardInner}
			onPress={toDetailScreen}
		>
			<ShadowView type="item" radius="xxs" style={styles.imageShadow}>
				<View style={styles.imageWrapper}>
					<Image
						source={{ uri: menu.image_thumbnail }}
						style={styles.image}
					/>
				</View>
			</ShadowView>
			<View style={styles.contentWrapper}>
				<View>
					<BaseText size="sm">
						{toTitleCase(menu.name)}
					</BaseText>
					<BaseText size="xs" color="gray" style={styles.menuDesc}>
						{menu.description?.substring(0, 75)}
						{menu.description?.length > 75 && '...'}
					</BaseText>
				</View>
				<View style={styles.footerSection}>
					<MoneyText value={menu.price} />
					<StatusBadge status={menu.status} />
				</View>
			</View>
		</BaseCard>
	)
}

export default memo(MenuItem)

const styles = StyleSheet.create({
	card: (isTopItem) => ({ 
		marginHorizontal: sizes.base,
		marginTop: isTopItem ? sizes.xs : 0,
		marginBottom: sizes.base,
	}),
	cardInner: { flexDirection: 'row' },
	imageShadow: { marginRight: sizes.xs, width: '30%' },
	imageWrapper: { paddingTop: '100%', position: 'relative', borderRadius: sizes.xss },
	image: { borderRadius: sizes.xxs, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 },
	contentWrapper: { flexShrink: 1, justifyContent: 'space-between' },
	menuDesc: { marginTop: sizes.base / 4 },
	footerSection: { width: '100%', position: 'relative', top: sizes.base / -4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: sizes.xxs },
})