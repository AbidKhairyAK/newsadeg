import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { showMessage } from 'react-native-flash-message'

import { BaseText, ShadowView, BaseButton } from '@/components'
import { colors, sizes } from '@/constants'

const ActionSection = ({ isLoading, scrollViewRef, cookingTime, driverType, rejectOrder, acceptOrder }) => {
	const { navigate } = useNavigation()

	const handleAccept = () => {
		if (cookingTime && driverType) acceptOrder() 
		else {
			scrollViewRef.current.scrollToEnd()
			showMessage({
				message: 'Please select driver type & estimated cooking time first!',
				type: 'warning',
				icon: 'warning',
				duration: 3000
			})
		}
	}

	const confirmRejection = () => {
		navigate('ConfirmDangerDialog', {
			positiveTitle: 'Reject',
			onPressPositive: rejectOrder,
		})
	}

	const isDisableAction = Object.values(isLoading).includes(true)

	return (
		<ShadowView type="tabBar" style={styles.container}>
			<View style={styles.inner}>
				<BaseButton
					title="Reject"
					icon="close-circle-outline"
					bg="red"
					color="white"
					style={styles.newOrderButton}
					onPress={confirmRejection}
					disabled={isDisableAction}
					isLoading={isLoading.reject}
				/>
				<BaseButton
					title="Accept"
					icon="checkmark-circle-outline"
					bg="green"
					color="white"
					style={styles.newOrderButton}
					onPress={handleAccept}
					disabled={isDisableAction}
					isLoading={isLoading.accept}
				/>
			</View>
		</ShadowView>
	)
}

export default ActionSection

const styles = StyleSheet.create({
	container: { borderRadius: sizes.base },
	inner: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.white, borderTopLeftRadius: sizes.base, borderTopRightRadius: sizes.base, padding: sizes.xs },
	newOrderButton: { width: '47.5%' }
})