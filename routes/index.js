const router = require('express').Router()


router.use('/student', require('./student'))
//router.use('/test', require('./test'))

module.exports = router