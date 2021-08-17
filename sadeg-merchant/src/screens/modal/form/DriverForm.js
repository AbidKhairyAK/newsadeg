import React from 'react'
import { View, TouchableOpacity } from 'react-native'

import { ModalForm, FormInput, BaseText, BaseIcon, FormImage } from '@/components'
import { sizes, colors } from '@/constants'

/*
	'restaurant_id',
	'fullname',
	'email',
	'password',
	'phone_number',
	'vehicle_year',
	'vehicle_model',
	'driver_photo_file',
	'driver_licence_file',
*/

const DriverForm = ({ route, navigation }) => {
	return (
		<ModalForm title="Driver Form" onPressPositive={() => alert('submitted')}>
			<FormInput
				label="Full Name"
			/>
			<FormInput
				label="Email"
			/>

			<View style={{ flexDirection: 'row' }}>
				<FormInput
					label="Password"
					secureTextEntry
					style={{ flex: 1 }}
				/>
				<TouchableOpacity style={{ paddingHorizontal: sizes.xs, alignSelf: 'stretch', justifyContent: 'center', paddingTop: sizes.xs }}>
					<BaseIcon name="eye-off-outline" color="gray" />
				</TouchableOpacity>
			</View>

			<FormInput
				label="Phone Number"
			/>

			<BaseText size="sm" color="gray">
				Vehicle Info
			</BaseText>
			<View style={{ flexDirection: 'row', marginTop: sizes.xxxs, marginHorizontal: sizes.xxxs * -1 }}>
				<FormInput
					placeholder="Year"
					style={{ marginHorizontal: sizes.xxxs, width: '20%' }}
				/>
				<FormInput
					placeholder="Model"
					style={{ marginHorizontal: sizes.xxxs, flex: 1 }}
				/>
			</View>

			<FormImage
				label="Driver Photo"
			/>

			<FormImage
				label="Driver License"
			/>
		</ModalForm>
	)
} 

export default DriverForm