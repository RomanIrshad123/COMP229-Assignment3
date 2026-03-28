import React, { useEffect, useState } from "react";
import API from "../services/api";

function UserForm({ onUserAdded, editingUser, onUserUpdated }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (editingUser) {
      setFormData({
        name: editingUser.name || "",
        email: editingUser.email || "",
        password: "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingUser) {
        await onUserUpdated(formData);
      } else {
        await API.post("/users", formData);
        alert("User added successfully!");

        setFormData({
          name: "",
          email: "",
          password: "",
        });

        if (onUserAdded) {
          onUserAdded();
        }
      }
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Failed to save user");
    }
  };

  return (
    <div className="form-card">
      <h2>{editingUser ? "Edit User" : "Add User"}</h2>

      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          name="name"
          placeholder="Enter full name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter email address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required={!editingUser}
        />

        <button type="submit">
          {editingUser ? "Update User" : "Add User"}
        </button>
      </form>
    </div>
  );
}

export default UserForm;