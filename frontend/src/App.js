import React, { useState } from "react";
import "./App.css";
import UsersList from "./pages/UsersList";
import ProjectsList from "./pages/ProjectsList";
import ServicesList from "./pages/ServicesList";
import ReferencesList from "./pages/ReferencesList";

function App() {
  const [activeTab, setActiveTab] = useState("users");

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <UsersList />;
      case "projects":
        return <ProjectsList />;
      case "services":
        return <ServicesList />;
      case "references":
        return <ReferencesList />;
      default:
        return <UsersList />;
    }
  };

  return (
    <div className="app">
      <h1 className="main-title">Portfolio Frontend Dashboard</h1>

      <div className="tabs">
        <button
          className={activeTab === "users" ? "tab-btn active-tab" : "tab-btn"}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>

        <button
          className={activeTab === "projects" ? "tab-btn active-tab" : "tab-btn"}
          onClick={() => setActiveTab("projects")}
        >
          Projects
        </button>

        <button
          className={activeTab === "services" ? "tab-btn active-tab" : "tab-btn"}
          onClick={() => setActiveTab("services")}
        >
          Services
        </button>

        <button
          className={activeTab === "references" ? "tab-btn active-tab" : "tab-btn"}
          onClick={() => setActiveTab("references")}
        >
          References
        </button>
      </div>

      {renderContent()}
    </div>
  );
}

export default App;