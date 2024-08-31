const express=require("express");
const router=express.Router();
const Transaction=require("../Models/Transactions");
const Etherservice=require("../Services/Etherservices");


router.get('/:address',async(req,res)=>{

    try{
        const address=req.params.address;
        const transactions=await Etherservice.fetchTransactions(address);

         // Save transactions to DB
    await Transaction.updateOne({ address }, { $set: { transactions } }, { upsert: true });
    res.json(transactions);

    }
    catch(error){
        res.status(500).json({ error: error.message });
        console.log(error);

    }

});


router.get('/expenses/:address',async(req,res)=>{
    try{
        const address = req.params.address;
    const transactions = await Transaction.findOne({ address });
    if (!transactions) return res.status(404).json({ error: 'Address not found' });

    const totalExpenses = transactions.transactions.reduce((acc, tx) => {
        const gasUsed = tx.gasUsed;
        const gasPrice = tx.gasPrice;
        const expense = (gasUsed * gasPrice) / 1e18;
        return acc + expense;
      }, 0);

      const priceService = require('../Services/coingeokoservice');
    const etherPrice = await priceService.getLatestPrice();

    res.json({ totalExpenses, etherPrice });
    

    }
    catch(error){
        res.status(500).json({ error: error.message });
        console.log(error);
        
    }
   
})

module.exports = router;