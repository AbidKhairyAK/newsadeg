import React, { useRef, useState, useCallback } from 'react'
import { View, StyleSheet, Image, Platform } from 'react-native'
import OriginMapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { debounce } from 'lodash'
import { isEmpty } from 'validate.js'

import { ShadowView } from '@/components'
import { sizes, colors } from '@/constants'
import { getScreenSize } from '@/helpers'
import { useGeolocation } from '@/hooks'

const MapView = ({
	style,
	onChange,
	latitude,
	longitude,
	delta,
	onChangeLatitude,
	onChangeLongitude,
	showOverlay,
	OverlayComponent
}) => {
	const { currentPosition } = useGeolocation()

	const [isMapReady, setMapReady] = useState(false);

	const mapRef = useRef(null);

	const handleMapReady = useCallback(() => {
		setMapReady(true);
	}, [mapRef, setMapReady]);

	const currentRegion = {
		latitude: parseFloat(latitude) || currentPosition.latitude,
		longitude: parseFloat(longitude) || currentPosition.longitude,
		latitudeDelta: parseFloat(delta) || 0.05,
		longitudeDelta: parseFloat(delta) || 0.05,
	}

	const handleRegionChange = (region) => {
		if (region.latitude === currentRegion.latitude || region.longitude === currentRegion.longitude) return
		if (onChange) onChange(region)
		if (onChangeLatitude) onChangeLatitude(region.latitude)
		if (onChangeLongitude) onChangeLongitude(region.longitude)
	}

	return <>
		<ShadowView type="item" radius="xs" style={style}>
			<View style={styles.inner}>
				<OriginMapView
					key="map"
					ref={mapRef}
					provider={PROVIDER_GOOGLE}
					style={isMapReady || Platform.OS === 'ios' ? styles.map : {}}
					onMapReady={handleMapReady}
					showsUserLocation={true}
					showsMyLocationButton={true}
					region={currentRegion}
					initialRegion={currentRegion}
					onRegionChangeComplete={handleRegionChange}
				/>
				{showOverlay && (
					OverlayComponent
					? <OverlayComponent />
					: <Image
						source={require('@/assets/images/route.png')}
						style={styles.overlayImage}
					/>
				)}
			</View>
		</ShadowView>
	</>
}

export default MapView

const styles = StyleSheet.create({
	map: { width: '100%', height: getScreenSize().width * (2 / 3) },
	inner: { position: 'relative', borderRadius: sizes.xs, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
	overlayImage: { width: 48, resizeMode: 'contain', position: 'absolute' },
})