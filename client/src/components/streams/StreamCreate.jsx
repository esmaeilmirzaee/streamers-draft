import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { connect } from 'react-redux';
import { createStream } from '../../actions';

class StreamCreate extends React.Component {
  renderError({ error, touched }) {
    if (error && touched) {
      return <div className='ui error message'>{error}</div>;
    }
  }

  renderInput({ input, placeholder, meta }) {
    return (
      <div className={meta.error && meta.touched ? 'field error' : 'field'}>
        <input {...input} autoComplete='off' placeholder={placeholder} />
        <>
          {meta.error && meta.touched ? (
            <div className='ui red'>{meta.error}</div>
          ) : (
            ''
          )}
        </>
      </div>
    );
  }

  onSubmit = (formValues) => {
    this.props.createStream(formValues);
  };

  render() {
    const className = true ? 'ui error form ' : 'ui form';
    return (
      <>
        <h1>StreamCreate</h1>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className={className}
        >
          <Field
            name='title'
            component={this.renderInput}
            placeholder='Enter a title'
          />
          <Field
            name='description'
            component={this.renderInput}
            placeholder='How the stream could be catagorised?'
          />
          <button className='ui blue button'>Submit</button>
        </form>
      </>
    );
  }
}

const validate = (formValues) => {
  let errors = {};
  if (!formValues.title) {
    errors.title = 'Please enter a valid title';
  }
  if (!formValues.description) {
    errors.description = 'Please enter the appropriate description';
  }

  return errors;
};

let formWrapped = reduxForm({
  form: 'streamCreate',
  validate,
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);
