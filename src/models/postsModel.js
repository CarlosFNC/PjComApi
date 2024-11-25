import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
// Estabelece uma conexão com o banco de dados MongoDB usando a string de conexão fornecida pela variável de ambiente `process.env.STRING_CONEXAO`. A palavra-chave `await` garante que o código espere a conexão ser estabelecida antes de continuar.

export async function getTodosPosts(){
    const db = conexao.db("rtz-ltda");
    // Obtém uma referência ao banco de dados "rtz-ltda" a partir da conexão estabelecida.
    const colecao = db.collection("posts");
    // Obtém uma referência à coleção "posts" dentro do banco de dados.
    return colecao.find().toArray();
    // Executa uma consulta para encontrar todos os documentos na coleção "posts" e retorna os resultados como um array de objetos.
 }

 export async function criarPost(novoPost) {
    const db = conexao.db("rtz-ltda");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost)

    
 }

 export async function atualizarPost(id, novoPost) {
   const db = conexao.db("rtz-ltda");
   const colecao = db.collection("posts");
   const objID = ObjectId.createFromHexString(id);
   return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}