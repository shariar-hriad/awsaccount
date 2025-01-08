import mongoose from 'mongoose'

declare global {
    // eslint-disable-next-line no-var
    var mongoose: {
        conn: mongoose.Mongoose | null
        promise: Promise<mongoose.Mongoose> | null
    }
}

const MONGODB_URI = process.env.MONGODB_URL!

if (!MONGODB_URI) {
    throw new Error('DB_CONNECTION_URI Missing')
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export async function connectDB() {
    if (cached.conn) {
        return cached.conn
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        }
        cached.promise = mongoose
            .connect(MONGODB_URI, opts)
            .then((mongoose) => {
                return mongoose
            })
    }
    try {
        cached.conn = await cached.promise
    } catch (e) {
        cached.promise = null
        throw e
    }

    return cached.conn
}
