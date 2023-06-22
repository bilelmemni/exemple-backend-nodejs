const express=require('express');

const User=require('../models/user');

const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const router=express.Router()




router.post('/registre',async(req,res)=>{
    data=req.body;// read data
    usr=new User(data);//create insctance
    
    salt=bcrypt.genSaltSync(10);//crypto pssword
    cryotedPass= await bcrypt.hashSync(data.password ,salt)//crypto pssword
    usr.password=cryotedPass

     usr.save()//saved 
     .then(
        (saved)=>{
            res.send(saved)
        }
     )
     .catch(
        (err)=>{
            res.send(err)
        }
     )

});

router.post('/login1',async (req,res)=>{
    try {
       data=req.body;//1 read data
       user=await User.findOne({email:data.email})//2 test email
        if(user){
          valpassword=bcrypt.compareSync(data.password,user.password)//3 test password
          if (valpassword) {

          // create token
          payload={        
            _id:user._id,
            email:user.email
          }
          token=jwt.sign(payload,'12345')

          res.status(200).send({mytoken:token})//send respense



          }else{
            res.status(401).send('email or password invalid')
          }
        }else{
            res.status(404).send('email or password incorrect')
        }
        
    } catch (error) {
        res.status(400).send(error)
    }

})
router.post('/login' , (req, res)=>{
    
    let data = req.body;

    User.findOne({email: data.email})
        .then(
            (author)=>{
                let valid = bcrypt.compareSync(data.password , author.password);
                if(!valid){
                    res.send('email or password invalid');
                }else{

                    let payload = {
                        _id: author._id,
                        email: author.email,
                        fullname: author.name + ' ' + author.lastname
                    }

                    let token = jwt.sign(payload , '123456789');

                    res.send({ myToken: token })

                }

            }


        )
        .catch(
            err=>{
                res.send(err);
            }
        )



})



//CRUD User
//premiere methode
router.post('/add', (req,res)=>{
    data=req.body;// 9rina obejt eli filpost men 3la cmd
    usr=new User(data)// nasna3 instance mte3i
    usr.save()// sajelna l5edma mte3na fi mongodb
    .then((savedUser)=>{
           res.status(200).send(savedUser)
    }
    )
    .catch((err)=>{
     res.status(400).send(err)
    })
});
// 2éme methode
router.post('/create',async(req,res)=>{
try {
    data=req.body
    usr=new User(data)
    savedUser= await usr.save()
    res.send(savedUser)
} catch (error) {
    console.log(error);
}
})
// 1 ere methode
router.get('/getall',(req,res)=>{
    User.find( {age:19})
    .then(
        (users)=>{
          res.send(users)
        }
    )
    .catch(
        (err)=>{
        console.log(err);
        }
    )
});
 //2 eme methode
 router.get('/all',async(req,res)=>{
    try {
       users= await User.find()
       res.send(users)
    } catch (error) {
        res.send(error)
    }
     });

// 1 ere lethode
router.get('/getById/:id',(req,res)=>{
  myid=req.params.id
  User.findOne({_id:myid})
  .then(
    (user)=>{
        res.send(user)
        
    }
  )
  .catch(
    (err)=>{ 
      res.send(err)
    }
  )
})
// 2eme methode
router.get('/getById2/:id', async(req,res)=>{
try {
    myid=req.params.id;
    user= await User.findOne({_id:myid})
    res.send(user)
} catch (error) {
    res.send(error)
}
})
//1 ere methode
router.delete('/delete/:id',(req,res)=>{
    myid=req.params.id
    User.findOneAndDelete({_id:myid})
    .then(
        (deleteuser)=>{
          res.send(deleteuser)
        }
    )
    .catch(
        (err)=>{
           res.send(err)
        }
    )

});
// 2 eme methode 
router.delete('/remove/:id',async(req,res)=>{
try {
    myid=req.params.id
    deleteuser= await User.findOneAndRemove({_id:myid})
    res.send(deleteuser)
} catch (error) {
    res.send(error)
}
})
// 1ere methode
router.put('/update/:id',(req,res)=>{
    myid=req.params.id;
    newdata=req.body;
    User.findOneAndUpdate({_id:myid},newdata)
    .then(
        (updateuser)=>{
           res.send(updateuser)
        }
    )
    .catch(
        (err)=>{
            res.send(err)
        }
    )
})
//2eme methode
router.put('/upd/:id',async(req,res)=>{
try {
    myid=req.params.id;
    newdata=req.body
    update=await User.findOneAndUpdate({_id:myid},newdata)
    res.send(update)
} catch (error) {
    res.send(error)
}
})

module.exports=router