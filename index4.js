const fs = require('fs');
const express = require('express');
const app = express();
const dataFile = 'data.json';
let list = [];
let id = 1;

app.use(express.json());

const loadData = () => {
    if (fs.existsSync(dataFile)) {
        const data = fs.readFileSync(dataFile, 'utf8');
        if (data) {
            list = JSON.parse(data);
            if (list.length > 0) {
                id = list[list.length - 1].id + 1; 
            }
        }
    } 
};

const saveData = () => {
    fs.writeFileSync(dataFile, JSON.stringify(list, null, 2));
};


loadData();

app.get('/holaa', (req, res) => {
    res.json(list);
});

app.post('/holaa', (req, res) => {
    const nombre = req.query.nombre;
    const edad = req.query.edad;

    console.log(nombre, id, edad);
    list.push({
        id: id++,
        nombre: nombre,
        edad: edad
    });
    saveData(); 
    res.send({ message: 'Se almacenó el nombre' });
});

app.put('/holaa', (req, res) => {
    const id = parseInt(req.query.id);
    const nombre = req.query.nombre;
    const edad = req.query.edad;

    const item = list.find(l => l.id === id);
    if (item) {
        item.nombre = nombre;
        item.edad = edad;
        saveData(); 
        res.json({ message: 'Elemento actualizado', nombre, edad });
    } else {
        res.status(404).json({ message: 'Elemento no encontrado' });
    }
});

app.delete('/holaa', (req, res) => {
    const id = parseInt(req.query.id);

    const index = list.findIndex(l => l.id === id);
    if (index !== -1) {
        list.splice(index, 1);
        saveData(); 
        res.json({ message: 'Elemento eliminado' });
    } else {
        res.status(404).json({ message: 'Elemento no encontrado' });
    }
});

app.listen(3000, function () {
    console.log('Servidor corriendo en el puerto 3000');
});
