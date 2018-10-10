import React, { Component, Fragment } from 'react';
import Modal from './Modal';
import { Toggle } from '../Utilities';

import styled from 'styled-components';

// controls rendering and animation for list of projects and tasks
export default class TaskList extends Component {
  render() {
    return (
    <Fragment>
    {this.props.projects.map(project => {
      return (
        <ProjectGroup ref={project.id} key={project.id}>
          <h3>
            {project.name}
          </h3>

          <ProjectAddTaskButton>
            +
          </ProjectAddTaskButton>

        {/* Toggles delete modal component (except for unsorted tasks) */}
        {project.id !== 0 && (
          <Toggle>
            {({on, toggle}) => (
              <Fragment>
                <DeleteButton onClick={toggle}>✕</DeleteButton>
                <Modal toggle={toggle} on={on} onDelete={() => {this.props.onDeleteProject(project.id); toggle()}}>
                  Are you sure you want to delete the project, {project.name}?
                </Modal>
              </Fragment>
            )}
          </Toggle>
        )}

          <ProjectAddTask onProjectAddTask={this.props.onProjectAddTask} project={project} />

          <ProjectTasks ref={`${project.id}-list`} data-id={project.id}>
            {this.props.tasks.map(task => {
              if (task.project === project.id) { 
                return (
                <li ref={task.id} key={task.id} data-id={task.id}>
                  
                  <input type="checkbox" />
                  <CheckTask />

                  <span className="task-item" onClick={this.props.onSelectTask} data-id={task.id}>
                    {task.name}
                  </span>

                  {/* Toggles delete modal component */}
                  <Toggle>
                    {({on, toggle}) => (
                      <Fragment>
                        <DeleteButton onClick={toggle}>✕</DeleteButton>
                        <Modal toggle={toggle} on={on} onDelete={() => {this.props.onDeleteTask(task.id); toggle()}}>
                          Are you sure you want to delete the task, {task.name}?
                        </Modal>
                      </Fragment>
                    )}
                  </Toggle>

                  <TaskUnderline selected={task.selected}/>

                </li>
              )} else {
                return '';
              }
            })}
          </ProjectTasks>
        </ProjectGroup>
      )
    })}

    </Fragment>
  )}
}

class ProjectAddTask extends Component {
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.props.onProjectAddTask(e, this.state.input, project.id);
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
}


const ProjectGroup = styled.div`
  color: var(--darkblue);
  position: relative;
  margin: 0 0 0 -1em;
  padding-left: 1em;

  h3 {
    font-weight: 400;
    font-size: 1em;
    padding-left: .5rem;
    margin: 0;
    border-bottom: 3px solid var(--lightgrey);
  }

  h3::before {
    content: '▶';
    position: absolute;
    left: 0;
    top: 0.5em;
    color: var(--black);
    font-size: 0.6em;
    transform: rotate(90deg);
  }
`;

const DeleteButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 0;
  right: 0;
  color: var(--black);
  font-size: 1.1em;
  width: 1.5em;
  height: 1.5em;
  margin: 0;
  border-radius: 100%;
  background: #fff;

  &:hover {
    color: red;
    cursor: pointer;
    opacity: 1;
  }
`;

const ProjectAddTaskButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 0;
  right: 2em;
  color: var(--black);
  font-size: 1.1em;
  width: 1.5em;
  height: 1.5em;
  margin: 0;
  opacity: 1;
  border-radius: 100%;
  background: #fff;
  transition: .3s;
  transform: rotate(45deg);
  opacity: 0.4;

  &:hover {
    cursor: pointer;
    color: var(--green);
    opacity: 1;
  }
`;

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

const ProjectTasks = styled.ul`
  color: var(--black);
  transition: .3s;
  overflow: hidden;
  list-style: none;
  padding-top: .5em;
  padding-bottom: .5em;

  & li {
    margin-bottom: 1.2em;
    font-size: 0.9em;
    position: relative;
  }

  & input {
    position: absolute;
    top: .1rem;
    left: -2rem;
    opacity: 0;
    z-index: 100;
    width: 20px;
    height: 20px;
    padding: 0;
    margin: 0;
  }
`;

// ProjectTask input should be controlled - state determines the check style...
const CheckTask = styled.span`
  position: absolute;
  top: .1rem;
  left: -2rem;
  height: 20px;
  width: 20px;
  border-radius: 6px;
  background: #d8d8d8;
`;

const TaskUnderline = styled.div`
  height: 4px;
  width: 100%;
  background: var(--babyblue);
  position: absolute;
  bottom: -.2em;
  left: -.2em;
  transition: .3s;
  ${props => props.selected ? 'max-width: 100%;' : 'max-width: 0;'}
`;