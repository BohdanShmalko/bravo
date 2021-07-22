const router = require('express').Router();

const verifyToken = require('../middlewares/verifyToken')
const checkUserStatus = require('../middlewares/checkUserStatus')
const {
    send400,
    existNo
} = require('../helpers/common')
const {
    getOrders
} = require('../helpers/customer')

router.use(verifyToken)
router.use(checkUserStatus('customer'))

router.get('/getOrders', async (req, res) => {
    await getOrders(req)
})

router.put('/changeOrderStatus', async (req, res) => {

})

router.post('/createOrder', async (req, res) => {

})

module.exports = router