const express = require('express');
const {
    getChilds,
    getChild,
    createChild,
    updateChild,
    deleteChild
} = require('../controllers/child');

const { protect } = require('../middleWare/auth');

const router= express.Router();

router
.route('/')
.get(getChilds )
.post(protect, createChild);

router
.route('/:id')
.get(getChild) 
.put(protect, updateChild)
.delete(protect, deleteChild );


module.exports = router;
