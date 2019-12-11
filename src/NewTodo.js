import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    currentid: 0,
    currentTitle: '',
  }

  handleSelectChange = (event) => {
    const userId = +event.target.value;

    this.setState({
      userId,
      currentid: userId,
    });
  }

  handleInputChange = (event) => {
    event.persist();
    this.setState(prevState => ({
      ...prevState,
      currentTitle: event.target.value,

    }));
  }

  render() {
    const { addTodo, users, todos } = this.props;

    const { currentid, currentTitle } = this.state;

    const addButtonClick = () => {
      if (
        !currentTitle
        || currentid === 0
      ) {
        this.setState({
          errorSelectUser: currentid === 0,
          errorTitleInput: !currentTitle,
        });

        return;
      }

      addTodo({
        userId: currentid,
        id: todos[todos.length - 1].id + 1,
        title: currentTitle,
      });

      this.setState({
        currentid: 0,
        currentTitle: '',
        userId: undefined,
        id: undefined,
        title: undefined,
      });
    };

    return (
      <section className="new-todo-section">
        <form
          className="new-todo-form"
          name="add-new-user"
          method="post"
          action="#"
        >

          <select
            onClick={() => {
              this.setState({ errorSelectUser: false });
            }}
            value={this.state.currentid}
            onChange={this.handleSelectChange}
            className="users-select"
          >
            <option value="0">Choose a user</option>
            {
              users.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))
            }
          </select>

          {this.state.errorSelectUser
          && <div className="error">Ошибка, выберите пользователя!</div>}

          <input
            onClick={() => {
              this.setState({ errorTitleInput: false });
            }}

            value={currentTitle}
            onChange={this.handleInputChange}
            type="text"
            placeholder="todo title"
            className="input input-title"
          />

          {this.state.errorTitleInput
          && <div className="error">Ошибка, введите title</div>}

          <button
            onClick={addButtonClick}
            className="button_add"
            type="button"
          >
            Add
          </button>
        </form>
      </section>
    );
  }
}

NewTodo.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  addTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NewTodo;
