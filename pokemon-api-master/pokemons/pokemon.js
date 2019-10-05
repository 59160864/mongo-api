const mongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

let pokemons = []
mockPokemon()

function Pokemon(name, type) {
    this.name = name
    this.type = type
    this.id = null
    this.type2 = null
}
async function getPokemon(id){
    var collection = await getCollection('pokemons')
    try{
        var result=collection.findOne({_id:ObjectID(id)})
        return result
    }
    catch(err){
        console.error(err)
        return err
    }
    finally
    {
        client.close()
    }

}
async function savePokemon(name, type) {
    let p = createPokemon(name, type)
    pokemons.push(p)

    const DB_URL ='mongodb+srv://superadmin:kingslex@cluster0-vaebr.gcp.mongodb.net/admin?retryWrites=true&w=majority+srv'
    const DB_NAME = 'example'
    const option = {useNewUrlParser: true , useUnifiedTopology: true}   
    var client= await mongoClient.connect(DB_URL,option).catch(err=>console.log(err))
    var collection,database
    database=client.db(DB_NAME)
    collection=database.collection('pokemons')
    try{
        var result=await collection.insert(p)
            return true
    }
    catch(err){
        console.log(err)
        return false
    }finally{
        client.close()
    }

}

function createPokemon(name, type) {
    let p = new Pokemon(name, type)
    p.id = generateNewId(pokemons.length)
    return p
}

function mockPokemon() {
    pokemons.push(createPokemon('Pikachu', 'Electric'))
    pokemons.push(createPokemon('Paras', 'Bug'))
}

function generateNewId(num) {
    return num + 1
}

function isPokemonExisted(id) {
    return pokemons[id-1] !== undefined && pokemons[id-1] !== null
}

function getPokemon(id) {
    return pokemons[id - 1]
}

function update(pokemon) {
    pokemons[pokemon.id - 1] = pokemon
    return true
}

module.exports.isPokemonExisted = isPokemonExisted
module.exports.savePokemon = savePokemon
module.exports.getPokemon = getPokemon
module.exports.update = update