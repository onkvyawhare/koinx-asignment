const express = require('express');
const router = express.Router();
const Price=require('../Models/Price');
const coingeckoService=require('../Services/coingeokoservice')

router.get('/',async(req,res)=>{
    try{

        const price=await Price.findOne().sort({timestamp:-1});
        if (!price) return res.status(404).json({ error: 'Price not found' });
    res.json(price);
    }
    catch(error){
        res.status(500).json({ error: error.message });

    }
})

module.exports=router;
