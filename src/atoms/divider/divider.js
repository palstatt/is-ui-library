import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '../..'

const Divider = styled.span`
	width: ${props => (props.width ? `${props.width}px` : '100%')};
	background: ${props => props.color || colors.lightest_grey};
	margin: ${props => (props.extraSpace ? 24 : 16)}px 0;
	height: 2px;
`

Divider.propTypes = {
	width: PropTypes.number,
	color: PropTypes.string,
	extraSpace: PropTypes.bool,
}

export default Divider
