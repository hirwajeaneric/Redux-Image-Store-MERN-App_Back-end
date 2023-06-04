const express = require('express');
const router = express.Router();

const { findById, getAll, update, upload, attachFile, remove, removeAll, add } = require('../controllers/image.controller');

router.post('/add', upload.single('name'), attachFile, add);
router.put('/update', upload.single('name'), attachFile, update);
router.get('/findById', findById);
router.get('/list', getAll);
router.delete('/delete', remove);
router.delete('/deleteAll', removeAll);

module.exports = router;