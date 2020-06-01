import React, { useReducer } from 'react';
import styles from './form.module.css';

const init_state = {
  name: '',
  email: '',
  subject: '',
  body: '',
  status: 'SUCCESS',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateFieldValue':
      return { ...state, [action.field]: action.value }
    case 'updateStatus':
      return { ...state, status: action.status }
    default:
      return init_state;
  }
}

const Form = () => {
  const [state, dispatch] = useReducer(reducer, init_state);
  const handleSubmit = e => {
    e.preventDefault();
    console.log('state', state);
  }
  const handleUpdateValue = field => e => {
    dispatch({
      type: 'updateFieldValue',
      field,
      value: e.target.value,
    });
  }
  if (state.status === 'SUCCESS') {
    return <p className={styles.success}>Message sent!</p>
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        Name
        <input
          className={styles.input}
          type="text"
          name="name"
          value={state.name}
          onChange={handleUpdateValue('name')}
        />
      </label>
      <label className={styles.label}>
        Email
        <input
          className={styles.input}
          type="email"
          name="email"
          value={state.email}
          onChange={handleUpdateValue('email')}
        />
      </label>
      <label className={styles.label}>
        Subject
        <input
          className={styles.input}
          type="text"
          name="subject"
          value={state.subject}
          onChange={handleUpdateValue('subject')}
        />
      </label>
      <label className={styles.label}>
        Body
        <textarea
          className={styles.input}
          name="body"
          value={state.body}
          onChange={handleUpdateValue('body')}
        />
      </label>
      <button className={styles.button}>Send</button>
    </form>
  );
}

export default Form;