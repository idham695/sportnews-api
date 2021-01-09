import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    nama: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
});


const User = model("user", UserSchema);

export default User;