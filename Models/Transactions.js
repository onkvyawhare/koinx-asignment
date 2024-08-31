const moongoose=require("mongoose");

const transactionsSchmea=new moongoose.Schema({
    address:{
        type:String,
        required:true,
        unique:true
    },
    transactions:{
        type:Array,
        required:true
    }
});

module.exports=moongoose.model('Transaction',transactionsSchmea);
