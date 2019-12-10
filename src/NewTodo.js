import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    currentid: 0,
    currentTitle: '',
  }

  handleChangeinSelect = (event) => {
    event.persist();

    this.setState(prevState => ({
      ...prevState,
      userId: +event.target.value,
      currentid: +event.target.value,
    }));
  }

  handleChangeinInput = (event) => {
    event.persist();
    this.setState(prevState => ({
      ...prevState,
      currentTitle: event.target.value,

    }));
  }

  render() {
    const { addTodo, users, todos } = this.props;

    const { currentid, currentTitle } = this.state;

    const checkError = (toCheck,
      alertAfterSelector,
      errorClassName,
      errorMeasge) => {
      if (toCheck) {
        const usersSelect = document.querySelector(alertAfterSelector);
        const emptyfieldError = document.createElement('div');

        emptyfieldError.className = `error ${errorClassName}`;
        emptyfieldError.innerHTML = `${errorMeasge}`;
        usersSelect.after(emptyfieldError);
        const objError = {};

        objError[errorClassName] = true;
        this.setState(objError);
      }
    };

    const checkErrors = () => {
      checkError(
        currentid === 0,
        '.users-select',
        'errorSelectUser',
        'Ошибка, выберите пользователя!'
      );
      checkError(
        currentTitle === '',
        '.input-title',
        'errorTitleInput',
        'Ошибка, заполните поле title!'
      );
    };

    const addButtonClick = () => {
      checkErrors();

      if (
        this.state.errorSelectUser
        || this.state.errorTitleInput
        || currentid === 0
      ) {
        return;
      }

      addTodo(
        {
          userId: currentid,
          id: todos[todos.length - 1].id + 1,
          title: currentTitle,
        }
      )();

      this.setState(
        {
          currentid: 0,
          currentTitle: '',
          userId: undefined,
          id: undefined,
          title: undefined,
        }
      );
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
              if (this.state.errorSelectUser) {
                document.querySelectorAll('.errorSelectUser').forEach(
                  (elem) => {
                    elem.remove();
                  }
                );
              }

              this.setState({ errorSelectUser: false });
            }}

            value={this.state.currentid}
            onChange={this.handleChangeinSelect}
            className="users-select"
          >
            <option value="0">Choose a user</option>
            {
              users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))
            }
          </select>

          <input
            onClick={() => {
              if (this.state.errorTitleInput) {
                document.querySelectorAll('.errorTitleInput').forEach(
                  (elem) => {
                    elem.remove();
                  }
                );
              }

              this.setState({ errorTitleInput: false });
            }}

            value={currentTitle}
            onChange={this.handleChangeinInput}
            type="text"
            placeholder="todo title"
            className="input input-title"
          />

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
