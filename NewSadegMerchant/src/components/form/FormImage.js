import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Image } from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { BaseText, BaseButton, ShadowView } from '@/components'
import { colors, sizes } from '@/constants'
import { getScreenSize } from '@/helpers'
import AddImageIllustration from '@/assets/illustrations/add-image.svg'

const FormImage = ({ style, label, noMargin, error, optional, onChangeImage, value, ...props }) => {
	const [selectedImage, setSelectedImage] = useState()

	const options = { 
		mediaType: 'photo',
		maxWidth: 720,
		maxHeight: 720,
		quality: 0.8,
	}

	const callback = res => {
		if (res.didCancel) return

		setSelectedImage(res.assets[0])
		onChangeImage(res.assets[0])
	}

	const fromCamera = () => launchCamera(options, callback)
	const fromLibrary = () => launchImageLibrary(options, callback)

	const getImageHeight = () => typeof selectedImage === 'string'
		? getScreenSize().width / 2
		: (getScreenSize().width - (sizes.base + sizes.xs)) / selectedImage.width * selectedImage.height

	return (
		<View style={[
			styles.container(noMargin), 
			style
		]}>
			{(label || optional) && 
				<View style={styles.label}>
					<BaseText size="sm" color="gray">
						{label}
					</BaseText>
					<BaseText size="xs" color="shallowGray">
						{optional && '* Optional'}
					</BaseText>
				</View>
			}

			{
				selectedImage
				? <ShadowView type="item" radius="xs">
					<Image
						source={{ uri: typeof selectedImage === 'string' ? selectedImage : selectedImage.uri  }}
						style={{ 
							width: '100%', 
							height: getImageHeight(), 
							borderRadius: sizes.xs 
						}}
					/>
				</ShadowView>
				: <AddImageIllustration 
					height={getScreenSize().width / 2} 
					style={{ alignSelf: 'center' }}
				/>
			}
			
			<View style={{ flexDirection: 'row', marginTop: sizes.base, marginHorizontal: sizes.base / -2 }}>
				<BaseButton
					title="From Camera"
					bg="green"
					color="white"
					size="sm"
					padding="xxxs"
					style={{ flex: 1, marginHorizontal: sizes.base / 2 }}
					onPress={fromCamera}
				/>
				<BaseButton
					title="From Library"
					bg="green"
					color="white"
					size="sm"
					padding="xxxs"
					style={{ flex: 1, marginHorizontal: sizes.base / 2 }}
					onPress={fromLibrary}
				/>
			</View>

			{error && <BaseText color="red" size="xs">
				{error}
			</BaseText>}
		</View>
	)
}

export default FormImage

const styles = StyleSheet.create({
	container: (noMargin) => ({ marginBottom: noMargin ? 0 : sizes.sm }),
	label: { marginBottom: sizes.xxxs, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
	input: { width: '100%', backgroundColor: colors.lightGray, borderRadius: sizes.xs, paddingHorizontal: sizes.xs }
})