import React from 'react'
import { View, ScrollView, TextInput } from 'react-native'

import { ModalForm, FormInput } from '@/components'

const FormExample = () => {
	return (
		<ModalForm title="Owner Data" onPressPositive={() => alert('yes')}>
			<FormInput label="Nama Lengkap" />
			<FormInput label="No KTP" />
			<FormInput label="No KTP" />
			<FormInput label="No KTP" />
			<FormInput label="No KTP" />
			<FormInput label="No KTP" />
			<FormInput label="No KTP" />
			<FormInput label="No KTP" />
			<FormInput label="No KTP" />
			<FormInput label="No KTP" />
			<FormInput label="No KTP" />
		</ModalForm>
	)
}

export default FormExample