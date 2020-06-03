import React, { useReducer } from 'react';
import styles from './form.module.css';

const init_state = {
  name: '',
  email: '',
  subject: '',
  body: '',
  status: 'IDLE',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateFieldValue':
      return { ...state, [action.field]: action.value }
    case 'updateStatus':
      return { ...state, status: action.status }
    case 'reset':
      return init_state;
    default:
      return init_state;
  }
}

const Form = () => {
  const [state, dispatch] = useReducer(reducer, init_state);
  const handleSubmit = e => {
    e.preventDefault();
    setStatus('PENDING');

    fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(state),
    })
      .then(res => res.json())
      .then(data => {
        console.log('data', data);
        setStatus('SUCCESS');
      })
      .catch(err => {
        console.error(err);
        setStatus('ERROR');
      })

  }
  const setStatus = status => {
    dispatch({
      type: 'updateStatus',
      status,
    })
  }
  const handleUpdateValue = field => e => {
    dispatch({
      type: 'updateFieldValue',
      field,
      value: e.target.value,
    });
  }
  if (state.status === 'SUCCESS') {
    return (
      <>
        <p className={styles.success}>Message sent!</p>
        <button
          onClick={() => dispatch({ type: 'reset' })}
          type="reset"
          className={`${styles.button} ${styles.centered}`}
        >
          reset
        </button>
      </>
    )
  }
  return (
    <>
      {state.status === 'ERROR' && (
        <p className={styles.error}>something went wrong</p>
      )}
      <form className={`${styles.form} ${state.status === 'PENDING' && styles.pending}`} onSubmit={handleSubmit}>
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
    </>
  );
}

export default Form;