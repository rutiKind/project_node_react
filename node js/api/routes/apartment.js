const express = require('express')
const router = express.Router()

const {
    create,
    update,
    getAll,
    deleteApartment,
    getById,
    getByCategoryId,
    getByCityId,
    getByBigBed,
    getByLitteleBed,
    getByEqualBed,
    getByPricreBig,
    getByPricreLittle,
    getByPricreEqual,
    getByAdvertiser,
    apartmentDetails,
    try2
} = require('../controllers/apartment')
const { checkAuth,upload } = require('../middlewares')
// const { checkAuth } = require('../middlewares')
router.get('/getAll',getAll)
//upload.single('img')
router.post('/create',upload.single('image'), create)
router.put('/update', upload.single('image'), update)
router.delete('/delete/:id',deleteApartment)
router.get('/getById/:id',checkAuth,getById)
router.get('/getByCategoryId/:id',checkAuth,getByCategoryId)
router.get('/getByCityId/:id',checkAuth,getByCityId)
router.get('/getByBigBed/:numBed',checkAuth,getByBigBed)
router.get('/getByLitteleBed/:numBed',checkAuth,getByLitteleBed)
router.get('getByEqualBed/:numBed',checkAuth,getByEqualBed)
router.get('/getByPricreBig/:price',checkAuth,getByPricreBig)
router.get('/getByPricreLittle/:price',checkAuth,getByPricreLittle)
router.get('/getByPricreEqual/:price',checkAuth,getByPricreEqual)
router.get('/getByAdvertiser/:id',checkAuth,getByAdvertiser)
router.post('/apartmentDetails',apartmentDetails)
router.patch('/try',try2)


module.exports = router