import mongoose, { type Mongoose } from "mongoose";

const MONGODB_URI: string =
  process.env.MONGODB_URI ?? (() => { throw new Error("No MongoDB URI!"); })();

type Cached = { conn: Mongoose | null; promise: Promise<Mongoose> | null };

type GlobalWithMongoose = typeof globalThis & { _mongoose?: Cached };
const g = globalThis as GlobalWithMongoose;

if (!g._mongoose) g._mongoose = { conn: null, promise: null };
const cached = g._mongoose;

export async function connectDB(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
