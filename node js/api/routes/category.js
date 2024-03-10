const express = require('express')
const router = express.Router()

const {
    create,
    update,
    getAll,
} = require('../controllers/category')
const { checkAuth } = require('../middlewares')
router.post('/create', create)
router.get('/getAll', getAll)

module.exports = router