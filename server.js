import express from "express";
import routes from "./src/config/routes/postsRoutes.js";
// Importa o framework Express.js, que é a base para criar aplicações web Node.js.

const app = express();
// Cria uma instância do Express, que será o nosso servidor web.
app.use(express.static("uploads"))
routes(app)

app.listen(3000, ()=> {
    console.log("Servidor escutando...");
});
// Inicia o servidor na porta 3000. Quando o servidor estiver pronto para receber requisições, a mensagem "Servidor escutando..." será exibida no console.



