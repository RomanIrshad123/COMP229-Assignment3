import React, { useEffect, useState } from "react";
import API from "../services/api";
import ReferenceForm from "./ReferenceForm";

function ReferencesList() {
  const [references, setReferences] = useState([]);
  const [editingReference, setEditingReference] = useState(null);

  const fetchReferences = async () => {
    try {
      const res = await API.get("/contacts");
      setReferences(res.data);
    } catch (error) {
      console.error("Error fetching references:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/contacts/${id}`);
      alert("Reference deleted successfully!");
      fetchReferences();
    } catch (error) {
      console.error("Error deleting reference:", error);
      alert("Failed to delete reference");
    }
  };

  const handleEditClick = (reference) => {
    setEditingReference(reference);
  };

  const handleUpdateReference = async (updatedData) => {
    try {
      await API.put(`/contacts/${editingReference._id}`, updatedData);
      alert("Reference updated successfully!");
      setEditingReference(null);
      fetchReferences();
    } catch (error) {
      console.error("Error updating reference:", error);
      alert("Failed to update reference");
    }
  };

  useEffect(() => {
    fetchReferences();
  }, []);

  return (
    <div className="container">
      <ReferenceForm
        onReferenceAdded={fetchReferences}
        editingReference={editingReference}
        onReferenceUpdated={handleUpdateReference}
      />

      <div className="list-card">
        <h2>References List</h2>

        {references.length === 0 ? (
          <p className="empty-text">No references found.</p>
        ) : (
          <ul className="user-list">
            {references.map((reference) => (
              <li key={reference._id} className="user-item">
                <div>
                  <strong>{reference.name}</strong>
                  <p>{reference.email}</p>
                  <p>{reference.message}</p>
                </div>

                <div className="button-group">
                  <button
                    className="edit-btn"
                    onClick={() => handleEditClick(reference)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(reference._id)}
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

export default ReferencesList;