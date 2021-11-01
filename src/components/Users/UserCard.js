import React from "react";

export const UserCard = ({ user }) => {
  return (
    <tr>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>
        <button>X</button>
      </td>
    </tr>
  );
};
