const Asistencia = require("../models/asistencia.model");

// Obtener todas las asistencias
exports.getAllAsistencia = async (req, res) => {
  try {
    const asistencias = await Asistencia.find();
    res.status(200).json(asistencias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una asistencia por ID
exports.getAsistenciaById = async (req, res) => {
  try {
    const asistencia = await Asistencia.findById(req.params.id);
    if (!asistencia) {
      return res.status(404).json({ message: "Asistencia no encontrada" });
    }
    res.status(200).json(asistencia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva asistencia
exports.createAsistencia = async (req, res) => {
  try {
    const nuevaAsistencia = new Asistencia(req.body);
    const asistenciaGuardada = await nuevaAsistencia.save();
    res.status(201).json(asistenciaGuardada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una asistencia por ID
exports.updateAsistencia = async (req, res) => {
  try {
    const asistenciaActualizada = await Asistencia.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!asistenciaActualizada) {
      return res.status(404).json({ message: "Asistencia no encontrada" });
    }
    res.status(200).json(asistenciaActualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una asistencia por ID
exports.deleteAsistencia = async (req, res) => {
  try {
    const asistenciaEliminada = await Asistencia.findByIdAndDelete(
      req.params.id,
    );
    if (!asistenciaEliminada) {
      return res.status(404).json({ message: "Asistencia no encontrada" });
    }
    res.status(200).json({ message: "Asistencia eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
