import React from "react";

export const UserCard = ({ user, handleDelete }) => {
  return (
    <tr>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>
        <button onClick={() => handleDelete(user.id)}>X</button>
      </td>
    </tr>
  );
};
