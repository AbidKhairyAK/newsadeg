import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native'

import { ShadowView, BaseText } from '@/components'
import { sizes, colors } from '@/constants'

const MenuItem = ({ index }) => {
	const isFlexEnd = index % 2
	const isTopItem = index < 2
	return (
		<ShadowView type="card" style={styles.itemWrapper(isFlexEnd, isTopItem)}>
			<TouchableOpacity>
				<View style={styles.itemInner}>
					<ShadowView type="item" style={styles.imageWrapper}>
						<Image
							source={{ uri: 'https://source.unsplash.com/320x240/?dinner' }}
							style={styles.image}
						/>
					</ShadowView>
					<BaseText size="sm" style={{ marginTop: sizes.base / 2 }}>
						Hininy
					</BaseText>
					<BaseText size="xs" color="gray" style={{ marginTop: sizes.base / 4 }}>
						traditional Saudi Arabian dish consisting of dates, butter, and brown bread
					</BaseText>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: sizes.xxs }}>
						<BaseText type="bold" color="green">
							SR 20.00
						</BaseText>
						<View style={{ paddingHorizontal: sizes.base / 2, paddingVertical: sizes.base / 8, borderColor: colors.green, borderWidth: 1, borderRadius: sizes.base / 2  }}>
							<BaseText size="xxs" color="green" type="medium">
								IN
							</BaseText>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		</ShadowView>
	)
}

export default MenuItem

const styles = StyleSheet.create({
	itemWrapper: (isFlexEnd, isTopItem) => ({ 
		[isFlexEnd ? 'marginRight' : 'marginLeft']: sizes.base, 
		marginTop: isTopItem ? sizes.xs : 0,
		marginBottom: sizes.lg,
		width: '43%', 
		borderRadius: sizes.base 
	}),
	itemInner: { backgroundColor: colors.white, borderRadius: sizes.base, padding: sizes.xxxs },
	imageWrapper: { borderRadius: sizes.xxs, width: '100%', paddingTop: '75%', position: 'relative' },
	image: { borderRadius: sizes.xxs, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }
})