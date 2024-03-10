const express = require('express')
const router = express.Router()

const {
    login,
    register,
    getAll,
    forgetPassword,
    changePassword
} = require('../controllers/advertiser')
const { checkAuth } = require('../middlewares')
//const { checkAuth } = require('../middlewares')

router.post('/register', register)
router.post('/login', login)
router.get('/getAll', getAll)
router.post('/forgetPassword',forgetPassword)
router.put('/changePassword',changePassword)

// .router.delete('/:id', checkAuth, remove)

module.exports = router