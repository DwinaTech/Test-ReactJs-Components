import React from "react";

export const useDashboard = () => {
  const date = new Date();
  const userId = date.toLocaleDateString();

  const [users, setUsers] = React.useState([]);

  const [user, setUser] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ firstName: "", lastName: "", email: "", id: "" });
    setUsers([...users, { ...user, id: userId }]);
  };

  return { user, users, handleChange, handleSubmit };
};
