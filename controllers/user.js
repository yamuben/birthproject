const errorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleWare/async');
const User = require('../models/users');


// @desc         register user
// @route        POST /api/v1/user/register
// @access       public

exports.register= asyncHandler( async(req,res,next) =>{
    const { name, email, password, role, phone, address} = req.body;

    // create users
    const user = await User.create({
        name,
        email,
        password,
        role,
        phone,
        address
    });

    sendTokenResponse(user, 200, res);
});

// @desc         Login user
// @route        POST /api/v1/user/login
// @access       public

exports.login= asyncHandler(async(req,res,next) =>{
    const { email, password } = req.body;

    // validate email & password
    if(!email || !password){
        return next(new errorResponse('please provide an email and password', 400));
    }
    // check  fro user
    const user =await User.findOne({email}).select('+password');
    if(!user){
        return next(new errorResponse('invalid credentials', 401));
    
    }
    // check if password matches
    const isMatch = await user.matchPassword(password);
    if(!isMatch){
        return next(new errorResponse('invalid credentials', 401));
    }
sendTokenResponse(user, 200, res);

});

  // @desc      Update user details
// @route     PUT /api/v1/user/updatedetails/:id
// @access    Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email, 
      phone: req.body.email, 
      address: req.body.email 
    }; 
  
    const user = await User.findByIdAndUpdate(req.params.id, fieldsToUpdate, {
      new: true,
      runValidators: true
    });
  
    res.status(200).json({
      success: true,
      data: user
    });
  });

  // @desc      Update password
// @route     PUT /api/v1/user/updatepassword/:id
// @access    Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('+password');

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new errorResponse('Password is incorrect', 401));
  }

  user.currentPassword = req.body.newPassword;
  
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc      Delete user
// @route     DELETE /api/v1/user/:id
// @access    Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {}
  });
});

  
  

// get token from model , create cookie and send response
const sendTokenResponse = (user, statusCode, res) =>{
     // Create token
     const token= user.getSignedJwtToken(); 

     const options = {
        expires : new Date(Date.now()+ process.env.JWT_COOKIE_EXPIRE *24 *60 *60 *1000),
        httpOnly:true
     };
     if(process.env.NODE_ENV === 'production') {
        options.secure=true

     }
     res
     .status(statusCode)
     .cookie('token', token, options)
     .json({
        success:true,
        token
     });
     
};
