module.exports = db => ({
    addGood: (unitId, orderId, quantity) => db.query(
        `INSERT INTO Goods (quantity, order_id, unit_id)
            VALUES ($2, $3, $1);`,
        [unitId, quantity, orderId]
    )
})