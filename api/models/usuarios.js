import { Mongoose } from "mongoose";



const usuarioSchema = Mongoose.Schema({
    _id: Mongoose.Schema,Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: 
    },
    password:{
        type: String,
        required: true}
});

