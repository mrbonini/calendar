import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

const ModalBody = styled.div`
    display: ${props => props.open ? 'flex' : 'none'};
    background: rgba(1, 1, 1, 0.75);
`

const ModalContent = styled.div`
    width: auto;
    max-width: 47%;
    max-height: 61%;
    min-width: 30%;
    min-height: 50%;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: ghostwhite;
    padding: 4em;
    justify-content: center;
    position: relative;
    border-radius: 10px;
    ${props => props.contentStyle ? Object.entries(props.contentStyle).map(entry => entry[0] + ':' + entry[1]).toString().replaceAll(",", ";") : ''}
`

const ModalCloseButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    background: transparent;
    border: 0;
    cursor: pointer
`

export default function Modal(props) {
    const { children, open, handleClose, contentStyle } = props;

    return (
        <ModalBody className='modal' open={open}>
            <ModalContent contentStyle={contentStyle} className='modal-content'>
                {
                    handleClose ?
                    <ModalCloseButton onClick={handleClose}> 
                        <FontAwesomeIcon icon={faWindowClose} size='3x' color='#3074B5'/>
                    </ModalCloseButton>
                    : null
                }
                {children}
            </ModalContent>
        </ModalBody>
    )
}