import React from 'react';
import styled from 'styled-components';

export const StyledItemRow = styled.div`
    margin: 1em 0;
    align-self: ${props => props.alignSelf ? props.alignSelft : 'null'};
    width: ${props => props.width ? props.width : 'auto'};
    height: ${props => props.height ? props.height : 'auto'};
    ${props => props.style ? Object.entries(props.style).map(entry => entry[0] + ':' + entry[1]).toString().replaceAll(",", ";") : ''}
`

export default function RowItem(props) {
    const {
        children, direction, justify, alignItems, alignSelf, style
    } = props;

    return(
        <StyledItemRow direction={direction} justify={justify} alignItems={alignItems} alignSelf={alignSelf} style={style}>
            {children}
        </StyledItemRow>
    )
}