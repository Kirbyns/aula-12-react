
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://rootkirby:root@cluster0.wwft30c.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const db = client.db('Pizzaria');

async function insereElemento(){
    const pizzas = db.collection("Pizzas");
    const pizza = { nome: "4 Queijos", qntPedacos: "8" }
    const result = pizzas.insertOne(pizza);
    console.log(`A pizza inserida foi a ${result.insertedId}`);
}

async function insereElementos(){
    const pizzas = db.collection("Pizzas");
    const documents = [
        { nome: "4 Queijos", qntPedacos: "8"},
        { nome: "Calabresa", qntPedacos: "8" },
        { nome: "Mussarela", qntPedacos: "8" },
        { nome: "Baiana", qntPedacos: "8" },
        { nome: "Frango com Catupiry", qntPedacos: "8" },


    ];
    //const result = pizzas.insertOne(pizza);
    const result = await pizzas.insertMany(documents);
    let ids = result.insertedIds;
    for(let id of Object.values(ids)){
        console.log(`A pizza inserida foi a ${id}`);
    }
}

async function selecionarValores(){
    const pizzas = await db.collection('Pizzas').find({ nome: "4 Queijos"});
    //const pizzas = await db.collection('pizzas').find();
    for await(let pizza of pizzas){
        console.log(pizza);
    }
}

async function editarValores(){
    //const pizza = await db.collection('pizzas').findOne({ nome : '4 Queijos'});
    const pizzas = db.collection("Pizzas");
    const filtro = { nome : "4 Queijos"};
    const update = { "$set": {qntPedacos : 12}};
    await pizzas.updateMany(filtro, update);
    selecionarValores();
}

async function deletarValor(){
    const pizzas = db.collection("Pizzas");
    const pizza = await pizzas.findOne({ nome: "4 Queijos" });
    pizzas.deleteMany(pizza);
    selecionarValores();
}

deletarValor();
//selecionarValores();
//editarValores();
//selecionarValores();
//insereElementos();
