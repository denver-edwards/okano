import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let clientPromise;

function createMongoClient() {
  const client = new MongoClient(uri, options);
  return client.connect();
}

if (!global._mongoClientPromise) {
  global._mongoClientPromise = createMongoClient();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
