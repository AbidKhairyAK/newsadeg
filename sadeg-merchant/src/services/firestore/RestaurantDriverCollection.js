import firestore from '@react-native-firebase/firestore'

const collection = 'driver_restaurant'
const docPrefix = 'driver_restaurant_'
const subCollection = 'orders'
const subDocPrefix = 'order_'

const baseObject = driverId => firestore()
	.collection(collection)
	.doc(docPrefix + driverId)

const services = {
	async create (driverId) {
		const driver = await baseObject(driverId).get()

		if (driver.exists) return driver

		return baseObject(driverId).set({ id: driverId }) 
	},
	async delete (driverId) {
		const driver = await baseObject(driverId).get()

		if (driver.exists) return driverData

		return baseObject(driverId).delete()
	},
	updateOrder (driverId, orderId, payload) {
		return baseObject(driverId)
			.collection(subCollection)
			.doc(docPrefix + orderId)
			.set(payload, { merge: true })
	}
}

export default services