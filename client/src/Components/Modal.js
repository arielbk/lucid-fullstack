import React, { Component } from 'react';
import styled from 'styled-components';

export default class Modal extends Component {

  render() {
    return (
    <ModalOverlay onClick={
      (e) => e.target.className === 'modal-overlay' ? this.props.onToggle() : ''}
    >

      <ModalContent>
        Are you sure you want to delete the {this.props.taskOrProject} ‘{this.props.target.name}’{
          this.props.taskOrProject === 'project' && ', and all of its tasks'
        }?
        
        <ModalButtons>
          <ModalButtonCancel onClick={this.props.onToggle}>Cancel</ModalButtonCancel>
          <ModalButtonDelete onClick={() => this.props.onDelete(this.props.taskOrProject, this.props.target)}>Delete</ModalButtonDelete>
        </ModalButtons>

      </ModalContent>
    </ModalOverlay>
  )}
}

const ModalOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  overflow: hidden;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.2);
  box-shadow: 0 36px 51px rgba(0,0,0,0.1);
  transition: .3s;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 2em;
  border-top: 3px solid var(--grey);
  max-width: 500px;
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