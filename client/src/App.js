import React, { Component } from 'react';
import { TasksProvider } from './TasksContext';

// components
import TaskInput from './Components/TaskInput';
import ProjectInput from './Components/ProjectInput';
import TaskList from './Components/TaskList';
import Sidebar from './Components/Sidebar';

// global styles
import './app.css';
import styled from 'styled-components';
import logo from './images/lucid-logo.png';
import bottomBg from './images/bg-bottom-right.svg';

// All state and global functions live in TasksContext!
export default class App extends Component {
  render() {
    return (
      <Container>
        <Header>
          <HeaderGroup>
            <Logo alt="Lucid infinity logo" src={logo} />
            <Title>Lucid</Title>
          </HeaderGroup>
        </Header>
      <TasksProvider>
        <MainBox>
          <MainContent>
            <TaskInput 
              onAddTask={this.handleAddTask} 
            />
            <TaskList />
            <ProjectInput />
          </MainContent>
          <Sidebar />
        </MainBox>
      </TasksProvider>

      <Footer />
      </Container>
    );
  }
}

const Container = styled.div`
  position: relative;
  height: 100%;
  min-height: 100vh;
`;

const Header = styled.div`
  width: 80%;
  height: 125px;
  max-width: 1020px;
  margin: 0 auto;
  position: relative;
`;

const Logo = styled.img`
  width: 115px;
  display: inline-block;
  padding-top: 10px;
`;

const Title = styled.h1`
  line-height: 1;
  text-transform: lowercase;
  font-size: 3em;
  color: var(--grey);
  display: inline-block;
  margin: 0;
  padding: 0 .5em;
  font-weight: 200;
  letter-spacing: 0.1em;
`;

const HeaderGroup = styled.div`
  position: absolute;
  bottom: 20px;

  &:hover {
    cursor: pointer;
  }

  &:hover ${Title} {
    color: var(--babyblue);
  }
`;

const MainBox = styled.div`
  border-top: 18px solid var(--grey);
  width: 80%;
  max-width: 1020px;
  margin: 0 auto 13em auto;
  background: #fff;
  box-shadow: 0 36px 51px rgba(0,0,0,0.1);
  display: flex;
`;

const MainContent = styled.div`
  padding: 2.2em;
  width: 57%;
`;

const Footer = styled.div`
  background: url(${bottomBg}) bottom right / 80% no-repeat;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: -101;
`;