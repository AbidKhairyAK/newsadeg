import AsyncStorage from '@react-native-async-storage/async-storage'

import { isJsonParsable } from '@/helpers'

// register storage key here before using it in your code
const storageKeys = ['token', 'user', 'isAppHasBeenOpened']

const checkKey = key => storageKeys.includes(key)
const checkKeyErr = "Key doesn't match any data in the storage"

const storage = {
	...AsyncStorage,
	async setItem (key, value) {
		try {
			if (!checkKey(key)) throw checkKeyErr
			if (typeof value !== 'string') value = JSON.stringify(value)
			await AsyncStorage.setItem(key, value)
		} catch (err) {
			console.error(err)
			throw err
		}
	},
	async getItem (key) {
		try {
			if (!checkKey(key)) throw checkKeyErr
			let value = await AsyncStorage.getItem(key)
			if (isJsonParsable(value)) value = JSON.parse(value)
			return value
		} catch (err) {
			console.error(err)
			throw err
		}
	}
}

export default storage