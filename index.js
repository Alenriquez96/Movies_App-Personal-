// Módulos externos
const express = require('express');

// Rutas
const moviesRouter = require('./routes/moviesAPIRoute');
const userRouter = require('./routes/userAPIRoute');

// Middlewares
// const notFound = require('./middlewares/notFound');

const app = express();
const port = process.env.PORT || 5000;


app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Rutas
app.use("/", moviesRouter);
app.use("/", userRouter);


// Middleware de rutas inexistentes
// app.use(notFound);

// Necesario para pasar el test
const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = server;
