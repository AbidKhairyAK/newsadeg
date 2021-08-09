import React from 'react'
import { ScrollView } from 'react-native'

import { BaseHeader } from '@/components'

import FormSection from './sections/FormSection'
import ListSection from './sections/ListSection'

const CategorySetting = ({ navigation }) => {
	return (
		<ScrollView>
			<BaseHeader title="CATEGORY SETTING" withBack />

			<FormSection />

			<ListSection />
		</ScrollView>
	)
}

export default CategorySetting