require("dotenv").config();

const app = require("./app");
const database = require("./config/database");

const startServer = async () => {
  await database.sync();

  app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000");
  });
};

startServer().catch((error) => {
  console.error("Não foi possível iniciar o servidor", error);
  process.exit(1);
});
