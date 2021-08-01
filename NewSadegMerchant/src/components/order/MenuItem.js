import React from 'react'
import { View, ScrollView, Image, StyleSheet } from 'react-native'

import { BaseText, ShadowView } from '@/components'
import { sizes, colors } from '@/constants'

const MenuItem = ({ noBorder }) => (
	<View style={styles.container(noBorder)}>
		<ShadowView type="item" style={styles.imageWrapper}>
			<Image 
				source={{ uri: 'https://source.unsplash.com/240x240/?burger' }} 
				style={styles.image}
			/>
		</ShadowView>
		<View style={styles.contentWrapper}>
			<View style={styles.contentMain}>
				<View>
					<BaseText size="sm">Dajaj Mashwi</BaseText>
					<BaseText size="xs" color="gray" >SR 20.00</BaseText>
				</View>
				<BaseText type="semi-bold">x 2</BaseText>
			</View>
			{Math.random() < 0.2
				&& <BaseText size="xs" style={styles.contentNote}>
					In vitae dignissim enim. Nunc iaculis malesuada feugiat. In ante sem, malesuada sed augue non proin.
				</BaseText>
			}
		</View>
	</View>
)

export default MenuItem

const styles = StyleSheet.create({
	container: (noBorder) => ({ paddingBottom: noBorder ? 0 : sizes.sm, borderBottomWidth: noBorder ? 0 : 1, flexDirection: 'row', paddingTop: sizes.sm, borderColor: colors.border }),
	imageWrapper: { backgroundColor: colors.white, borderRadius: sizes.xs, marginRight: sizes.xs, alignSelf: 'flex-start' },
	image: { width: sizes.xxxl, height: sizes.xxxl, borderRadius: sizes.xxs },
	contentWrapper: { flexShrink: 1, flex: 1 },
	contentMain: { flexDirection: 'row', justifyContent: 'space-between', flex: 1 },
	contentNote: { marginTop: sizes.xxxs }
})