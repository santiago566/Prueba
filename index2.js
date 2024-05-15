//constante que llama ala framework

const express = require('express')
const app = express()

//servicio web de tipo get

app.get('/', function (req, res) {
  res.send('Hello World');
console.log("esta corriendo");

});

//segundo servicio web de tipo get 

app.get('/a', function(req,res){
    res.send('vocal')
});

//Denifir atravez de un parametro mi manera

app.get('/suma/:n1/:n2', (req, res) => {
    const num1 = parseInt(req.params.n1);
    const num2 = parseInt(req.params.n2);

    var tot = num2  + num1;
    res.send(tot.toString()); // Convertimos tot a string antes de enviarlo c
});


//Resta devuelve json EN clase

app.get('/Resta/:n1/:n2', (req, res) => {
    const num1 = parseInt(req.params.n1);
    const num2 = parseInt(req.params.n2);

    var Resta = num2  - num1;
    const texto={respuesta:Resta};
    res.json(texto);

});

// se captura de la url pero no esta definido como variable

app.get('/nombre', (req, res) => {
    // Obtener información establecida en la URL
    const datoObtener = req.query.name;

    res.send('Hola cabeza de ** ' + datoObtener + ' jajja');
});


//suma dos numeros sin definir parametros

// se captura de la urrl pero no esta definido como variable

//http://localhost:3000/sumar?n1=56465&n2=5646

app.get('/sumar', (req, res) => {
    // Obtener información establecida en la URL
    const num1 = parseFloat(req.query.n1);
    const num2 = parseFloat(req.query.n2);
    const resultado = num1 + num2;
    res.send(resultado.toString());
});

//se captura de la url pero no esta definido como variable devolver json con el query determino el valor que voy a determinar
app.get('/sumares', (req, res) => {
    // Obtener información establecida en la URL
    const num1 = parseFloat(req.query.n1);
    const num2 = parseFloat(req.query.n2);
     
    const resultado = num1 + num2;
    const texto={respuesta:resultado};
    res.json(texto);
    
});


//noveno ejercicio

app.get('/restar', (req, res) => {
    // Obtener información establecida en la URL
    const num1 = parseFloat(req.query.n1);
    const num2 = parseFloat(req.query.n2);
     
    var resul=0;

    if(num1>num2){
        resul = num1 - num2;
    }else{
        resul= num2-num1;
    }

    const resultado={total:resul};
    res.json(resultado);
    
});

// ejercicio de la tasa de moratlidad produccion y crias del conejo 

app.get('/conejos', (req, res) => {
    var pActual = 0, pMuere = 0, pTotal = 0, numCrias = 0, parejas = 0;
    //periodo
    const peri = parseInt(req.query.p);
    //número de parejas conejos
    const nParejas = parseInt(req.query.nPar);
    //número de crías
    const nCrias = parseInt(req.query.nCri);
    //tasa de Mortalidad
    const tMort = parseInt(req.query.tMor);

    const resultadosTotales = []; 

    for (let i = 0; i <= peri; i++) {
        if (i == 0) {
            parejas = nParejas;
            pActual = nParejas * 2;
            pMuere = pActual * tMort / 100;
            pTotal = pActual - pMuere;
        } else {
            numCrias = nParejas * nCrias;
            pActual += numCrias;
            pMuere = pActual * tMort / 100;
            pTotal = pActual - pMuere;
            parejas = pTotal / 2;
        }
        const resultados = [
            { nombre: 'Periodo', valor: i },
            { nombre: 'pAnual', valor: pActual },
            { nombre: 'pMorir', valor: pMuere },
            { nombre: 'pRestante', valor: pTotal },
            { nombre: 'nParejas', valor: parejas },
            { nombre: 'nCrias', valor: numCrias }
        ];
        resultadosTotales.push(resultados); 
    }

    res.json(resultadosTotales); 
});


// servicio que escuche desde el  puerto 3000




app.listen(3000);