const express=require('express');
require('./config/connect')

const productrouter=require('./routers/product')
const userrouter=require('./routers/users')

const app=express();

app.use(express.json());//ta9ra donne mel post men nawa3 json
app.use('/product' ,productrouter)
app.use('/users',userrouter)
app.use('/getimage', express.static('./uploads'))
app.listen(3000,()=>{
    console.log('hello')
});