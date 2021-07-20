const router = require('express').Router();

const verifyToken = require('../middlewares/verifyToken')
const checkUserStatus = require('../middlewares/checkUserStatus')
const {
    getManyCustomers,
    checkEditCustomerBody,
    existId,
    editCustomer,
    getManyCustomersLike,
    checkReplaceCatalogBody,
    addToCatalog,
    replaceCatalog,
    checkAddProductBody,
    deleteProduct,
    getAllCustomersNo,
    getAllProductsCode,
    getManyProducts,
    getManyProductsLike,
    checkEditProductBody,
    editProduct,
    checkSortAvailabilityBody,
    getSortedData
} = require('../helpers/admin');
const {
    send400,
    existNo
} = require('../helpers/auth')

router.use(verifyToken)
router.use(checkUserStatus('admin'))

router.get('/getCustomers/:start/:howMany', async (req, res) => {
    const data = await getManyCustomers(req)
    res.send(data)
})

router.put('/editCustomer', async (req, res) => {
    if(checkEditCustomerBody(req)) return send400(res, 'Invalid data');

    const existingId = await existId(req);
    if(!existingId) return send400(res, 'Invalid data');

    const existingNo = await existNo(req);
    if(existingNo) return send400(res, 'This no is already exist');

    await editCustomer(req);
    res.send({ message: 'ok' })
})

router.get('/getCustomersLike/:template/:start/:howMany', async (req, res) => {
    const data = await getManyCustomersLike(req)
    res.send(data)
})

router.post('/replaceCatalog', async (req, res) => {
    if(checkReplaceCatalogBody(req)) return send400(res, 'Invalid data');
    await replaceCatalog(req);
    res.send({ message: 'ok' })
})

router.post('/addProduct', async (req, res) => {
    if(checkAddProductBody(req)) return send400(res, 'Invalid data');
    const id = await addToCatalog(req, req.body);
    res.send({ id })
})

router.delete('/deleteProduct/:id', async (req, res) => {
    await deleteProduct(req);
    res.send({ message: 'ok' });
})

router.get('/allCustomersNo', async (req, res) => {
    const data = await getAllCustomersNo(req);
    res.send(data);
})

router.get('/allProductsCode', async (req, res) => {
    const data = await getAllProductsCode(req);
    res.send(data);
})

router.get('/getProducts/:start/:howMany', async (req, res) => {
    const data = await getManyProducts(req);
    res.send(data);
})

router.get('/getProductsLike/:template/:start/:howMany', async (req, res) => {
    const data = await getManyProductsLike(req);
    res.send(data);
})

router.put('/editProduct', async (req, res) => {
    if(checkEditProductBody(req)) return send400(res, 'Invalid data');
    await editProduct(req);
    res.send({ message: 'ok' })
})

router.post('/sortAvailability', async (req, res) => {
    if(checkSortAvailabilityBody(req)) return send400(res, 'Invalid data');

    const data = await getSortedData(req);
    res.send(data)
})

module.exports = router