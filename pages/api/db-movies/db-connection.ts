import getConfig from "next/config";
import mongoClient from "mongodb";

const { serverRuntimeConfig } = getConfig();

const pw = serverRuntimeConfig.MONGODB_PW;
const dbName = "nomurica";
const connString = `mongodb+srv://nate:${pw}@cluster0.es9vt.mongodb.net/${dbName}?retryWrites=true&w=majority`;

let cachedDb: any = null;

const connectToDatabase = async () => {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await mongoClient.MongoClient.connect(connString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = await client.db(dbName);

  cachedDb = db;
  return db;
};

export const moviesCollection = async () => {
  const db: any = await connectToDatabase();

  return db.collection("movies");
};
