import mongoose from "mongoose";


const categories = ["IT", "Servicios Financieros", "Manufactura", "Salud", "Comercio", "Educación", "Alimentos", "Construcción", "Comunicación y entretenimiento", "Energía", "Transporte", "Turismo", "Agricultura"];


const BusinessSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "The name is required"]
    },
    impactLevel: {
        type: String,
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
        enum: categories
    },
    condition: {
        type: Boolean,
        default: true
    },
});

BusinessSchema.methods.toJSON = function (){
    const { __v, _id, ...business} = this.toObject();
    business.uid = _id;
    return business;
};

export default mongoose.model('Business', BusinessSchema);