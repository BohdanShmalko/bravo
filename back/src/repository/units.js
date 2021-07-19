module.exports = db => ({
    addUnit: ({ unit, price, id }) => db.query(
        `INSERT INTO Units (unit, price, product_id)
         VALUES ($1, $2, $3)`,
        [unit, price, id]
    ),

    getAllById: (id) => db.query(
        `SELECT unit, price FROM Units WHERE product_id = $1`,
        [id]
    ).then(data => data.rows),

    deleteUnitsById: (id) => db.query(
        `DELETE FROM Units WHERE id = $1;`,
        [id]
    )
})