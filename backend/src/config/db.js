
const dbName = process.env.MONGO_DB;

//DB Config
//Mongo URL Connection
const MONGO_URL = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;


db = client.db(dbName);

