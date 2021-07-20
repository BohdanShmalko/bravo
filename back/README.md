# API

## AUTH

description | url | method | body | need token | response
----|----|--------|-------------|------------|-------
send code in email | /auth/sendLogin | POST | { email } | NO | { token }/{message : "error"}
send code in email | /auth/sendRegistration | POST | { email, name, address, contactName, deliveryDays, ?mobilePhone, no } | NO | { token }/{message : "error"}
login user | /auth/login | POST | { secretKey } | YES | { token, status }/{message : "error"}
register user | /auth/register | POST | { secretKey } | YES | { token, status }/{message : "error"}

## ADMIN

description | url | method | body | need token | response
----|----|--------|-------------|------------|-------
get customers | /admin/getCustomers/:start/:howMany | GET | ----- | YES | {size, data: [{ no, name, address, deliveryDays }]}/{message : "error"}
edit customer | /admin/editCustomer | PUT | {id, no, deliveryDays} | YES | {message: "ok"}/{message : "error"}
get customers like template | /admin/getCustomersLike/:template/:start/:howMany | GET | ----- | YES | {size, data: [{ no, name, address, deliveryDays }]}/{message : "error"}
get products | /admin/getProducts/:start/:howMany | GET | ----- | YES | {size, data: [{id, code, name, units: [{unit, price}], availability}]}/{message : "error"}
delete product | /admin/deleteProduct/:id | DELETE | ----- | YES | {message: "ok"}/{message : "error"}
add product | /admin/addProduct | POST | {code, name, units: [{unit, price}], availability, exclusive: ["no"], replacement: ["code"]} | YES | {id}/{message : "error"}
edit product | /admin/addProduct | PUT | {id, code, name, units: [{unit, price}], availability, exclusive: ["no"], replacement: ["code"]} | YES | {message: "ok"}/{message : "error"}
all customers no | /admin/allCustomerNo | GET | ----- | YES | ["no"]/{message : "error"}
all products code | /admin/allProductsCode | GET | ----- | YES | ["code"]/{message : "error"}
replace products table | /admin/replaceCatalog | POST | [{code, name, units: [{unit, price}], availability, exclusive: ["no"], replacement: ["code"]}] | YES | {message: "ok"}/{message : "error"}
get sorted by availability data | /admin/sortAvailability | POST | {start, howMany, inStock:{inStock, outOfStock, discontinued}} | YES | {size, data: [{id, code, name, units: [{unit, price}], availability}]}/{message : "error"}
get products like template | /admin/getProductsLike/:template/:start/:howMany | GET | ----- | YES | {size, data: [{id, code, name, units: [{unit, price}], availability}]}/{message : "error"}

## CLIENT

description | url | method | {body}/params | need token | response
----|----|--------|-------------|------------|-------

