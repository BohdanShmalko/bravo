const router = require('express').Router();
const jwt = require('jsonwebtoken');

const generator = require('../middlewares/generator')
const sendEmail = require('../middlewares/sendEmail')
const verifyToken = require('../middlewares/verifyToken')
const { SECRET_KEY } = require('../config');
const usersRepo = require('../repository/users');
const customerRepo = require('../repository/customers');

const FRESH_TOKEN_TIME = 1000 * 60 * 15;

router.post('/sendLogin', generator, sendEmail, async (req, res) => {
    //get email from body
    const { email } = req.body;
    if(!email) return res.status(400).send({ message : 'Invalid data' });

    //check email in db
    const userDb = usersRepo(req.db);
    const [existEmail] = await userDb.getByEmail(email)
    if(!existEmail) return res.status(400).send({ message : 'This account doesn’t exist in the system' });

    //generate token
    const payload = {
        id : existEmail.id,
        status : existEmail.status,
        tokenSecretKey : req.generatedKey,
        sendingTime : new Date().getTime()
    };
    const token = jwt.sign(payload, SECRET_KEY);

    //send secret key to email
    const url = `http://localhost:4200/authEmail/${req.generatedKey}`;

    await req.sendEmail({
        to : email,
        subject : 'Secret code for bravo',
        text : 'Secret key:',
        html : `<h2>Your secret key : ${url}</h2>`,
    });

    //send token
    res.send({ token })
})

router.post('/sendRegistration', generator, sendEmail, async (req, res) => {
    //get data from body
    const { email, name, address, contactName, deliveryDays, mobilePhone, no } = req.body;
    if(!email || !name || !address || !contactName || !deliveryDays || !no)
        return res.status(400).send({ message : 'Invalid data' });

    //check email in db
    const userDb = usersRepo(req.db);
    const [existEmail] = await userDb.getByEmail(email)
    if(existEmail) return res.status(400).send({ message : 'This email is already exist' });

    //check no in db
    const customerDb = customerRepo(req.db);
    const [existingNo] = await customerDb.getByNo(no)
    if(existingNo) return res.status(400).send({ message : 'This No is already exist' });

    //generate token
    const payload = {
        email, name, address, contactName, deliveryDays, mobilePhone, no,
        tokenSecretKey : req.generatedKey,
        sendingTime : new Date().getTime()
    };
    const token = jwt.sign(payload, SECRET_KEY);

    //send secret key to email
    const url = `http://localhost:4200/authEmail/${req.generatedKey}`;

    await req.sendEmail({
        to : email,
        subject : 'Secret code for bravo',
        text : 'Secret key:',
        html : `<h2>Your secret key : ${url}</h2>`,
    });

    //send token
    res.send({ token })
})

router.post('/login', verifyToken, async (req, res) => {
    //get secretKey from body
    const { secretKey } = req.body;
    if(!secretKey) return res.status(400).send({ message : 'Invalid data' });

    //get data from token
    if(!req.jwtParams) return res.status(400).send({ message : 'Broken token' });
    const { id, status, tokenSecretKey, sendingTime } = req.jwtParams
    if(!id || !status || !tokenSecretKey || !sendingTime)
        return res.status(400).send({ message : 'Broken token' });

    if(new Date().getTime() - sendingTime > FRESH_TOKEN_TIME)
        return res.status(400).send({ message : 'Token is rotten, please login again' });

    if(tokenSecretKey !== secretKey) return res.status(400).send({ message : 'Code is not valid' });

    //generate token
    const payload = {
        id, status
    };
    const token = jwt.sign(payload, SECRET_KEY);

    res.send({ token, status })
})

router.post('/register', verifyToken, async (req, res) => {
    //get secretKey from body
    const { secretKey } = req.body;
    if(!secretKey) return res.status(400).send({ message : 'Invalid data' });

    //get data from token
    if(!req.jwtParams) return res.status(400).send({ message : 'Broken token' });
    const { email, name, address, contactName, deliveryDays, mobilePhone , tokenSecretKey, sendingTime, no } = req.jwtParams
    if(!email || !name || !tokenSecretKey || !sendingTime || !address || !contactName || !deliveryDays || !no)
        return res.status(400).send({ message : 'Broken token' });

    if(new Date().getTime() - sendingTime > FRESH_TOKEN_TIME)
        return res.status(400).send({ message : 'Token is rotten, please login again' });

    if(tokenSecretKey !== secretKey) return res.status(400).send({ message : 'Code is not valid' });

    //add user to db
    const userDb = usersRepo(req.db);
    const [newUser] = await userDb.create({ email, status: 'customer' })

    //add customer to db
    const customerDb = customerRepo(req.db);
    await customerDb.create({
        no, name, address, contactName, deliveryDays, mobilePhone, userId : newUser.id
    })

    //generate token
    const payload = {
        id : newUser.id, status: newUser.status
    };
    const token = jwt.sign(payload, SECRET_KEY);

    res.send({ token, status })
})

module.exports = router