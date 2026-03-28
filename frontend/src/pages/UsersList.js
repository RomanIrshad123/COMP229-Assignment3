import React, { useEffect, useState } from "react";
import API from "../services/api";
import UserForm from "./UserForm";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/users/${id}`);
      alert("User deleted successfully!");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async (updatedData) => {
    try {
      await API.put(`/users/${editingUser._id}`, updatedData);
      alert("User updated successfully!");
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <UserForm
        onUserAdded={fetchUsers}
        editingUser={editingUser}
        onUserUpdated={handleUpdateUser}
      />

      <div className="list-card">
        <h2>Users List</h2>

        {users.length === 0 ? (
          <p className="empty-text">No users found.</p>
        ) : (
          <ul className="user-list">
            {users.map((user) => (
              <li key={user._id} className="user-item">
                <div>
                  <strong>{user.name}</strong>
                  <p>{user.email}</p>
                </div>

                <div className="button-group">
                  <button
                    className="edit-btn"
                    onClick={() => handleEditClick(user)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UsersList;