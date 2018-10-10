import React, { Component } from 'react';
import './app.css';
import { TasksProvider } from './TasksContext';
import TaskInput from './Components/TaskInput';
import ProjectInput from './Components/ProjectInput';
import TaskList from './Components/TaskList';
import Sidebar from './Components/Sidebar';

// main App component contains all state and overarching functions
export default class App extends Component {
  render() {
    return (
      <TasksProvider>
        <div className="app">
          <div className="main-content">
            <TaskInput 
              onAddTask={this.handleAddTask} 
            />
            <TaskList />
            <ProjectInput />
          </div>
          <Sidebar />
          {/* <Sidebar 
            selectedTask={this.state.tasks.filter(task => task.selected)[0]} 
            onAddTool={this.handleAddTool} 
            onDeleteTool={this.handleDeleteTool}
          /> */}
        </div>
      </TasksProvider>
    );
  }
}