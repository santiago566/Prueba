const express = require('express');
const app = express();
const list = [];
let id = 1;

app.use(express.json()); 

app.get('/hola', (req, res) => {
    res.json(list);
});

app.post('/hola', (req, res) => {
    const nombre = req.query.nombre;
    const edad = req.query.edad;

    console.log(nombre, id, edad);
    list.push({
        id: id++,
        nombre: nombre,
        edad: edad 
    });
    res.send({ message: 'Se almacenó el nombre' });
});

app.put('/hola', (req, res) => {
    const id = parseInt(req.query.id); 
    const nombre = req.query.nombre;
    const edad = req.query.edad;

    const item = list.find(l => l.id === id);
    if (item) {
        item.nombre = nombre;
        item.edad = edad;
        res.json({ message: 'Elemento actualizado', nombre, edad });
    } 
});

app.listen(3000, function () {
    console.log('Servidor corriendo en el puerto 3000');
});
