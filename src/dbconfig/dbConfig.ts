import mongoose from "mongoose";



export async function connect(){
if(mongoose.connection.readyState === 1){
    return;
}

    try {
      mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on('connected' ,  ()=>  {
        console.log('mongo DB connected successfully!');
    })
    connection.on('error',(err)=>{
        console.log('mongodb got some error , make sure mongodb is connected successfully'+err);
     
    })
    
    } catch (error) {
        console.log("something is happend , db error    ", error);
    }

}