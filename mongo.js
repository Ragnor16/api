    const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://diwaarvind6:Diwa@cluster0.jxw0na0.mongodb.net/Asset?retryWrites=true&w=majority').then(()=>{
    console.log('mongodb connected');

})
.catch(()=>{
    console.log('failed')
})  

const newSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productDes:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    }
})

const collection = mongoose.model('Collection',newSchema)
const Addproduct = mongoose.model('Addproduct',productSchema)



module.exports=collection;
module.exports=Addproduct;


