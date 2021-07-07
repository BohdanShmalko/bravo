const router = require('express').Router();

const verifyToken = require('../middlewares/verifyToken')
const checkUserStatus = require('../middlewares/checkUserStatus')

router.use(verifyToken)
router.use(checkUserStatus('customer'))

// router.get('/orders', (req, res) => {
//     res.send('test client')
// })
//
// router.put('/preority', (req, res) => {
//     res.send('test client')
// })
//
// router.delete('/cancel', (req, res) => {
//     res.send('test client')
// })
//
// router.put('/order', (req, res) => {
//     res.send('test client')
// })
//
// router.put('/confirm', (req, res) => {
//     res.send('test client')
// })

module.exports = router