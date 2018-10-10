import React, { Component } from 'react';
import TasksContext from '../TasksContext';
import styled from 'styled-components';

export default class ProjectAddTask extends Component {
  state = {
    input: '',
  }

  // controlled form input for adding task directly to a project
  handleChange = e => {
    this.setState({ input: e.target.value });
  }

  render() { 
    const { project } = this.props;
    return (
      <TasksContext.Consumer>
        {context => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              context.onAddTask(e, this.state.input, project.id);
              this.setState({ projectAddTaskInput: '' });
            }}
          >
            <ProjectAddTaskField 
              type="text"
              value={this.state.projectAddTaskInput} 
              onChange={this.handleChange} 
              placeholder="Enter a task name"
            />
          </form>
        )}
      </TasksContext.Consumer>
    )}
}

const ProjectAddTaskField = styled.input`
  margin: 1em 0 0 1em;
  width: 100%;
  font-size: 1em;
  border: none;
  border-bottom: 3px solid #fff;
  padding: .3em .5em;
  background: var(--lightgrey);

  &:focus {
    outline: none;
    border-bottom: 3px solid var(--babyblue);
    background: #fff;
    border-radius: 0;
  }
`;