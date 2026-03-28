import React, { useEffect, useState } from "react";
import API from "../services/api";
import ProjectForm from "./ProjectForm";

function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/projects/${id}`);
      alert("Project deleted successfully!");
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project");
    }
  };

  const handleEditClick = (project) => {
    setEditingProject(project);
  };

  const handleUpdateProject = async (updatedData) => {
    try {
      await API.put(`/projects/${editingProject._id}`, updatedData);
      alert("Project updated successfully!");
      setEditingProject(null);
      fetchProjects();
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Failed to update project");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="container">
      <ProjectForm
        onProjectAdded={fetchProjects}
        editingProject={editingProject}
        onProjectUpdated={handleUpdateProject}
      />

      <div className="list-card">
        <h2>Projects List</h2>

        {projects.length === 0 ? (
          <p className="empty-text">No projects found.</p>
        ) : (
          <ul className="user-list">
            {projects.map((project) => (
              <li key={project._id} className="user-item">
                <div>
                  <strong>{project.title}</strong>
                  <p>{project.description}</p>
                  {project.technologies && <p><b>Tech:</b> {project.technologies}</p>}
                  {project.githubLink && <p><b>GitHub:</b> {project.githubLink}</p>}
                  {project.liveDemo && <p><b>Live Demo:</b> {project.liveDemo}</p>}
                </div>

                <div className="button-group">
                  <button
                    className="edit-btn"
                    onClick={() => handleEditClick(project)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(project._id)}
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

export default ProjectsList;