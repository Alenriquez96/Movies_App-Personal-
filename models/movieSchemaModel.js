const mongoose = require('../utils/dbMongoUtil');

const objectSchema = {
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    casting: {
        type: String,
        required: true
    },
    plot: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
        /* validate: {
            validator: function(url){
                return url.indexOf('.jpg') != -1;
            }, 
            message: "Porfa, sólo imágenes JPG"
        } */
    }
};
// Crear el esquema
const movieSchema = mongoose.Schema(objectSchema);
// Crear el modelo --> Colección
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
