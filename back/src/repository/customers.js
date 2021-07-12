module.exports = db => ({
    create: ({no, name, address, contactName, deliveryDays, mobilePhone, userId}) => db.query(
        `INSERT INTO Customers (no, name, address, contact_name, delivery_days, mobile_phone, user_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7);`,
        [no, name, address, contactName, deliveryDays, mobilePhone, userId]
    ).then(data => data.rows),

    getByNo: (no) => db.query(
        `SELECT * FROM Customers WHERE no = $1;`,
        [no]
    ).then(data => data.rows),
})