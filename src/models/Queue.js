const { DataTypes } = require("sequelize");
const conexao2 = require("../config/database");
const Patient2 = require("./Patient");

const Queue = conexao2.define("queue", {
  prioridade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "aguardando"
  }
});

Patient2.hasMany(Queue);
Queue.belongsTo(Patient2);

module.exports = Queue;
