import React, { useEffect, useState } from "react";
import API from "../services/api";
import ServiceForm from "./ServiceForm";

function ServicesList() {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);

  const fetchServices = async () => {
    try {
      const res = await API.get("/services");
      setServices(res.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/services/${id}`);
      alert("Service deleted successfully!");
      fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
      alert("Failed to delete service");
    }
  };

  const handleEditClick = (service) => {
    setEditingService(service);
  };

  const handleUpdateService = async (updatedData) => {
    try {
      await API.put(`/services/${editingService._id}`, updatedData);
      alert("Service updated successfully!");
      setEditingService(null);
      fetchServices();
    } catch (error) {
      console.error("Error updating service:", error);
      alert("Failed to update service");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="container">
      <ServiceForm
        onServiceAdded={fetchServices}
        editingService={editingService}
        onServiceUpdated={handleUpdateService}
      />

      <div className="list-card">
        <h2>Services List</h2>

        {services.length === 0 ? (
          <p className="empty-text">No services found.</p>
        ) : (
          <ul className="user-list">
            {services.map((service) => (
              <li key={service._id} className="user-item">
                <div>
                  <strong>{service.title}</strong>
                  <p>{service.description}</p>
                  {service.price && <p><b>Price:</b> {service.price}</p>}
                </div>

                <div className="button-group">
                  <button
                    className="edit-btn"
                    onClick={() => handleEditClick(service)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(service._id)}
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

export default ServicesList;