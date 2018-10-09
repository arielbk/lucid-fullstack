import styled from 'styled-components';

const ToolContainer = styled.div`
  position: relative;
  overflow: hidden;
  background: #fff;
  border-radius: 6px;
  margin-bottom: 1rem;
`;

const DeleteButton = styled.div`
  font-size: 1.2em;
  opacity: .4;
  right: .2em;
  top: .2em;
`;

const OptionsButton = styled.div`
  position: absolute;
  font-size: 1.2em;
  opacity: .4;
  left: .4em;
  top: 0;

  &:hover {
    cursor: pointer;
    opacity: .6;
  }
`;
export { ToolContainer, DeleteButton, OptionsButton }