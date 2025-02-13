import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!; //! shows that i am 100% sure that i have url  

if(!MONGODB_URI){
    throw new Error ("Please define mongodb uri in env file ")
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn: null, promise: null}
}

export async function connectToDatabase(){

    if(cached.conn){
        return cached.conn;
    }

    if(!cached.promise){
        const opts ={
            bufferCommands : true,
            maxPoolSize : 10 // how many connection maximum can database do
        }
    cached.promise = mongoose.connect(MONGODB_URI,opts)
    .then(()=> mongoose.connection)

    }
    //if promise is already have 
    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null
        throw new Error("check databse file")
    }

    return cached.conn
}
    
