const jwt =require('jsonwebtoken');
const asyncHandler= require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/users');

// protect route
exports.protect =asyncHandler(async  (req, res, next)=>{
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1]; 

    }
    if(!token){
      return next(new ErrorResponse('not authorize to access this route', 401));
    }
    try {
        // verify token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user= await User.findById(decoded.id);
        next();
    } catch (err) {
        return next(new ErrorResponse('not authorize to access this route', 401));
    }
});
