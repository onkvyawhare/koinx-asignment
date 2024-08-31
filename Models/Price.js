

const mongoose=require('mongoose');

const priceSchema=new mongoose.Schema({
    price:{type:Number,
        required:true
    },
    timestamp:{
        type:Date,
        required:true
    }
});

module.exports = mongoose.model('Price', priceSchema);
