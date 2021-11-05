import React from "react";
import { Form } from "../../components/Form";
import { Users } from "../../components/Users";
import { useDashboard } from "./hooks";

export const Dashboard = () => {
  const { user, users, handleDelete, fetchUsers, handleChange, handleSubmit } =
    useDashboard();

  React.useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <div className="content">
        <Form
          user={user}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
        <Users users={users} handleDelete={handleDelete} />
      </div>
    </div>
  );
};
