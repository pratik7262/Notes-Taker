const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://avenger:VgOWUBqKACecNZNr@node.aucroun.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(url);

let DB;
let coll;

set_db_collection = (d, c) => {
    DB = d;
    coll = c;
}

/*set_db_collection('e-comm', 'products');*/

connectDB = async (dataBase, collection) => {
    let result = await client.connect();
    let db = result.db(dataBase);
    return db.collection(collection)
}

readData = async () => {
    let collection=await connectDB(DB,coll);
    let data=await collection.find({}).toArray();
    return data
}

/*readData().then((resp)=>{
    console.log(resp)
})*/

insertData=async (obj)=>{
    let collection=await connectDB(DB,coll);
    collection.insert(obj)
}

/*insertData({
    name:'lenovo S-76',
    Brand:'lenovo',
    Price:'variable',
    Cat:'Laptop',
    price:'variable'
})*/

updateData=async(queriData,newData)=>{
    let collection=await connectDB(DB,coll);
    collection.update(queriData,{$set:newData})
}

/*updateData({name:'lenovo S-76'},{Cat:'mobile'});*/


deleteData=async (obj)=>{
    let collection=await connectDB(DB,coll);
    collection.deleteMany(obj);
}

/*deleteData({name:'lenovo S-76'});*/

module.exports={
    setDatabaseColletion:set_db_collection,
    read:readData,
    insert:insertData,
    delete:deleteData,
    update:updateData
}