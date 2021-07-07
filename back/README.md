# API

## AUTH

description | url | method | body | need token | response
----|----|--------|-------------|------------|-------
send code in email | /auth/sendLogin | POST | { email } | NO | { token }/{message : "error"}
send code in email | /auth/sendRegistration | POST | { email, name, address, contactName, deliveryDays, ?mobilePhone } | NO | { token }/{message : "error"}
login user | /auth/login | POST | { secretKey } | YES | { token }/{message : "error"}
register user | /auth/register | POST | { secretKey } | YES | { token }/{message : "error"}

## ADMIN

description | url | method | body | need token | response
----|----|--------|-------------|------------|-------
get customers length | /admin/customersLength | GET | ----- | YES | { customersLength }/{message : "error"}
get products length | /admin/productsLength | GET | ----- | YES | { productsLength }/{message : "error"}
get orders length | /admin/orderLength | GET | ----- | YES | { orderLength }/{message : "error"}
get products | /admin/products/:start/:howMany | GET | ----- | YES | [{ id, code, name, unit, price, availability }]/{message : "error"}
get customers | /admin/customers/:start/:howMany | GET | ----- | YES | [{ no, name, address, deliveryDays }]/{message : "error"}
get orders | /admin/orders/:start/:howMany | GET | ----- | YES | [{ orderNo, customerName, customerNo, items, notes, ordered, reqDelivery, status }]/{message : "error"}
create new unregistered order | /admin/createOrder | POST | { no, name, address, contactName, deliveryDays, ?mobilePhone } | YES | { message : 'ok' }/{message : "error"}
update customer information | /admin/updateCustomer | PUT | { no, name, address, deliveryDays } | YES | { message : 'ok' }/{message : "error"}
add product | /admin/addProduct | POST | { code, name, availability, units : [{ unit, price }], ?replaceTo, exclusive ?: [ userNo ] } | YES | { message : 'ok' }/{message : "error"}
update all products list | /admin/updateAllProducts | POST | [ { code, name, availability, units : [{ unit, price }], ?replaceTo, exclusive ?: [ userNo ] } ] | YES | { message : 'ok' }/{message : "error"}
update product | /admin/updateProduct | Put | { code, name, availability, units : [{ unit, price }], ?replaceTo, exclusive ?: [ userNo ] } | YES | { message : 'ok' }/{message : "error"}
delete product | /admin/product/:id | GET | ----- | YES | { message : 'ok' }/{message : "error"}
find customer | /admin/customer/:template | GET | ----- | YES | { message : 'ok' }/{message : "error"}

## CLIENT

description | url | method | {body}/params | need token | response
----|----|--------|-------------|------------|-------
get orders length | /admin/orderLength | GET | ----- | YES | { orderLength }/{message : "error"}
get orders | /client/orders/:startWith/:howMany | GET | ----- | YES | [{order}]/{message : "error"}
