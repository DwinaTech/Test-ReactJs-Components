import React from "react";

export const Form = ({ user, handleSubmit, handleChange }) => {
  const invalidUser = !user.firstName || !user.lastName || !user.email;

  return (
    <div>
      <h1>Registration form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
        />
        <button
          className={`${invalidUser ? "disabled" : ""}`}
          disabled={invalidUser}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
