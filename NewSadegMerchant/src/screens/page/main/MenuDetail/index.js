import React, { useState } from 'react'
import { ScrollView, View, Image, TouchableOpacity, StyleSheet } from 'react-native'

import { ShadowView, BaseText, BaseIcon, MoneyText, BaseSwitch, BaseButton } from '@/components'
import { sizes, colors } from '@/constants'
import { getScreenSize, toTitleCase } from '@/helpers'

import crudLogic from './logics/crudLogic'

const MenuDetail = ({ navigation, route }) => {
	const { menu, isLoading, toggleMenuStatus, confirmDelete, toMenuForm } = crudLogic({ navigation, route })

	return (
		<ScrollView style={styles.container}>
			<BaseButton 
				onPress={navigation.goBack}
				icon="chevron-back-outline" 
				radius="xxs"
				style={styles.backButton} 
				innerStyle={styles.backButtonInner}
			/>

			<Image
				source={{ uri: menu.image }}
				style={styles.image}
			/>

			<ShadowView type="sectionHard" style={styles.contentShadow}>
				<View style={styles.contentWrapper}>
					<BaseText type="semi-bold" size="xl" style={styles.title}>
						{toTitleCase(menu.name)}
					</BaseText>

					<View style={styles.priceWrapper}>
						<MoneyText value={menu.price} size="xxl"/>
						<BaseSwitch
							status={menu.status === 'ready'}
							trueTitle="IN" 
							falseTitle="OUT" 
							style={styles.status} 
							onPress={toggleMenuStatus}
							isLoading={isLoading.updateStatus}
						/>
					</View>

					<BaseText style={styles.description}>
						{menu.description}		
					</BaseText>

					<View style={styles.actionWrapper}>
						<BaseButton
							title="Delete Menu"
							icon="trash-outline"
							bg="red"
							color="white"
							style={styles.actionButton}
							onPress={confirmDelete}
							isLoading={isLoading.delete}
						/>
						<BaseButton
							title="Edit Menu"
							icon="create-outline"
							bg="green"
							color="white"
							style={styles.actionButton}
							onPress={toMenuForm}
						/>
					</View>
				</View>
			</ShadowView>
		</ScrollView>
	)
}

export default MenuDetail

const styles = StyleSheet.create({
	container: { position: 'relative' },
	backButton: { position: 'absolute', top: sizes.base, left: sizes.base, zIndex: 1 },
	backButtonInner: { paddingVertical: 0, width: sizes.base * 2, height: sizes.base * 2 },
	image: { width: '100%', height: getScreenSize().width },
	contentShadow: { width: '100%', borderRadius: sizes.base, marginTop: sizes.base * -2 },
	contentWrapper: { minHeight: getScreenSize().height / 2 + sizes.base * 2, width: '100%', backgroundColor: colors.white, padding: sizes.xl, borderTopLeftRadius: sizes.base, borderTopRightRadius: sizes.base, position: 'relative' },
	title: { marginBottom: sizes.xxxs },
	priceWrapper: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: sizes.xl },
	status: { marginTop: sizes.base / 4 },
	description: { marginBottom: (sizes.xl * 2) + (sizes.xs * 2) + sizes.lg },
	actionWrapper: { flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: sizes.xl, left: sizes.xl, right: sizes.xl },
	actionButton: { width: '46%' }
})