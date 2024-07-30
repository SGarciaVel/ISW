import React, { useEffect, useState } from "react";
import axios from "../services/root.service";
import RejectionModal from "../components/RejectionModal";
import "../styles/InscripcionTable.css";
import "../styles/RejectionModal.css";

const ITEMS_PER_PAGE = 5;

const InscripcionTable = () => {
  const [inscripciones, setInscripciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchInscripciones = async () => {
      try {
        const response = await axios.get('/inscripciones');
        if (response.data && response.data.data && Array.isArray(response.data.data.inscripciones)) {
          setInscripciones(response.data.data.inscripciones);
        } else {
          console.error('La respuesta no contiene un array de inscripciones');
        }
      } catch (error) {
        console.error('Error fetching inscripciones:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInscripciones();
  }, []);

  const handleAccept = async (id) => {
    try {
      await axios.put(`/inscripciones/${id}`, { estado: 'aprobada', comentario: 'Tu postulación ha sido aprobada.' });
      setInscripciones(prevInscripciones =>
        prevInscripciones.map(inscripcion =>
          inscripcion._id === id ? { ...inscripcion, estado: 'aprobada', comentario: 'Tu postulación ha sido aprobada.' } : inscripcion
        )
      );
    } catch (error) {
      console.error('Error accepting inscripcion:', error);
    }
  };

  const handleReject = (id) => {
    setSelectedId(id);
    setModalVisible(true);
  };

  const handleRejectConfirm = async (id, comentario) => {
    try {
      await axios.put(`/inscripciones/${id}`, { estado: 'rechazada', comentario });
      setInscripciones(prevInscripciones =>
        prevInscripciones.map(inscripcion =>
          inscripcion._id === id ? { ...inscripcion, estado: 'rechazada', comentario } : inscripcion
        )
      );
    } catch (error) {
      console.error('Error rejecting inscripcion:', error);
    } finally {
      setModalVisible(false);
      setSelectedId(null);
    }
  };

  const handlePageChange = (direction) => {
    setCurrentPage(prevPage => {
      if (direction === 'next') {
        return prevPage + 1;
      } else if (direction === 'prev') {
        return Math.max(prevPage - 1, 1);
      }
    });
  };

  const totalPages = Math.ceil(inscripciones.length / ITEMS_PER_PAGE);
  const currentInscripciones = inscripciones.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (loading) {
    return <p>Cargando inscripciones...</p>;
  }

  return (
    <div className="table-container">
      {inscripciones.length > 0 ? (
        <>
          <table className="inscripcion-table">
            <thead>
              <tr>
                <th>Nombre Puesto</th>
                <th>Estado</th>
                <th>Comentario</th>
                <th>Fecha Inscripción</th>
                <th>Emprendedor</th>
                <th>Carrera</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentInscripciones.map(inscripcion => (
                <tr key={inscripcion._id}>
                  <td>{inscripcion.nombre_puesto}</td>
                  <td>{inscripcion.estado}</td>
                  <td>{inscripcion.comentario}</td>
                  <td>{new Date(inscripcion.fechaInscripcion).toLocaleDateString()}</td>
                  <td>{inscripcion.emprendedorId ? inscripcion.emprendedorId.nombre_completo : 'N/A'}</td>
                  <td>{inscripcion.carreraId ? inscripcion.carreraId.nombre : 'N/A'}</td>
                  <td>
                    {inscripcion.estado !== 'aprobada' && (
                      <button className="btn accept-btn" onClick={() => handleAccept(inscripcion._id)}>Aceptar</button>
                    )}
                    <button className="btn reject-btn" onClick={() => handleReject(inscripcion._id)}>Rechazar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-controls">
            <button
              className="pagination-btn"
              onClick={() => handlePageChange('prev')}
              disabled={currentPage === 1}
            >
              &#60; Anterior
            </button>
            <span className="pagination-info">Página {currentPage} de {totalPages}</span>
            <button
              className="pagination-btn"
              onClick={() => handlePageChange('next')}
              disabled={currentPage === totalPages}
            >
              Siguiente &#62;
            </button>
          </div>
        </>
      ) : (
        <p>No hay inscripciones</p>
      )}
      {modalVisible && (
        <RejectionModal
          onClose={() => setModalVisible(false)}
          onConfirm={handleRejectConfirm}
          id={selectedId}
        />
      )}
    </div>
  );
};

export default InscripcionTable;
