import React, { useEffect, useState } from 'react'
import { Platform, PermissionsAndroid } from 'react-native'
import Geolocation from 'react-native-geolocation-service'

const useGeolocation = (regetPositionTrigger) => {
	const [currentPosition, setCurrentPosition] = useState({
		latitude: 0,
		longitude: 0,
	})

	const requestPermissionAndroid = async () => {
		try {
			const res = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				{
					title: "Give Fine Location Permission?",
					message: "You need to give location permission to automatically center the map to your current location.",
					buttonNegative: "No",
					buttonPositive: "Yes"
				}
			)

			return res === PermissionsAndroid.RESULTS.GRANTED
		} catch (err) {
			console.error(err)
		}
	}

	const requestPermissionIOS = async () => {
		try {
			const res = await Geolocation.requestAuthorization('whenInUse')
			return res === 'granted'
		} catch (err) {
			console.error(err)
		}
	}

	const requestPermission = async () => {
		let res
		if (Platform.OS === 'android') res = await requestPermissionAndroid()
		else if (Platform.OS === 'ios') res = await requestPermissionIOS()
		return res
	}

	const getCurrentPosition = async () => {
		const isAuthorized = await requestPermission()
		if (!isAuthorized) return

		Geolocation.getCurrentPosition(
			res => setCurrentPosition(res.coords),
			console.error,
			{ enableHighAccuracy: true }
		)
	}

	useEffect(() => {
		getCurrentPosition()
	}, [regetPositionTrigger])

	return { currentPosition }
}

export default useGeolocation