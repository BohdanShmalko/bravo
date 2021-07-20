const customerRepo = require('../repository/customers');
const productsRepo = require('../repository/products');
const unitsRepo = require('../repository/units');
const exsclusiveRepo = require('../repository/exsclusive');
const replacementsRepo = require('../repository/replacements');

const getManyCustomers = async (req) => {
    const { start, howMany } = req.params;
    const rowData = await customerRepo(req.db).getMany(start, howMany);
    const size = await customerRepo(req.db).allCustomersSize();
    const data = rowData.rows.map(obj => ({ ...obj, deliveryDays: JSON.parse(obj.deliveryDays) }))
    return { size, data }
}

const checkEditCustomerBody = req => {
    const { id, no, deliveryDays } = req.body;
    return !id || !no || !deliveryDays;
}

const editCustomer = async (req) => {
    const { id, no, deliveryDays } = req.body;
    await customerRepo(req.db).updateCustomer({ id, no, deliveryDays: JSON.stringify(deliveryDays) })
}

const existId = async (req) => {
    const [existingId] = await customerRepo(req.db).getById(req.body.id);
    return existingId;
}

const getManyCustomersLike = async (req) => {
    const { start, howMany, template } = req.params;
    const rowData = await customerRepo(req.db).getManyLike(template, start, howMany);
    const size = await customerRepo(req.db).likeCustomersSize(template);
    const data = rowData.rows.map(obj => ({ ...obj, deliveryDays: JSON.parse(obj.deliveryDays) }))
    return { size, data }
}

const checkReplaceCatalogBody = req => {
    if (JSON.stringify(req.body) === '{}' ) return true;
    const { code, name, units, availability, exclusive, replacement } = req.body[0];
    return !code || !name || !units || !availability || !exclusive || !replacement;
}

const addAllUnits = async (units, db, id) => {
    for (let j = 0; j < units.length; j++){
        const { price, unit } = units[j];
        await unitsRepo(db).addUnit({ id, price, unit })
    }
}

const addAllExsclusive = async (exclusive, db, id, userId) => {
    for (let j = 0; j < exclusive.length; j++) {
        const [userIdRow] = await customerRepo(db).getUserIdByNo(exclusive[j]);
        if(userIdRow.id)
            await exsclusiveRepo(db).addExclusive({ id, userId: userIdRow.id })
    }
}

const addAllReplacement = async (replacement, db, id, toId) => {
    for (let j = 0; j < replacement.length; j++) {
        const [toIdRow] = await productsRepo(db).getIdByCode(replacement[j]);
        if(toIdRow.id)
            await replacementsRepo(db).addReplacements({ toId: toIdRow.id, id })
    }
}

const addToCatalog = async (req, element) => {
    const { db } = req;
    const productsDB = productsRepo(db);
    const { code, name, units, availability, exclusive, replacement } = element;
    const [idRow] = await productsDB.addProduct({ name, availability, code });
    await addAllUnits(units, db, idRow.id);
    await addAllExsclusive(exclusive, db, idRow.id);
    await addAllReplacement(replacement, db, idRow.id);
    return idRow.id;
}

const replaceCatalog = async (req) => {
    const { db } = req;
    const productsDB = productsRepo(db);
    await productsDB.deleteAll();
    for (let i = 0; i < req.body.length; i++){
        await addToCatalog(req, req.body[i]);
    }
}

const checkAddProductBody = req => {
    const { code, name, units, availability, exclusive, replacement } = req.body;
    return !code || !name || !units || !availability || !exclusive || !replacement;
}

const deleteProduct = async (req) => {
    const { id } = req.params;
    await productsRepo(req.db).deleteById(id);
}

const getAllCustomersNo = async (req) => {
    const data = await customerRepo(req.db).getAllNo();
    return data.map(obj => obj.no);
}

const getAllProductsCode = async (req) => {
    const data = await productsRepo(req.db).getAllCode();
    return data.map(obj => obj.code);
}

const formDataProducts = async (rowData, req) => {
    const data = []
    for (let i = 0; i < rowData.rowCount; i++) {
        const dataUnit = rowData.rows[i];
        const units = await unitsRepo(req.db).getAllById(dataUnit.id);
        dataUnit.units = units;
        data.push(dataUnit);
    }
    return data;
}

const getManyProducts = async (req) => {
    const { start, howMany } = req.params;
    const rowData = await productsRepo(req.db).getManyProducts(start, howMany)
    const size = await productsRepo(req.db).allProductsSize();
    const data = await formDataProducts(rowData, req);
    return { size, data }
}

const getManyProductsLike = async (req) => {
    const { start, howMany, template } = req.params;
    const rowData = await productsRepo(req.db).getManyProductsLike(template, start, howMany)
    const size = await productsRepo(req.db).likeProductsSize(template);
    const data = await formDataProducts(rowData, req);
    return { size, data }
}

const checkEditProductBody = req => {
    return checkAddProductBody(req) || !req.body.id
}

const editProduct = async (req) => {
    const { db } = req;
    const { id, code, name, units, availability, exclusive, replacement } = req.body;
    await productsRepo(db).updateProduct({ id, code, availability, name });
    await unitsRepo(db).deleteUnitsById(id);
    await addAllUnits(units, db, id);
    await exsclusiveRepo(db).deleteExclusiveById(id);
    await addAllExsclusive(exclusive, db, id);
    await replacementsRepo(db).deleteReplacementsById(id);
    await addAllReplacement(replacement, db, id);
}

const checkSortAvailabilityBody = req => {
    const { data, start, howMany } = req.body;
    return !data || !start.toString() || !howMany.toString();
}

const getSortedData = async (req) => {
    const { data, start, howMany, template } = req.body;
    const rowData = await productsRepo(req.db).sortedByAvailability(data, start, howMany, template);
    const size = await productsRepo(req.db).availabilityProductsSize(data, template);
    const endData = await formDataProducts(rowData, req);
    return { size, data: endData }
}

module.exports = {
    getManyCustomers,
    checkEditCustomerBody,
    existId,
    editCustomer,
    getManyCustomersLike,
    addToCatalog,
    replaceCatalog,
    checkReplaceCatalogBody,
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
}