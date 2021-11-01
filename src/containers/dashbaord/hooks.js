import React from "react";
import axios from "axios";

export const useDashboard = () => {
  const userId = new Date().getTime;

  const [users, setUsers] = React.useState([]);

  const [user, setUser] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    id: "",
  });

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/users`);
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addUser = async () => {
    try {
      await axios.post(`http://localhost:5000/users`, {
        ...user,
        id: userId,
      });
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser();
    setUser({ firstName: "", lastName: "", email: "", id: "" });
  };

  return { user, users, fetchUsers, handleChange, handleSubmit };
};
