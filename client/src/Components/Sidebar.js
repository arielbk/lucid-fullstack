import React, { Component } from 'react';
import PomodoroTool from './PomodoroTool';
import NoteTool from './NoteTool';
import styled from 'styled-components';

// sidebar to display tools for a selected timer
export default class Sidebar extends Component {
  state = {
    showToolOptions: true,
  }

  render() { 
    return (
    <StyledSidebar>
        {!this.props.selectedTask && <SideInfo>Click a task to reveal tools</SideInfo>}
        {this.props.selectedTask && this.props.selectedTask.tools && this.props.selectedTask.tools.map(tool => {
          if (tool.name === 'PomodoroTool') {
            return (<PomodoroTool key={tool.id} thisTool={tool} onDeleteTool={this.props.onDeleteTool} />)
          } else if (tool.name === 'NoteTool') {
            return (<NoteTool key={tool.id} thisTool={tool} onDeleteTool={this.props.onDeleteTool} />)
          }
          return '';
        })}
        {this.props.selectedTask &&
          (<AddToolField 
            showToolOptions={this.state.showToolOptions}
            onClick={() => this.setState({ showToolOptions: !this.state.showToolOptions })}
          >
            <AddToolTitle>Add Tool</AddToolTitle>

            <AddToolOption 
              onClick={() => this.props.onAddTool(this.props.selectedTask.id, 'PomodoroTool')}
            >
              Pomodoro Timer
            </AddToolOption>

            <AddToolOption 
              onClick={() => this.props.onAddTool(this.props.selectedTask.id, 'NoteTool')}
            >
              Note
            </AddToolOption>

          </AddToolField>)
        }
    </StyledSidebar>
  )}
}

const StyledSidebar = styled.div`
  background: var(--lightblue);
  width: 55%;
  padding: 2.2rem;
  position: relative;
  text-align: center;
`;

const SideInfo = styled.h3`
  padding: 6em 1em;
  font-size: 1.2em;
  color: var(--grey);
  font-weight: 400;
`;

const AddToolField = styled.div`
  border: none;
  width: 100%;

  background: #fff;
  color: var(--darkblue);
  border-radius: 6px;
  text-align: center;
  ${props => props.showToolOptions &&
    'max-height: 2.2rem; overflow: hidden;'}
`;

const AddToolTitle = styled.div`
  font-weight: 400;
  font-size: 1em;
  margin: 0 auto;
  line-height: 1em;
  padding: .6em;

  &:hover {
    background: var(--grey);
    color: #fff;
  }
`;

const AddToolOption = styled.div`
  padding: .6em;

  &:hover {
    cursor: pointer;
    background: var(--lightgrey);
  }
`;