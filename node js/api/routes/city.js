const express = require('express')
const router = express.Router()

const {
    createCity,
    getAllCity,
    getCityCode
} = require('../controllers/city')
const { checkAuth } = require('../middlewares')
router.post('/createCity', createCity)
router.get('/getAllCity', getAllCity)
router.get('/getCityCode/:cityId',checkAuth, getCityCode); 

module.exports = router