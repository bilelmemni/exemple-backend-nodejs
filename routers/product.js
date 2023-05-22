const express=require('express')
const Product=require('../models/product')

const router=express.Router()

const multer=require('multer')
filename='';
const mystorage=multer.diskStorage({
    destination:'./uploads',
    filename:(req,file,redirect)=>{
           let date=Date.now()
           let fl=date+'.'+file.mimetype.split('/')[1];//image.png
           redirect(null,fl);
           filename=fl;
    }
})
const upload=multer({storage:mystorage})//midel where 7aja te5dem bin create w arro function


//CRUD Product
router.post('/createprod',upload.any('image'),async(req,res)=>{
    try {
        data=req.body;
        prod= new Product(data);
        prod.image=filename;
        saveprod= await prod.save()
        filename=''
        res.status(200).send(saveprod)
       
    } catch (error) {
        res.status(400).send(error)
    }
    });
    router.get('/getallprod',async(req,res)=>{
        try {
          products=await Product.find()  
          res.status(200).send(products)
        } catch (error) {
            res.status(400).send(error)
        }
    });
    router.get('/getByIdprod/:id', async(req,res)=>{
       try {
        myid=req.params.id
        prod=await Product.findOne({_id:myid})
        res.status(200).send(prod)
       } catch (error) {
        res.status(400).send(error)
       } 
    });
    router.delete('/deleteprod/:id',async(req,res)=>{
    try {
        myid=req.params.id;
        deleteprod=await Product.findOneAndDelete({_id:myid});
        res.status(200).send(deleteprod)
    } catch (error) {
        res.status(400).send(error)
    }
    });
    router.put('/updateprod/:id',async(req,res)=>{
    try {
        myid=req.params.id;
        newdata=req.body;
        updateprod=await Product.findOneAndUpdate({_id:myid},newdata)
        res.status(200).send(updateprod)
    } catch (error) {
        res.status(400).send(error)
    }
    })
    





module.exports=router