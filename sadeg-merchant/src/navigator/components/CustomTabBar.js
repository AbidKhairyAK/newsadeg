import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { BaseText, BaseIcon, BaseSwitch, ShadowView } from '@/components'
import { sizes, colors } from '@/constants'
import { RestaurantService } from '@/services'
import { setRestaurantData } from '@/store/restaurant'

const ITEM_TOP_PADDING = sizes.lg
const ITEM_BOTTOM_PADDING = sizes.lg
const ICON_SIZE = sizes.xl
const CONTAINER_RADIUS = sizes.base

const CustomTabBar = ({ state, descriptors, navigation, icons }) => {
	const dispatch = useDispatch()
	
	const { restaurant_status, ...otherRestaurantData } = useSelector(state => state.restaurant)
	
	const [isLoading, setIsLoading] = useState(false)

	const isOpen = restaurant_status === 'open'

	const toggleRestaurantStatus = async () => {
		try {
			setIsLoading(true)
			const newStatus = isOpen ? 'close' : 'open'
			await RestaurantService.updateStatus(newStatus)
			dispatch(setRestaurantData({ ...otherRestaurantData, restaurant_status: newStatus }))
		} catch (err) {
			console.error(err)
		} finally {
			setIsLoading(false)
		}
	}
	

	const focusedOptions = descriptors[state.routes[state.index].key].options;

	if (focusedOptions.tabBarVisible === false) {
		return null;
	}

	return <>
		<ShadowView type="tabBar" radius={{ topLeft: CONTAINER_RADIUS, topRight: CONTAINER_RADIUS }}>
			<View style={styles.container}>
				<View style={styles.leftSection}>
					{state.routes.map((route, index) => {
						const { options } = descriptors[route.key];
						const label =
							options.tabBarLabel !== undefined
								? options.tabBarLabel
								: options.title !== undefined
								? options.title
								: route.name;

						const isFocused = state.index === index;

						const iconName = icons[label] + (!isFocused ? '-outline' : '')
						// const iconName = icons[label]

						const onPress = () => {
							const event = navigation.emit({
								type: 'tabPress',
								target: route.key,
								canPreventDefault: true,
							});

							if (!isFocused && !event.defaultPrevented) {
								navigation.navigate(route.name);
							}
						};

						const onLongPress = () => {
							navigation.emit({
								type: 'tabLongPress',
								target: route.key,
							});
						};

						return (
							<TouchableOpacity 
								
								key={label}
								accessibilityRole="button"
								accessibilityState={isFocused ? { selected: true } : {}}
								accessibilityLabel={options.tabBarAccessibilityLabel}
								testID={options.tabBarTestID}
								onPress={onPress}
								onLongPress={onLongPress}
								style={styles.itemWrapper}
							>
								<BaseIcon 
									name={iconName} 
									color={isFocused ? 'green' : 'gray'}
									size={ICON_SIZE}
								/>
								{isFocused && <View style={styles.activeIndicator} />}
							</TouchableOpacity>
						);
					})}
				</View>

				<View style={styles.rightSection}>
					<BaseSwitch 
						onPress={toggleRestaurantStatus}
						isLoading={isLoading}
						status={isOpen}
						trueTitle="OPEN" 
						falseTitle="CLOSED" 
					/>
				</View>
			</View>
		</ShadowView>
	</>;
}

export default CustomTabBar

const styles = StyleSheet.create({
	container: { flexDirection: 'row', backgroundColor: colors.white, borderTopLeftRadius: CONTAINER_RADIUS, borderTopRightRadius: CONTAINER_RADIUS },
	leftSection: { flexDirection: 'row', flex: 2 },
	rightSection: { flex: 1, justifyContent: 'center', alignItems: 'center' },
	itemWrapper: { flex: 1, alignItems: 'center', position: 'relative', paddingTop: ITEM_TOP_PADDING, paddingBottom: ITEM_BOTTOM_PADDING },
	activeIndicator: { width: sizes.xs, height: sizes.xs / 4, backgroundColor: colors.green, borderRadius: sizes.xs, position: 'absolute', bottom: sizes.sm },
})