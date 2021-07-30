import React from 'react'
import { ScrollView, View, Image, TouchableOpacity } from 'react-native'

import { ShadowView, BaseText, BaseIcon, MoneyText, BaseSwitch, BaseButton } from '@/components'
import { sizes, colors } from '@/constants'
import { getScreenSize } from '@/helpers'

const MenuDetail = ({ navigation }) => {
	const { goBack } = navigation

	return (
		<ScrollView style={{ position: 'relative' }}>
			<BaseButton 
				onPress={goBack}
				icon="chevron-back-outline" 
				radius="xxs"
				style={{ position: 'absolute', top: sizes.base, left: sizes.base, zIndex: 1 }} 
				innerStyle={{ paddingVertical: 0, width: sizes.base * 2, height: sizes.base * 2 }}
			/>

			<Image
				source={{ uri: 'https://source.unsplash.com/720x720/?food' }}
				style={{ width: '100%', height: getScreenSize().width }}
			/>

			<ShadowView type="sectionHard" style={{ width: '100%', borderRadius: sizes.base, marginTop: sizes.base * -2 }}>
				<View style={{ minHeight: getScreenSize().height / 2 + sizes.base * 2, width: '100%', backgroundColor: colors.white, padding: sizes.xl, borderTopLeftRadius: sizes.base, borderTopRightRadius: sizes.base, position: 'relative' }}>
					<BaseText type="semi-bold" size="xl" style={{ marginBottom: sizes.xxxs }}>
						Quwarmah Al Dajaj
					</BaseText>

					<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: sizes.xl }}>
						<MoneyText value={17} size="xxl"/>
						<BaseSwitch trueTitle="IN" falseTitle="OUT" style={{ marginTop: sizes.base / 4 }} />
					</View>

					<BaseText style={{ marginBottom: (sizes.xl * 2) + (sizes.xs * 2) + sizes.lg }}>
						Known to most as Kuwaiti curried chicken, the zesty dish is made with a blend of Middle Eastern flavors and spices.
						{'\n\n'}
						lime, ginger, turmeric, baharat, cumin, cardamom, black pepper, cinnamon, nutmeg, paprika, that combine to give it a distinctive pop					
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