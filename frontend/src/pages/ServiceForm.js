import React, { useEffect, useState } from "react";
import API from "../services/api";

function ServiceForm({ onServiceAdded, editingService, onServiceUpdated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    if (editingService) {
      setFormData({
        title: editingService.title || "",
        description: editingService.description || "",
        price: editingService.price || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        price: "",
      });
    }
  }, [editingService]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingService) {
        await onServiceUpdated(formData);
      } else {
        await API.post("/services", formData);
        alert("Service added successfully!");
        setFormData({
          title: "",
          description: "",
          price: "",
        });
        if (onServiceAdded) {
          onServiceAdded();
        }
      }
    } catch (error) {
      console.error("Error saving service:", error);
      alert("Failed to save service");
    }
  };

  return (
    <div className="form-card">
      <h2>{editingService ? "Edit Service" : "Add Service"}</h2>

      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          name="title"
          placeholder="Enter service title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Enter service description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="4"
        />

        <input
          type="text"
          name="price"
          placeholder="Enter service price"
          value={formData.price}
          onChange={handleChange}
        />

        <button type="submit">
          {editingService ? "Update Service" : "Add Service"}
        </button>
      </form>
    </div>
  );
}

export default ServiceForm;