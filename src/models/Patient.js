const { DataTypes } = require("sequelize");
const conexao = require("../config/database");

const Patient = conexao.define("patients", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Patient;