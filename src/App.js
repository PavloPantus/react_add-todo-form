import React from 'react';
import './App.scss';

import oldTodos from './api/todos';
import users from './api/users';
import TodoList from './TodoList';
import NewTodo from './NewTodo';

class App extends React.Component {
  state = { todos: [...oldTodos] }

  addTodo = (newTask) => {
    this.setState(
      prev => ({ todos: [...prev.todos, newTask] })
    );
  };

  render() {
    const { todos } = this.state;

    return (
      <div className="App">
        <h1>Static list of todos</h1>
        <NewTodo
          todos={this.state.todos}
          addTodo={this.addTodo}
          users={users}
        />
        <TodoList todos={getTodosWithUsers(todos, users)} />
      </div>
    );
  }
}

const getTodosWithUsers = (mytodos, myusers) => (
  mytodos.map(todo => (
    {
      ...todo,
      user: myusers.find(user => user.id === todo.userId),
    }
  ))
);

export default App;
