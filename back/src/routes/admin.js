const router = require('express').Router();

const verifyToken = require('../middlewares/verifyToken')
const checkUserStatus = require('../middlewares/checkUserStatus')

router.use(verifyToken)
router.use(checkUserStatus('admin'))

// router.get('/customers', (req, res) => {
//     res.send('test auth')
// })
//
// router.get('/orders', (req, res) => {
//     res.send('test auth')
// })
//
// router.put('/preority', (req, res) => {
//     res.send('test auth')
// })
//
// router.put('/status', (req, res) => {
//     res.send('test auth')
// })
//
// router.post('/product', (req, res) => {
//     res.send('test auth')
// })
//
// router.put('/product', (req, res) => {
//     res.send('test auth')
// })
//
// router.delete('/product', (req, res) => {
//     res.send('test auth')
// })


module.exports = router