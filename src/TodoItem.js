import React from 'react';
import PropTypes from 'prop-types';

const Todoitem = (props) => {
  const { id, title, completed, user } = props.todo;

  return (
    <tr className="App-table-row">
      <td>{id}</td>
      <td>{title}</td>
      <td className={completed ? 'completed' : 'not-completed'}>
        {completed ? 'completed' : 'not completed'}
      </td>
      <td>{user.name}</td>
    </tr>
  );
};

Todoitem.propTypes = { todo: PropTypes.objectOf(PropTypes.any) };

Todoitem.defaultProps = {
  todo: {
    id: 'no id',
    title: 'no-title',
    completed: 'no completed',
    user: 'no user',
  },
};

export default Todoitem;
