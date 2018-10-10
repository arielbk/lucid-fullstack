import React, { Component, Fragment } from 'react';
import TasksContext from '../TasksContext';
import Modal from './Modal';
import { Toggle } from '../Utilities';
import styled from 'styled-components';
import ProjectAddTask from './ProjectAddTask';

// controls rendering and animation for list of projects and tasks
export default class TaskList extends Component {
  render() {
    return (
    <TasksContext.Consumer>
      {context => (

        <Fragment>
          {context.state.projects.map(project => {
            return (
              <ProjectGroup key={project.id}>
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
                      <Modal toggle={toggle} on={on} onDelete={() => {context.onDeleteProject(project.id); toggle()}}>
                        Are you sure you want to delete the project, {project.name}?
                      </Modal>
                    </Fragment>
                  )}
                </Toggle>
              )}
      
                <ProjectAddTask project={project} />
      
                <ProjectTasks data-id={project.id}>
                  {context.state.tasks.map(task => (
                    task.project === project.id && (
                      <li key={task.id} data-id={task.id}>
                        
                        <input type="checkbox" />
                        <CheckTask />
      
                        <span className="task-item" onClick={context.onSelectTask} data-id={task.id}>
                          {task.name}
                        </span>
      
                        {/* Toggles delete modal component */}
                        <Toggle>
                          {({on, toggle}) => (
                            <Fragment>
                              <DeleteButton onClick={toggle}>✕</DeleteButton>
                              <Modal toggle={toggle} on={on} onDelete={() => {context.onDeleteTask(task.id); toggle()}}>
                                Are you sure you want to delete the task, {task.name}?
                              </Modal>
                            </Fragment>
                          )}
                        </Toggle>

                        <TaskUnderline selected={task.selected}/>
                      </li>
                    )
                  ))}
                </ProjectTasks>
              </ProjectGroup>
            )
          })}

        </Fragment>
      )}
    </TasksContext.Consumer>
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