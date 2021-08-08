import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { BaseText, BaseIcon } from '@/components'
import { sizes, colors } from '@/constants'

const ITEM_TOP_PADDING = sizes.xl
const ITEM_BOTTOM_PADDING = sizes.xl
const ICON_SIZE = sizes.lg

const CustomTabBar = ({ state, descriptors, navigation, icons }) => {
	const focusedOptions = descriptors[state.routes[state.index].key].options;

	if (focusedOptions.tabBarVisible === false) {
		return null;
	}

	return <>
		<LinearGradient 
			colors={[colors.background + '00', colors.background]} 
			style={styles.topGradient}
		/>
		<View style={styles.container}>
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
						delayPressIn={100}
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
					</TouchableOpacity>
				);
			})}
		</View>
	</>;
}

export default CustomTabBar

const styles = StyleSheet.create({
	topGradient: { width: '100%', height: sizes.xxxl, position: 'absolute', zIndex: 1, bottom: ITEM_TOP_PADDING + ITEM_BOTTOM_PADDING + ICON_SIZE },
	container: { flexDirection: 'row' },
	itemWrapper: { flex: 1, alignItems: 'center', position: 'relative', paddingTop: ITEM_TOP_PADDING, paddingBottom: ITEM_BOTTOM_PADDING },
	itemIcon: {}
})