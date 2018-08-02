import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '../..'

//styling for material icon component
const MaterialIcon = styled.i.attrs({
	className: 'material-icons',
	children: props => props.theme.icon || '',
})`
	user-select: none;
	font-size: ${props => (props.large ? '32' : props.small ? '16' : '24')}px;
	color: ${props =>
		props.color ? props.color : props.theme.fg || colors.black};
	transform-origin: right center;
`
MaterialIcon.propTypes = {
	color: PropTypes.string,
}

export default MaterialIcon
