import firestore from '@react-native-firebase/firestore'
import { isEmpty } from 'validate.js'

import { getRestaurant } from '@/helpers'

const collection = 'restaurants'
const docPrefix = 'restaurant_'
const subCollection = 'orders'
const subDocPrefix = 'order_'

const services = {
	async initData (userId) {
		const existingData = await firestore()
			.collection(collection)
			.doc(docPrefix + (getRestaurant().id || userId))
			.collection(subCollection)
			.get()

		if (!isEmpty(existingData)) return

		await firestore()
			.collection(collection)
			.doc(docPrefix + getRestaurant())
			.collection(subCollection)
			.doc(subDocPrefix + 0)
			.set({
				order_id: 0
			})

		return
	},

	subscribeOrders (onResult, onError) {
		return firestore()
			.collection(collection)
			.doc(docPrefix + getRestaurant().id)
			.collection(subCollection)
			.onSnapshot(
				onResult,
				err => {
					console.error(err)
					if (onError) onError(err)
				}
			)
	}
}

export default services