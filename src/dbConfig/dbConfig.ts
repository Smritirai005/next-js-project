import mongoose from 'mongoose';

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection=mongoose.connection;

        connection.on('connected',()=>{
            console.log("Nongodb successfully connected");

        })
        connection.on('error',(err)=>{
            console.log("Nongodb successfully not connected" + err);
            process.exit();

        })
        
    } catch (error) {
        
    }
}