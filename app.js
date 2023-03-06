const express=require('express');
const collection = require('./mongo')
const cors=require('cors')
const app=express()
app.use(express.json())
app.use(express.urlencoded({ extended:true}))
app.use(cors())
const Addproduct = require('./mongo')

app.get('/',cors(),(req,res) => {


})

app.get("/",(req,res)=>{
    res.send("hi");
})

app.post('/',async(req,res) => {
  const{email,password} = req.body
  const data={
    email: email,
    password: password
  }
  try{
       const check = await collection.findOne({email:email,password:password})
          if(check){
            res.json("exist")
          }       
          else{
            res.json("notexist")
            
          }
  }
  catch(e){
         res.json("notexist")
  }
})


app.post('/addproduct', async (req, res) => {
  const { productName, productDes } = req.body;
  const newProduct = new Addproduct({
    productName,
    productDes,
  });
  try {
    await newProduct.save();
    res.json({status:200,message:'success'});
  } catch (e) {
    console.error(e);
    res.status(500).json( 'Failed to add product' );
  }
});

app.get('/add',(req,res)=>{
  Addproduct.find((err,data)=>{
    if(err){
      res.status(500).send(err)
    }
    else{
      res.status(200).send(data)
    }
  })
   
})

app.get('/editproduct',(req,res)=>{
  Addproduct.find((err,data)=>{
    if(err){
      res.status(500).send(err)
    }
    else{
      res.status(200).send(data)
    }
  })
   
})

app.put('/editProduct/:id', async (req, res) => {
  const { productName, productDes } = req.body;
  const productId = req.params.id;

  try {
    const updatedProduct = await Addproduct.findByIdAndUpdate(productId, {
      productName,
      productDes,
    }, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ status: 200, message: 'Product updated successfully' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Failed to update product' });
  }
});



app.listen(3000,()=>{
  console.log('port connected');
})
