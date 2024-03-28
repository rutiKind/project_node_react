const express = require('express')
const router = express.Router()

const {
    createCity,
    getAllCity,
    getCityCode
} = require('../controllers/city')
const { checkAuth } = require('../middlewares')
router.post('/createCity/:cityName', createCity)
router.get('/getAllCity', getAllCity)
router.get('/getCityCode/:cityId', getCityCode); 

module.exports = router