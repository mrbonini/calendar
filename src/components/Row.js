import React from 'react';
import styled from 'styled-components';

export const StyledRow = styled.div`
    display: flex;
    flex-direction: ${props => props.direction ? props.direction : 'row'};
    justify-content: ${props => props.justify ? props.justify : 'flex-start'};
    align-items: ${props => props.alignItems ? props.alignItems : 'flex-start'};
    align-self: ${props => props.alignSelf ? props.alignSelft : 'null'};
    margin: 0.5em 0;
    ${props => props.style ? Object.entries(props.style).map(entry => entry[0] + ':' + entry[1]).toString().replaceAll(",", ";") : ''}
`

export default function Row(props) {
    const {
        children, direction, justify, alignItems, alignSelf, style, className
    } = props;

    return(
        <StyledRow className={className} direction={direction} justify={justify} alignItems={alignItems} alignSelf={alignSelf} style={style}>
            {children}
        </StyledRow>
    )
}