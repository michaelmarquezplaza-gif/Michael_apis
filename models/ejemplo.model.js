import mongoose from 'mongoose';
const ejemploSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true 
    },
    apellido: {
        type: String,
        require: true 
    },
    edad: {
        type: Number,
        require: false 
    },
    contacto: {
        type: [String],
        require: false 
    },
});

const Ejemplo = mongoose.model('Ejemplo', ejemploSchema);

export default Ejemplo;