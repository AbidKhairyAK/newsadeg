import firestore from '@react-native-firebase/firestore'
import { isEmpty } from 'validate.js'

import { getRestaurant } from '@/helpers'

const collection = 'restaurants'
const docPrefix = 'restaurant_'
const subCollection = 'orders'
const subDocPrefix = 'order_'

const baseObject = userId => firestore()
	.collection(collection)
	.doc(docPrefix + (getRestaurant().id || userId))

const services = {
	async initData (userId) {
		const existingData = await baseObject(userId)
			.collection(subCollection)
			.get()

		if (!isEmpty(existingData)) return

		await baseObject(userId)
			.collection(subCollection)
			.doc(subDocPrefix + 0)
			.set({
				order_id: 0
			})

		return
	},

	subscribeOrders (onResult, onError) {
		return baseObject()
			.collection(subCollection)
			.onSnapshot(
				onResult,
				err => {
					console.error(err)
					if (onError) onError(err)
				}
			)
	},

	updateOrder (orderId, payload) {
		return baseObject()
			.collection(subCollection)
			.doc(subDocPrefix + orderId)
			.set(payload)
	}
}

export default services