const ordersRepo = require('../repository/orders')

const getOrders = async (req) => {
    const { id } = req.jwtParams;
    const orders = await ordersRepo(req.db).getCustomerData(id);
    console.log(orders)
}

module.exports = {
    getOrders
}