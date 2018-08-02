import React from 'react'
import styled from 'styled-components'
import { H4 } from '../..'

const Label = styled(H4)`
	color: ${props => props.theme.label};
	margin: 0 ${props => (props.labelLeft ? '8px 0' : '0 8px')} 0;
	line-height: 1em;
`

export default Label
