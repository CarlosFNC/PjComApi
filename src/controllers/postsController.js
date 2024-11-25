import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js";
import fs from "fs";

export async function listarPosts(req, res){
    const posts = await getTodosPosts();
    // Quando uma requisição GET for feita para a rota "/posts", esta função será executada.
    // Chama a função `getTodosPosts` para obter todos os posts do banco de dados.
    res.status(200).json(posts);
    // Envia uma resposta com status 200 (sucesso) e o array de posts no formato JSON.
}

export async function postarNovosPost(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch(erro){
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
    
}

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt:""
    };

    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postCriado);
    } catch(erro){
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
    
}

export async function atualizarNovosPost(req, res) {
    const id = req.params.id;
    const urlImagem = `uploads/${id}.png`
    const post = {
        imgUrl: urlImagem,
        descricao: req.body.descricao,
        alt: req.body.alt
    }
    try {
        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    } catch(erro){
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
    
}
