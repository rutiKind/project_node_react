const express = require('express')
const router = express.Router()

const {
    login,
    register,
    getAll,
} = require('../controllers/customer')
//const { checkAuth } = require('../middlewares')

router.post('/register', register)
router.post('/login', login)
router.get('/getAll', getAll)
// .router.delete('/:id', checkAuth, remove)

module.exports = router