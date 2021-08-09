import React from 'react'
import { ScrollView, View, Image, TouchableOpacity } from 'react-native'

import { ShadowView, BaseText, BaseIcon, MoneyText, BaseSwitch, BaseButton } from '@/components'
import { sizes, colors } from '@/constants'
import { getScreenSize, toTitleCase } from '@/helpers'

const MenuDetail = ({ navigation, route }) => {
	const { menu } = route.params

	return (
		<ScrollView style={{ position: 'relative' }}>
			<BaseButton 
				onPress={navigation.goBack}
				icon="chevron-back-outline" 
				radius="xxs"
				style={{ position: 'absolute', top: sizes.base, left: sizes.base, zIndex: 1 }} 
				innerStyle={{ paddingVertical: 0, width: sizes.base * 2, height: sizes.base * 2 }}
			/>

			<Image
				source={{ uri: menu.image }}
				style={{ width: '100%', height: getScreenSize().width }}
			/>

			<ShadowView type="sectionHard" style={{ width: '100%', borderRadius: sizes.base, marginTop: sizes.base * -2 }}>
				<View style={{ minHeight: getScreenSize().height / 2 + sizes.base * 2, width: '100%', backgroundColor: colors.white, padding: sizes.xl, borderTopLeftRadius: sizes.base, borderTopRightRadius: sizes.base, position: 'relative' }}>
					<BaseText type="semi-bold" size="xl" style={{ marginBottom: sizes.xxxs }}>
						{toTitleCase(menu.name)}
					</BaseText>

					<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: sizes.xl }}>
						<MoneyText value={menu.price} size="xxl"/>
						<BaseSwitch
							status={menu.status === 'ready'}
							trueTitle="IN" 
							falseTitle="OUT" 
							style={{ marginTop: sizes.base / 4 }} 
						/>
					</View>

					<BaseText style={{ marginBottom: (sizes.xl * 2) + (sizes.xs * 2) + sizes.lg }}>
						{menu.description}		
					</BaseText>

					<View style={{ flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: sizes.xl, left: sizes.xl, right: sizes.xl }}>
						<BaseButton title="Delete Menu" icon="trash-outline" bg="red" color="white" style={{ width: '46%' }} />
						<BaseButton title="Edit Menu" icon="create-outline" bg="green" color="white" style={{ width: '46%' }} />
					</View>
				</View>
			</ShadowView>
		</ScrollView>
	)
}

export default MenuDetail