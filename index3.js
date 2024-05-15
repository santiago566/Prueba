const express = require('express')
const http=require('https');
const app = express();
const list =[];

app.use(express.json());

app.get('/hola',(req,res)=>{

res.json(list);

});




app.post('/hola',(req,res)=>{

    const nombre=req.query;
    console.log(nombre);
    list.push(nombre);
    res.send({mesage:'se alamaceno el name'});


});

app.listen(3000,function(){
    console.log('esta corriendo coñoooo')
});


