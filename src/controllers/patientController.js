const Patient = require("../models/Patient");

module.exports = {
  async create(req, res) {
    try {
      const patient = await Patient.create(req.body);
      return res.json(patient);
    } catch (error) {
      return res.status(400).json({ error: "Não foi possível criar o paciente" });
    }
  },

  async list(req, res) {
    try {
      const patients = await Patient.findAll();
      return res.json(patients);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar pacientes" });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await Patient.update(req.body, {
        where: { id: req.params.id }
      });

      if (!updated) {
        return res.status(404).json({ error: "Paciente não encontrado" });
      }

      return res.json({ message: "Paciente atualizado com sucesso" });
    } catch (error) {
      return res.status(400).json({ error: "Falha ao atualizar paciente" });
    }
  },

  async remove(req, res) {
    try {
      const deleted = await Patient.destroy({
        where: { id: req.params.id }
      });

      if (!deleted) {
        return res.status(404).json({ error: "Paciente não encontrado" });
      }

      return res.json({ message: "Paciente removido" });
    } catch (error) {
      return res.status(500).json({ error: "Não foi possível remover o paciente" });
    }
  }
};