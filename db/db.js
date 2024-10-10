import mongoose from "mongoose";


const connectionDB = async() => {
    try {
          const connectdb = await mongoose.connect(process.env.MONGODB_URI)
          console.log(`Mongodb connected to data base successfully ${connectdb.connection.host}`);
    } catch (error) {
        console.log('Mongodb connection failed');
    }
}




export default connectionDB