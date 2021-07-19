import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { ShadowFlex } from 'react-native-neomorph-shadows'

import { BaseText, BaseIcon } from '@/components'
import { sizes, colors, shadows } from '@/constants'

const ITEM_TOP_PADDING = sizes.lg
const ITEM_BOTTOM_PADDING = sizes.lg
const ICON_SIZE = sizes.xl
const CONTAINER_RADIUS = sizes.base
const SWITCH_HEIGHT = sizes.xl

const CustomTabBar = ({ state, descriptors, navigation, icons }) => {
	const [isOpen, setIsOpen] = useState(true)

	const focusedOptions = descriptors[state.routes[state.index].key].options;

	if (focusedOptions.tabBarVisible === false) {
		return null;
	}

	const toggleIsOpen = () => setIsOpen(prev => !prev)

	return <>
		<ShadowFlex style={styles.container}>
			<View style={styles.containerInner}>
				<View style={styles.containerLeft}>
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

				<View style={styles.containerRight}>
					<View style={{
						...styles.switchWrapper,
						...styles[isOpen ? 'switchWrapperOpen' : 'switchWrapperClosed']
					}}>
						<TouchableOpacity onPress={toggleIsOpen}>
							<ShadowFlex style={styles.switchItem}>
								<View style={{
									...styles.switchItemInner,
									...styles[isOpen ? 'switchItemOpen' : 'switchItemClosed']
								}}>
									<BaseText size="xs" type="semi-bold" color="white" style={styles.switchText}>
										{isOpen ? 'OPEN' : 'CLOSED' }
									</BaseText>
								</View>
							</ShadowFlex>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</ShadowFlex>
	</>;
}

export default CustomTabBar

const styles = StyleSheet.create({
	container: { ...shadows.tabBar, backgroundColor: colors.background, borderRadius: CONTAINER_RADIUS },
	containerInner: { flexDirection: 'row', backgroundColor: colors.white, borderTopLeftRadius: CONTAINER_RADIUS, borderTopRightRadius: CONTAINER_RADIUS },
	containerLeft: { flexDirection: 'row', flex: 2 },
	containerRight: { flex: 1, justifyContent: 'center', alignItems: 'center' },
	itemWrapper: { flex: 1, alignItems: 'center', position: 'relative', paddingTop: ITEM_TOP_PADDING, paddingBottom: ITEM_BOTTOM_PADDING },
	activeIndicator: { width: sizes.xs, height: sizes.xs / 4, backgroundColor: colors.green, borderRadius: sizes.xs, position: 'absolute', bottom: sizes.sm },
	switchWrapper: { height: SWITCH_HEIGHT / 1.5, borderRadius: SWITCH_HEIGHT / 5, justifyContent: 'center', backgroundColor: colors.gray + '55' },
	switchWrapperOpen: { paddingLeft: sizes.xxs, alignItems: 'flex-end' },
	switchWrapperClosed: { paddingRight: sizes.xxs, alignItems: 'flex-start' },
	switchItem: { ...shadows.item, borderRadius: SWITCH_HEIGHT / 5 },
	switchItemInner: { height: SWITCH_HEIGHT, justifyContent: 'center', paddingHorizontal: sizes.xxs, borderRadius: SWITCH_HEIGHT / 5 },
	switchItemOpen: { backgroundColor: colors.green },
	switchItemClosed: { backgroundColor: colors.red },
	switchText: { lineHeight: sizes.xs * 1.35 }
})