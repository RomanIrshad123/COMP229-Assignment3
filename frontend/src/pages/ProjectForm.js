import React, { useEffect, useState } from "react";
import API from "../services/api";

function ProjectForm({ onProjectAdded, editingProject, onProjectUpdated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    githubLink: "",
    liveDemo: "",
  });

  useEffect(() => {
    if (editingProject) {
      setFormData({
        title: editingProject.title || "",
        description: editingProject.description || "",
        technologies: editingProject.technologies || "",
        githubLink: editingProject.githubLink || "",
        liveDemo: editingProject.liveDemo || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        technologies: "",
        githubLink: "",
        liveDemo: "",
      });
    }
  }, [editingProject]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingProject) {
        await onProjectUpdated(formData);
      } else {
        await API.post("/projects", formData);
        alert("Project added successfully!");

        setFormData({
          title: "",
          description: "",
          technologies: "",
          githubLink: "",
          liveDemo: "",
        });

        if (onProjectAdded) {
          onProjectAdded();
        }
      }
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save project");
    }
  };

  return (
    <div className="form-card">
      <h2>{editingProject ? "Edit Project" : "Add Project"}</h2>

      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          name="title"
          placeholder="Enter project title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Enter project description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="4"
        />

        <input
          type="text"
          name="technologies"
          placeholder="Enter technologies used"
          value={formData.technologies}
          onChange={handleChange}
        />

        <input
          type="text"
          name="githubLink"
          placeholder="Enter GitHub link"
          value={formData.githubLink}
          onChange={handleChange}
        />

        <input
          type="text"
          name="liveDemo"
          placeholder="Enter live demo link"
          value={formData.liveDemo}
          onChange={handleChange}
        />

        <button type="submit">
          {editingProject ? "Update Project" : "Add Project"}
        </button>
      </form>
    </div>
  );
}

export default ProjectForm;