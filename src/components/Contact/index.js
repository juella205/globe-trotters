import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import './Contact.css';

function Contact() {
  const [state, handleSubmit] = useForm("xqkojopd");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (event.target.checkValidity()) {
      handleSubmit();
    } else {
      setIsFormSubmitted(true);
    }
  };

  const handleEmailChange = (event) => {
    if (event.target.validity.valid) {
      setIsFormSubmitted(false);
    }
  };

  if (state.succeeded) {
    return <p>We'll talk soon!!</p>;
  }

  return (
    <section>
      <h1>Contact Me</h1>
      <form onSubmit={handleFormSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Name..."
            required
          />
          <ValidationError
            prefix="Name"
            field="name"
            errors={state.errors}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email..."
            required
            onChange={handleEmailChange}
          />
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
          />
          {isFormSubmitted && !state.errors.email && (
            <p className="error-message">Please enter a valid email address.</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Message..."
            required
          ></textarea>
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />
        </div>
        {isFormSubmitted && (
          <p className="error-message">Please fill in all required fields.</p>
        )}
        <button type="submit" disabled={state.submitting}>
          Submit
        </button>
      </form>
    </section>
  );
}

export default Contact;
