import React, { useEffect, useState } from "react";
import API from "../services/api";

function ReferenceForm({ onReferenceAdded, editingReference, onReferenceUpdated }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (editingReference) {
      setFormData({
        name: editingReference.name || "",
        email: editingReference.email || "",
        message: editingReference.message || "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    }
  }, [editingReference]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingReference) {
        await onReferenceUpdated(formData);
      } else {
        await API.post("/contacts", formData);
        alert("Reference added successfully!");

        setFormData({
          name: "",
          email: "",
          message: "",
        });

        if (onReferenceAdded) {
          onReferenceAdded();
        }
      }
    } catch (error) {
      console.error("Error saving reference:", error);
      alert("Failed to save reference");
    }
  };

  return (
    <div className="form-card">
      <h2>{editingReference ? "Edit Reference" : "Add Reference"}</h2>

      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          name="name"
          placeholder="Enter reference name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter reference email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Enter reference message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="4"
        />

        <button type="submit">
          {editingReference ? "Update Reference" : "Add Reference"}
        </button>
      </form>
    </div>
  );
}

export default ReferenceForm;