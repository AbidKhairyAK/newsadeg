import React from 'react'
import { ScrollView } from 'react-native'

import { BaseHeader } from '@/components'

import crudLogic from './logics/crudLogic'
import FormSection from './sections/FormSection'
import ListSection from './sections/ListSection'

const CategorySetting = ({ navigation }) => {
	const { isLoading, categories, createCategory, updateCategory, deleteCategory } = crudLogic()

	return (
		<ScrollView>
			<BaseHeader title="CATEGORY SETTING" withBack />

			<FormSection
				createCategory={createCategory}
				isLoading={isLoading}
			/>

			<ListSection
				isLoading={isLoading}
				categories={categories}
				updateCategory={updateCategory}
				deleteCategory={deleteCategory}
			/>
		</ScrollView>
	)
}

export default CategorySetting