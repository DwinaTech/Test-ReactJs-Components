import React from "react";
import { UserCard } from "./UserCard";

export const Users = ({ users }) => (
  <div className="users">
    <h1>Registered users</h1>
    <table width="100%">
      <thead>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </tbody>
    </table>
  </div>
);
