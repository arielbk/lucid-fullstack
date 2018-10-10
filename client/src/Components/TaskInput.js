import React, { Component } from 'react';
import styled from 'styled-components';
import TasksContext from '../TasksContext';

export default class TaskInput extends Component {
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
      <form onSubmit={(e) => {
        this.setState({ inputValue: '' })
        context.onAddTask(e, this.state.inputValue);
      }}>
        <MainInput 
          onChange={this.handleInputChange} 
          onBlur={this.handleBlur} 
          value={this.state.inputValue} 
          autoFocus 
          placeholder="Add Task" 
        />
      </form>
      )}
    </TasksContext.Consumer>
    )}
}

const MainInput = styled.input`
  width: 100%;
  border: none;
  font-size: 1.2em;
  margin-bottom: 2.2em;
  border-bottom: 3px solid #fff;
  padding: .5em 1em;
  background: var(--lightgrey);
  border-radius: 6px;
  text-align: center;

  &:focus {
    outline: none;
    border-bottom: 3px solid var(--babyblue);
    background: #fff;
    border-radius: 0;
  }
`;