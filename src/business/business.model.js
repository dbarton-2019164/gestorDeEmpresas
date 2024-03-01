import mongoose from "mongoose";

const BusinessSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "The name is required"]
    },
    impactLevel: {
        type: "String",
        enum: ["Alto", "Medio", "Bajo"],
        required: true
    },
    yearsOfExperience: {
        type: Number,
        required: [true, "Years of experience are required"],
        min: 0
    },
    category: {
        type: String,
        required: [true, "The category is required"],
        enum: ["IT", "Servicios Financieros", "Manufactura", "Salud", "Comercio", "Educación", "Alimentos", "Construcción", "Comunicación y entretenimiento", "Energía", "Transporte", "Turismo", "Agricultura"]
    },
    condition: {
        type: Boolean,
        default: true
    },
});

AdminSchema.methods.toJSON = function (){
    const { __v, password, _id, ...admin} = this.toObject();
    admin.uid = _id;
    return admin;
};

export default mongoose.model('Business', BusinessSchema);