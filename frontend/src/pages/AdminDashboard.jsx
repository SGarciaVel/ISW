import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link to="/inscriptions">Gestión de Inscripciones</Link>
          </li>
          {}
        </ul>
      </nav>
    </div>
  );
};

export default AdminDashboard;
