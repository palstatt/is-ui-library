import { colors } from '../..'

export const themes = {
	active: {
		bg: colors.black,
		fg: colors.white,
		border: colors.black,
		label: colors.black,
		icon: 'info',
	},
	focused: {
		bg: colors.primary,
		fg: colors.white,
		border: colors.primary,
		label: colors.black,
		icon: 'info',
	},
	validating: {
		bg: colors.primary,
		fg: colors.white,
		border: colors.primary,
		label: colors.black,
		icon: 'sync',
	},
	disabled: {
		bg: colors.lightest_grey,
		fg: colors.grey,
		border: colors.lightest_grey,
		label: colors.grey,
		icon: 'info',
	},
	complete: {
		bg: colors.complete,
		fg: colors.black,
		border: colors.black,
		label: colors.black,
		icon: 'check_circle',
	},
	warning: {
		bg: colors.warning,
		fg: colors.black,
		border: colors.warning,
		label: colors.black,
		icon: 'error',
	},
}
