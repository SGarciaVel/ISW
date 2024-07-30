import React, { useState } from "react";
import "../styles/RejectionModal.css";

const RejectionModal = ({ onClose, onConfirm, id }) => {
  const [comentario, setComentario] = useState("");

  const handleConfirm = () => {
    onConfirm(id, comentario);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Rechazar Inscripción</h2>
        <textarea
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          placeholder="Ingrese el comentario de rechazo"
        />
        <div className="modal-actions">
          <button onClick={handleConfirm}>Confirmar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default RejectionModal;
