import React from 'react'
import { View, ScrollView, Image, StyleSheet } from 'react-native'
import { ShadowFlex } from 'react-native-neomorph-shadows'

import { BaseText } from '@/components'
import { sizes, colors, shadows } from '@/constants'

const MenuItem = () => (
	<View style={styles.container}>
		<ShadowFlex style={styles.imageWrapper}>
			<Image 
				source={{ uri: 'https://source.unsplash.com/240x240/?burger' }} 
				style={styles.image}
			/>
		</ShadowFlex>
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
	container: { flexDirection: 'row', marginTop: sizes.sm, borderBottomWidth: 1, borderColor: colors.gray + '33', paddingBottom: sizes.sm },
	imageWrapper: { ...shadows.item, backgroundColor: colors.white, borderRadius: sizes.xs, marginRight: sizes.xs, alignSelf: 'flex-start' },
	image: { width: sizes.xxxl, height: sizes.xxxl, borderRadius: sizes.xxs },
	contentWrapper: { flexShrink: 1, flex: 1 },
	contentMain: { flexDirection: 'row', justifyContent: 'space-between', flex: 1 },
	contentNote: { marginTop: sizes.xxxs }
})