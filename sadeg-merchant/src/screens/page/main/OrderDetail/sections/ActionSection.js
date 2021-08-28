import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { showMessage } from 'react-native-flash-message'

import { BaseText, ShadowView, BaseButton, BaseIcon } from '@/components'
import { colors, sizes } from '@/constants'

const ActionSection = ({ scrollViewRef, isLoading, order, cookingTime, driverType, rejectOrder, acceptOrder, processOrder }) => {
	const { navigate } = useNavigation()

	const handleMarkAsReady = () => {
		processOrder(null, 'ready')
	}

	const handleAccept = () => {
		if (order.order_type === 'delivery' ? (cookingTime && driverType) : cookingTime) {
			acceptOrder() 
		} else {
			scrollViewRef.current.scrollToEnd()
			showMessage({
				message: 'Please select ' + 
					(order.order_method === 'delivery' ? 'driver type & ' : '') + 
					'estimated cooking time first!',
				type: 'warning',
				icon: 'warning',
				duration: 5000
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

	const isShowAction = [
		'waiting', 
		'process', 
		// 'on_delivery', // hide track driver button for now
		'ready'
	].includes(order.status)

	const renderActions = () => {
		if (order.status === 'waiting') {
			return <>
				<BaseButton
					title="Reject"
					icon="close-circle-outline"
					bg="red"
					color="white"
					style={styles.newOrderButton}
					onPress={confirmRejection}
					disabled={isDisableAction}
					isLoading={isLoading.negative}
				/>
				<BaseButton
					title="Accept"
					icon="checkmark-circle-outline"
					bg="green"
					color="white"
					style={styles.newOrderButton}
					onPress={handleAccept}
					disabled={isDisableAction}
					isLoading={isLoading.positive}
				/>
			</>
		} else if (order.status === 'process') {
			if (order.order_method === 'delivery') {
				return <BaseText 
					align="center" 
					color="green" 
					type="semi-bold" 
					style={styles.actionText}
				>
					Waiting for the driver to pick up the order
				</BaseText>
			} else if (order.order_method === 'takeaway') {
				return  <BaseButton
					title="Mark as Ready"
					icon="checkmark-circle-outline"
					bg="green"
					color="white"
					style={{ width: '100%' }}
					onPress={handleMarkAsReady}
					isLoading={isLoading.positive}
				/>
			}
		} else if (order.status === 'on_delivery') {
			return <BaseButton
				title="Track driver"
				icon="checkmark-circle-outline"
				bg="green"
				color="white"
				style={{ width: '100%' }}
			/>
		} else if (order.status === 'ready') {
			return <BaseText 
				align="center" 
				color="green" 
				type="semi-bold" 
				style={styles.actionText}
			>
				Waiting for the customer to pick up the order
			</BaseText>
		}
	}

	return isShowAction && (
		<ShadowView type="tabBar" style={styles.container}>
			<View style={styles.inner}>
				{renderActions()}
			</View>
		</ShadowView>
	)
}

export default ActionSection

const styles = StyleSheet.create({
	container: { borderRadius: sizes.base },
	inner: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.white, borderTopLeftRadius: sizes.base, borderTopRightRadius: sizes.base, padding: sizes.xs },
	newOrderButton: { width: '47.5%' },
	actionText: { width: '100%', marginVertical: sizes.xxxs },
})