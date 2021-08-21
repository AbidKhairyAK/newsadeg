import firestore from '@react-native-firebase/firestore'

const collection = 'driver'
const docPrefix = 'driver_'
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
		this.create(driverId) // development fail-safe

		return baseObject(driverId).delete()
	},
	async setOrder (driverId, orderId, payload, isMerge = true) {
		this.create(driverId) // development fail-safe

		return baseObject(driverId)
			.collection(subCollection)
			.doc(subDocPrefix + orderId)
			.set(payload, { merge: isMerge })
	},
	getActiveDrivers () {
		return firestore()
			.collection(collection)
			.where('status', '==', true)
			.get()
	},
	async sendDeliveryRequests (drivers, orderId, payload, isMerge = true) {
		const batch = firestore().batch()

		drivers.forEach(driver => {
			batch.set(
				baseObject(driver._data.id).collection(subCollection).doc(subDocPrefix + orderId),
				payload,
				{ merge: isMerge }
			)
		})

		return batch.commit()
	}
}

export default services