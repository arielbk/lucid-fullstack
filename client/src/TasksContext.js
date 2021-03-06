import React, { Component } from 'react';

// Create the tasks context
const TasksContext = React.createContext();

// Create the provider class, context's data lives here
class TasksProvider extends Component {
  constructor(props) {
    super(props);

    this.uuidv4 = require('uuid/v4');
    // demo project id
    this.demoId = this.uuidv4();

    this.state = {
      expressTest: [],
      projects: [
        {
          name: 'Unsorted Tasks',
          id: 0,
        },
        {
          name: 'Sample Project',
          id: this.demoId,
        }
      ],
      tasks: [
        {
          name: 'This is a task without a project, it is unsorted',
          id: this.uuidv4(),
          project: 0,
          selected: false,
          tools: [],
        },
        {
          name: 'Try to mark a task as completed by using the check box to the left',
          id: this.uuidv4(),
          project: 0,
          selected: false,
          tools: [],
        },
        {
          name: 'These tasks below are part of the \'Sample Project\'',
          id: this.uuidv4(),
          project: this.demoId,
          selected: false,
          tools: [],
        },
        {
          name: 'Add another task to the project by pressing the plus icon next to a project',
          id: this.uuidv4(),
          project: this.demoId,
          selected: false,
          tools: [],
        },
        {
          name: 'Delete a task or an entire project by pressing the delete button to their right',
          id: this.uuidv4(),
          project: this.demoId,
          selected: false,
          tools: [],
        },
        {
          name: 'Click on a task text to interact with that tasks \'tools\'',
          id: this.uuidv4(),
          project: this.demoId,
          selected: false,
          tools: [],
        },
      ]
    }
  }

  // Interact with backend API (demo)
  componentDidMount = () => {
    fetch('/api')
      .then(res => res.json())
      .then(expressTest => this.setState({ expressTest }, console.log('Express test...', expressTest)));
  }

  // TASK FUNCTIONS

  // toggles whether the task passed in is selected, and deselects all other tasks
  handleSelectTask = (e) => {
    const tasks = [...this.state.tasks];
    tasks.forEach(task => {
      task.id === e.target.dataset.id
        ? task.selected = !task.selected
        : task.selected = false;
    });
    this.setState({ tasks });
  }

  // adds a tool to selected task
  handleAddTool = (taskID, toolName) => {
    const tasks = [...this.state.tasks];
    if (toolName === 'PomodoroTool' || toolName === 'NoteTool' || toolName === 'TodoTool') {
      tasks.forEach(task => {
        if (task.id === taskID) task.tools.push({
          name: toolName,
          id: this.uuidv4(),
        });
      });
    }
    this.setState({ tasks });
  }

  // deletes the tool with the id passed in from the selected task
  handleDeleteTool = (toolId) => {
    const tasks = [...this.state.tasks];
    tasks.forEach(task => {
      if (task.selected) {
        task.tools.forEach(tool => {
          if (tool.id === toolId) {
            const index = task.tools.indexOf(tool);
            task.tools.splice(index, 1);
          }
        })
      }
    });
    this.setState({ tasks });
  }

  // adds a new empty project to the list
  handleAddProject = (e, input) => {
    e.preventDefault();
    if (input === "") {
      return;
    }
    const projects = [...this.state.projects];
    projects.push({
      name: input,
      id: this.uuidv4(),
    });
    this.setState({projects})
  }

  // removes a project and all of its contained tasks from the list
  handleDeleteProject = (projectId) => {
    // remove project
    const projects = [...this.state.projects];
    const selectedProject = projects.filter(project => project.id === projectId);
    const index = projects.indexOf(selectedProject[0]);
    projects.splice(index, 1);

    // remove all contained tasks
    const tasks = [...this.state.tasks];
    tasks.forEach(task => {
      if (task.project === projectId) {
        const taskIndex = tasks.indexOf(task);
        tasks.splice(taskIndex, 1);
      }
    });

    this.setState({ projects, tasks });
  }

  // adds a new task to the top of the list
  handleAddTask = (e, taskName, projectId = 0) => {
    e.preventDefault();
    if (taskName === "") {
      return;
    }

    const tasks = [...this.state.tasks];
    tasks.unshift({
      name: taskName,
      id: this.uuidv4(),
      project: projectId,
      selected: false,
      tools: [],
    });

    this.setState({ tasks });
  }

  // deletes a task from the list
  handleDeleteTask = (taskId) => {
    const tasks = [...this.state.tasks];
    const selectedTask = tasks.filter(task => task.id === taskId);
    const index = tasks.indexOf(selectedTask[0]);
    tasks.splice(index, 1);
    this.setState({ tasks });
  }

  render() {
    return (
      <TasksContext.Provider value={{
        state: this.state,
        onSelectTask: this.handleSelectTask,
        onAddTool: this.handleAddTool,
        onDeleteTool: this.handleDeleteTool,
        onAddProject: this.handleAddProject,
        onDeleteProject: this.handleDeleteProject,
        onAddTask: this.handleAddTask,
        onDeleteTask: this.handleDeleteTask
      }}>
        { this.props.children }
      </TasksContext.Provider>
    )
  }
}

// Export the tasks context as a default
export default TasksContext;
export { TasksProvider };