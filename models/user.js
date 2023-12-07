import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists.'],
        required: [true, 'Email is required.'],
    },
    role: {
        type: String,
        default: "user"
    },
    funds: {
        type: Number,
        default: 0
    },
    allowed_ride: {
        type: Boolean,
        default: true
    },
    active_otp:{
        type: Number,
        default: 0,
        required: false,
    },
    amount_committed:{
        type: Number,
        default:0,
        required: false
    }
});

//make sure the model doesn't already exist, then create it
const User = models.User || model("User", UserSchema);

export default User;