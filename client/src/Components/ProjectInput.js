import React, { Component } from 'react';
import styled from 'styled-components';
import TasksContext from '../TasksContext';

export default class ProjectInput extends Component {
  state = {
    inputValue: '',
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleBlur = () => {
    this.setState({ inputValue: '' });
  }

  render() { return (
    <TasksContext.Consumer>
      {context => (
        <form onSubmit={e => {
          context.onAddProject(e, this.state.inputValue);
          this.setState({ inputValue: '' });
        }}>
          <div style={{position: 'relative'}}>
            <AddProjectField
              onBlur={this.handleBlur} 
              placeholder='Add Project' 
              value={this.state.inputValue} 
              onChange={ this.handleInputChange } 
            />
          </div>
        </form>
      )}
    </TasksContext.Consumer>
  )}
}

const AddProjectField = styled.input`
  font-weight: 400;
  font-size: 1em;
  padding-left: .5rem;
  margin: 1em 0;

  border: none;
  width: 100%;
  border-bottom: 3px solid #fff;

  background: var(--lightgreen);
  color: var(--darkblue);
  border-radius: 6px;
  padding: .5em;

  &:hover {
    background: var(--green);
    cursor: pointer;

    &::placeholder {
      color: #fff;
    }
  }

  &:focus {
    outline: none;
    border-bottom: 3px solid var(--green);
    border-radius: 0;
    background: transparent;

    &::placeholder {
      color: rgba(0,0,0,0);
    }
  }

  &::placeholder {
    font-weight: 400;
    font-size: 1em;
    color: var(--green);
    opacity: 1;
  }


`;