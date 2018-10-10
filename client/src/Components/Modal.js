import React, { Component } from 'react';
import { Portal } from '../Utilities';
import styled from 'styled-components';

export default class Modal extends Component {

  render() {
    const { children, toggle, on, onDelete } = this.props;
    return (
    <Portal>

      { on && (
      <ModalWrapper>
        <ModalContent>
          {children}
          <ModalButtons>
            <ModalButtonCancel onClick={toggle}>Cancel</ModalButtonCancel>
            <ModalButtonDelete onClick={onDelete}>Delete</ModalButtonDelete>
          </ModalButtons>
        </ModalContent>
        <Background />
      </ModalWrapper>
      )}

    </Portal>
  )}
}

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-60%);
  background: #fff;
  padding: 2em;
  border-top: 3px solid var(--grey);
  max-width: 500px;
  z-index: 100;
`;

const ModalButtons = styled.div`
  text-align: right;
  padding-top: 2em;
  margin-top: 1em;
  border-top: 1px solid var(--lightblue);
  margin-bottom: -.5em;
  margin-right: -.5em;
`;

const ModalButton = styled.div`
  display: inline-block;
  margin-left: 1em;
  padding: .5em 2em;
  text-align: center;

  border: none;
  border-bottom: 3px solid #fff;

  border-radius: 6px;
  text-align: center;
  transition: .3s;

  &:hover {
    cursor: pointer;
  }
`;

const ModalButtonCancel = styled(ModalButton)`
  border: 1px solid var(--grey);
  color: var(--grey);

  &:hover {
    background: var(--grey);
    color: #fff;
  }
`;

const ModalButtonDelete = styled(ModalButton)`
  background: red;
  color: #fff;
  opacity: .8;

  &:hover {
    opacity: 1;
    background: #d00;
  }
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
`;