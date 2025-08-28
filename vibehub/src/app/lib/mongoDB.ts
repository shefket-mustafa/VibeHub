import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if(!MONGODB_URI) {
    throw new Error('No MongoDB URI!')
}

let cachedMongoConnection = (global as any).mongoose;


if(!cachedMongoConnection) {
    cachedMongoConnection = (global as any).mongoose = {conn: null, promise: null}
}

export async function connectDB() {

    if(cachedMongoConnection.conn) return cachedMongoConnection.conn

    if(!cachedMongoConnection.promise) {
        cachedMongoConnection.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose)
    }

    cachedMongoConnection.conn = await cachedMongoConnection.promise;
  return cachedMongoConnection.conn;
    
}
