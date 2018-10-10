import React, { Component } from 'react';
import { ToolContainer, DeleteButton } from './tool';
import styled from 'styled-components';

export default class NoteTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    }
  }

  handleInputChange = () => {
    this.setState({ input: this.refs.noteInput.value });
  }

  render() {
    return (
      <ToolContainer>

        <DeleteButton onClick={() => this.props.onDeleteTool(this.props.thisTool.id)}>✕</DeleteButton>

        <NoteInput 
          placeholder='Enter a note for this task...' 
          ref='noteInput' 
          onChange={this.handleInputChange} 
          value={this.state.input} 
        />
        
      </ToolContainer>
    )
  }
}

const NoteInput = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  border-bottom: 3px solid #fff;
  line-height: 1.5em;
  resize: vertical;
  min-height: 2em;
  font-size: .9em;
  transition: border .3s;
  padding: .5em;

  &:hover {
    border-bottom: 3px solid var(--grey);
  }

  &:focus {
    outline: none;
    border-bottom: 3px solid var(--babyblue);
  }
`;