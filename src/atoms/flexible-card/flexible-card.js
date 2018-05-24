import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import AnimateHeight from 'react-animate-height'
import { colors, shadows, H1, MaterialIcon } from '../../'

const transitionInterval = .15

const Wrapper = styled.div`
  height: ${props => props.containerHeight || 'auto'};
  display: ${props => props.inline ? 'inline' : ''};
  width: ${props => props.blockWidth ? `${props.blockWidth}px` : '100%'};
  position: relative;

  & * {
    transition: ${transitionInterval}s ease;
  }
`

const Container = styled.div`
  box-shadow: ${shadows.basic};
  background: ${colors.white};
  transition: ${transitionInterval}s ease;
  transform: translateX(${props => props.leaveRight ? '100vw' :
                                   props.leaveLeft ? '-100vw' : ''});
  position: relative;
  height: 100%;
  width: 100%;
  display: grid;
  align-items: stretch;
  z-index: 4;
  padding: 16px;
  border-radius: 4px;
  overflow: hidden;
  grid-auto-columns: 1fr;
  grid-auto-rows: auto 1fr auto;
  grid-template-areas: "header"
                       "body"
                       "footer";
`

const ActionBackground = styled.div`
  background: ${props => colors[props.actionColor]};
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  padding: 0 24px 0 24px;
`

const ActionLabel = styled(H1)`
  margin-left: 16px;
`

const Header = styled.div`
  grid-area: header;
  overflow: inherit;
`
const Body = styled.div`
  grid-area: body;
  overflow: inherit;
`
const Footer = styled.div`
  grid-area: footer;
  overflow: inherit;
`

export default class FlexibleCard extends Component {

  state = {

  }

  static propTypes = {
    headers: PropTypes.arrayOf(PropTypes.element).isRequired,
    bodyPages: PropTypes.arrayOf(PropTypes.element).isRequired,
    footers: PropTypes.arrayOf(PropTypes.element).isRequired,
    headerID: PropTypes.number,
    bodyPageID: PropTypes.number,
    footerID: PropTypes.number,
    collapseHeight: PropTypes.number,
    expandHeight: PropTypes.number,
    blockWidth: PropTypes.number,
    inline: PropTypes.bool,
    actionLabel: PropTypes.string,
    actionColor: PropTypes.string,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
    expanded: PropTypes.bool,
    leaveLeft: PropTypes.bool,
    leaveRight: PropTypes.bool,
  }

  static defaultProps = {
    onExpand: () => {},
    onCollapse: () => {},
    onAdd: () => {},
    onRemove: () => {},
    onRightAction: () => {},
    onLeftAction: () => {},
    headerID: 0,
    bodyPageID: 0,
    footerID: 0,
    actionSymbol: 'check',
    actionLabel: 'complete',
    actionColor: 'complete',
  }

  render() {
    const { inline,
            blockWidth,
            headers,
            bodyPages,
            footers,
            headerID,
            bodyPageID,
            footerID,
            collapseHeight,
            expandHeight,
            actionColor,
            actionLabel,
            actionSymbol,
            expanded,
            leaveLeft,
            leaveRight } = this.props
    return (
      <Wrapper
        containerHeight={expanded ? expandHeight : collapseHeight}
        inline={inline}
        blockWidth={blockWidth}
      >
        <ActionBackground actionColor={actionColor}>
          <MaterialIcon large>{actionSymbol}</MaterialIcon>
          <ActionLabel>{actionLabel.toUpperCase()}</ActionLabel>
        </ActionBackground>
        <Container
          leaveRight={leaveRight}
          leaveLeft={leaveLeft}
        >
          <Header
            onClick={expanded ? this.handleCollapse : this.handleExpand}
          >
            {/* render prop passing expanded state */}
            {headers[headerID]}
          </Header>
            {/* animate hidden content */}
          <AnimateHeight
            height={expanded ? 'auto' : 0}
            animateOpacity
          >
            <Body>
              {bodyPages[bodyPageID]}
            </Body>
            <Footer>
              {footers[footerID]}
            </Footer>
          </AnimateHeight>
        </Container>
      </Wrapper>
    )
  }
}
