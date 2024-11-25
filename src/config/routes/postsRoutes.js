import express from "express";
import multer from "multer";
import { listarPosts, postarNovosPost,uploadImagem, atualizarNovosPost } from "../../controllers/postsController.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./upload" , storage})

const routes = (app) =>{
    app.use(express.json());
    // Habilita o middleware `express.json()`, que permite que o servidor entenda dados no formato JSON enviados em requisições.
    
    // Rota para buscar todos os posts
    app.get("/posts", listarPosts);
    // Rota para criar um post(diferença esta entre get e post)
    app.post("/posts", postarNovosPost);
    app.post("/upload", upload.single("imagem"), uploadImagem);
    app.put("/upload/:id", atualizarNovosPost );
}
export default routes;
