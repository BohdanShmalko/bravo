const router = require('express').Router();

const verifyToken = require('../middlewares/verifyToken')
const checkUserStatus = require('../middlewares/checkUserStatus')

router.use(verifyToken)
router.use(checkUserStatus('admin'))


module.exports = router