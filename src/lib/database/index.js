import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// initialize mongoose cached connection
let cached = global.mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  
  // if the connection is already cached, return it
  if (cached.conn) return cached.conn;

  // if the connection is not cached, create a new connection
  if(!MONGODB_URI) throw new Error('MONGODB_URI is missing');

  // create a new connection
  cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
    dbName: 'planCake',
    bufferCommands: false,
  })

  // cache the connection
  cached.conn = await cached.promise;

  return cached.conn;
}