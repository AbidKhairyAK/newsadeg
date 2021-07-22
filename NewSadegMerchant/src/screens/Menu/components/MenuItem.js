import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native'

import { ShadowView, BaseText, MoneyText } from '@/components'
import { sizes, colors } from '@/constants'

const MenuItem = ({ isTopItem }) => {
	return (
		<ShadowView type="card" style={styles.itemWrapper(isTopItem)}>
			<TouchableOpacity>
				<View style={styles.itemInner}>
					<ShadowView type="item" style={styles.imageWrapper}>
						<Image
							source={{ uri: 'https://source.unsplash.com/320x240/?dinner' }}
							style={styles.image}
						/>
					</ShadowView>
					<View style={styles.contentWrapper}>
						<BaseText size="sm">
							Hininy
						</BaseText>
						<BaseText size="xs" color="gray" style={styles.menuDesc}>
							traditional Saudi Arabian dish consisting of dates, butter, and brown bread
						</BaseText>
						<View style={styles.footerSection}>
							<MoneyText value={20.00} />
							<ShadowView type="item" style={styles.statusWrapper}>
								<BaseText size="xxs" color="white" type="semi-bold" lineHeight={sizes.xxs * 1.5}>
									IN
								</BaseText>
							</ShadowView>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		</ShadowView>
	)
}

export default MenuItem

const styles = StyleSheet.create({
	itemWrapper: (isTopItem) => ({ 
		marginHorizontal: sizes.base,
		marginTop: isTopItem ? sizes.xs : 0,
		marginBottom: sizes.base,
		borderRadius: sizes.base 
	}),
	itemInner: { flexDirection: 'row', backgroundColor: colors.white, borderRadius: sizes.base, padding: sizes.xxxs },
	imageWrapper: { marginRight: sizes.xs, borderRadius: sizes.xxs, width: '30%', paddingTop: '20%', position: 'relative' },
	image: { borderRadius: sizes.xxs, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 },
	contentWrapper: { flexShrink: 1 },
	menuDesc: { marginTop: sizes.base / 4 },
	footerSection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: sizes.xxs },
	statusWrapper: { paddingHorizontal: sizes.base / 2, paddingVertical: sizes.base / 8, backgroundColor: colors.green, borderRadius: sizes.base / 2  }
})