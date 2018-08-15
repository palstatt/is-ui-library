const colors = {
	primary: '#008DD5',
	primary__light: '#5EBDFF',
	primary__dark: '#0060A3',
	primary__bg: '#CCE9F7',
	secondary: '#06D6A0',
	secondary__light: '#63FFD1',
	secondary__dark: '#00A371',
	secondary__bg: '#CEF7EC',
	tertiary: '#D67CC8',
	tertiary__light: '#FFADFB',
	tertiary__dark: '#A34D97',
	tertiary__bg: '#F7E5F4',
	primary_hover: '#00679B',
	secondary_hover: '#04A078',
	tertiary_hover: '#A04391',
	black: '#353535',
	white: '#FFFFFF',
	bg_grey: '#F9F9F9',
	grey: '#BBBBBB',
	light_grey: '#D6D6D6',
	lightest_grey: '#EBEBEB',
	warning: '#FF6E6E',
	warning__light: '#FFA09C',
	warning__dark: '#C73C43',
	warning__bg: '#FFB6B6',
	complete: '#6CFF7E',
	complete__light: '#A4FFAF',
	complete__dark: '#29CB4E',
	complete__bg: '#B5FFBE',
	attention: '#FFED4A',
	attention__light: '#FFFF7E',
	attention__dark: '#C8BB00',
	attention__bg: '#FFF6A4',
}

export const scrim = `rgba(0, 0, 0, .20)`

export const gradients = {
	l_to_r: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
	r_to_l: `linear-gradient(${colors.primary}, ${colors.primary})`,
}

export const shadows = {
	basic: '0 2px 4px rgba(0, 0, 0, .10)',
	focus: '0 4px 6px rgba(0, 0, 0, .20)',
}

export default colors
