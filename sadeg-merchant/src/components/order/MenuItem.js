import React from 'react'
import { View, ScrollView, Image, StyleSheet } from 'react-native'

import { BaseText, ShadowView } from '@/components'
import { sizes, colors } from '@/constants'
import { formatNumber } from '@/helpers'

const MenuItem = ({ noBorder, orderDetail }) => (
	<View style={styles.container(noBorder)}>
		<ShadowView type="item" radius="xs" style={styles.imageWrapper}>
			<Image 
				source={{ uri: orderDetail.menu.image_thumbnail }} 
				style={styles.image}
			/>
		</ShadowView>
		<View style={styles.contentWrapper}>
			<View style={styles.contentMain}>
				<View>
					<BaseText size="sm">{orderDetail.menu.name}</BaseText>
					<BaseText size="xs" color="gray" >SR {formatNumber(orderDetail.total_price.toFixed(2))}</BaseText>
				</View>
				<BaseText type="semi-bold">x {orderDetail.quantity}</BaseText>
			</View>
			{orderDetail.notes?.length > 0 &&
				<BaseText size="xs" style={styles.contentNote}>
					{orderDetail.notes}
				</BaseText>
			}
		</View>
	</View>
)

export default MenuItem

const styles = StyleSheet.create({
	container: (noBorder) => ({ paddingBottom: noBorder ? 0 : sizes.sm, borderBottomWidth: noBorder ? 0 : 1, flexDirection: 'row', paddingTop: sizes.sm, borderColor: colors.border }),
	imageWrapper: { marginRight: sizes.xs, alignSelf: 'flex-start' },
	image: { width: sizes.xxxl, height: sizes.xxxl, borderRadius: sizes.xxs },
	contentWrapper: { flexShrink: 1, flex: 1 },
	contentMain: { flexDirection: 'row', justifyContent: 'space-between', flex: 1 },
	contentNote: { marginTop: sizes.xxxs }
})