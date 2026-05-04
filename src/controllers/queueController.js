const { Op } = require("sequelize");
const Queue = require("../models/Queue");
const Patient = require("../models/Patient");

module.exports = {
  async enqueue(req, res) {
    const { patientId, prioridade } = req.body;

    try {
      const queueItem = await Queue.create({
        patientId,
        prioridade
      });

      return res.json(queueItem);
    } catch (error) {
      return res.status(400).json({ error: "Falha ao entrar na fila" });
    }
  },

  async list(req, res) {
    try {
      const queue = await Queue.findAll({
        where: { status: "aguardando" },
        include: Patient,
        order: [
          ["prioridade", "ASC"],
          ["createdAt", "ASC"]
        ]
      });

      return res.json(queue);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao listar a fila" });
    }
  },

  async next(req, res) {
    try {
      const nextItem = await Queue.findOne({
        where: { status: "aguardando" },
        order: [
          ["prioridade", "ASC"],
          ["createdAt", "ASC"]
        ]
      });

      if (!nextItem) {
        return res.status(400).json({ error: "Fila vazia" });
      }

      nextItem.status = "em atendimento";
      await nextItem.save();

      return res.json(nextItem);
    } catch (error) {
      return res.status(500).json({ error: "Não foi possível chamar o próximo" });
    }
  },

  async history(req, res) {
    const dateParam = req.params.date;
    const requestedDate = new Date(dateParam);

    if (Number.isNaN(requestedDate.getTime())) {
      return res.status(400).json({ error: "Data inválida" });
    }

    const nextDay = new Date(requestedDate);
    nextDay.setDate(requestedDate.getDate() + 1);

    try {
      const history = await Queue.findAll({
        where: {
          status: "em atendimento",
          createdAt: {
            [Op.gte]: requestedDate,
            [Op.lt]: nextDay
          }
        },
        include: Patient
      });

      return res.json(history);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar histórico" });
    }
  }
};