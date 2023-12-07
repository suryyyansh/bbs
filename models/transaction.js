import { Int32 } from "mongodb";
import { Schema, model, models } from "mongoose";

const TransactionSchema = new Schema({

    //transacitonschema
    paymentIntent: {
        type: String,
        unique: [true, "[MONGODB] duplicate paymentIntent detected"],
        required: true
    },
    user:{
        type: String,
        required: true,  
    },
    amount:{
        type: Number,
        required: true,
        integer:true  
    }
});

//make sure the model doesn't already exist, then create it
const Transaction = models.Transaction || model("Transaction", TransactionSchema);

export default Transaction;