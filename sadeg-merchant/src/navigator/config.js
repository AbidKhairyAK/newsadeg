import { DefaultTheme } from '@react-navigation/native'
import { colors } from '@/constants'

export const tabIcons = {
	OrderList: 'receipt',
	Menu: 'fast-food',
	Account: 'newspaper',
}

export const AppTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: colors.background
	}
}

export const AppScreenOptions = (withBackdrop) => ({
	headerShown: false,
	cardStyle: { backgroundColor: 'transparent' },
	cardOverlayEnabled: true,
	cardStyleInterpolator: ({ current: { progress } }) => withBackdrop ? ({
		cardStyle: {
			opacity: progress.interpolate({
				inputRange: [0, 0.5, 0.9, 1],
				outputRange: [0, 0.25, 0.7, 1],
			}),
		},
		overlayStyle: {
			opacity: progress.interpolate({
				inputRange: [0, 1],
				outputRange: [0, 0.5],
				extrapolate: 'clamp',
			}),
		},
	}) : ({}),
})