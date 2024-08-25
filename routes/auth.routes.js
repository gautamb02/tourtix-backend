const express = require('express');
const bypass = require('../middleware/bypass.middleware');

const authRouter = express.Router()


authRouter.get("/signup", bypass, (req,res)=>{

    res.json({ message: 'This is a protected route'});

});

module.exports = authRouter;