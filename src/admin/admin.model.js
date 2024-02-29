import mongoose from "mongoose";

const AdminSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "The name is required"]
    },
    email: {
        type: String,
        required: [true, "The email is required"]
    },
    password: {
        type: String,
        required: [true, "The password is required"]
    },
    status: {
        type: Boolean,
        default: true
    },
});

AdminSchema.methods.toJSON = function (){
    const { __v, password, _id, ...admin} = this.toObject();
    admin.uid = _id;
    return admin;
};

export default mongoose.model('Admin', AdminSchema);