const express = require ('express');
const {
    register, 
    login , 
    updateDetails,
    updatePassword ,
    deleteUser
} = require('../controllers/user');

const { protect } = require('../middleWare/auth');

const router = express.Router();



router.post('/register', register);
router.post('/login', login);
router.put('/updateDetails/:id',protect,updateDetails);
router.put('/updatePassword/:id',updatePassword);
router.delete('/deleteUser/:id',deleteUser);

module.exports= router 