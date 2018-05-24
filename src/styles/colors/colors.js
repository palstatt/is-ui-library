const colors = {
  primary: '#008DD5',
  secondary: '#06D6A0',
  tertiary: '#D67CC8',
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
  complete: '#6CFF7E',
  attention: '#FFED4A',
}

export const gradients = {
  l_to_r: `linear-gradient(${colors.primary}, ${colors.secondary})`,
  r_to_l: `linear-gradient(${colors.primary}, ${colors.primary})`,
}

export const shadows = {
  basic: '0 2px 4px rgba(0, 0, 0, .10)',
}

export default colors;
