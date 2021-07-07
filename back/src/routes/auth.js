const router = require('express').Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const generator = require('../middlewares/generator')
const sendEmail = require('../middlewares/sendEmail')
const verifyToken = require('../middlewares/verifyToken')
const { SECRET_KEY } = require('../config');

router.post('/new', generator, sendEmail, async (req, res) => {
    // let hasError = false;
    // //get email, name, password
    // const { email, name, password } = req.body;
    //
    // //check data
    // if (!email || !name || !password) return res.status(400).send({ message : 'Invalid data' })
    //
    // //check is exist email in db
    // const usersDb = usersRepository(req.db);
    // const [existingUser] = await usersDb.getByEmail(email).catch((err) => {
    //     console.log(err);
    //     hasError = true;
    // })
    // if(hasError) return res.status(500).send({ message : 'Server error' });
    // if(existingUser) return res.status(400).send({ message : 'This email is already exist' })
    //
    // //create token
    // const payload = { email, name, password, tokenSecretKey : req.generateKey };
    // const token = jwt.sign(payload, SECRET_KEY);
    //
    // //send to email
    // await req.sendEmail({
    //     to : email,
    //     subject : 'Secret code for bravo',
    //     text : 'Secret key:',
    //     html : `<h1>${req.generateKey}</h1>`,
    // }).catch((err) => {
    //     console.log(err);
    //     hasError = true;
    // });
    // if(hasError) return res.status(500).send({ message : 'Server error' })
    //
    // //send token
    // res.send({ token })
})

router.post('/create', verifyToken, async(req, res) => {
    // let hasError = false;
    //
    // //get secretKey from body
    // const { secretKey } = req.body;
    // if(!secretKey) return res.status(400).send({ message : 'Invalid data' });
    //
    // //get email, name, password, tokenSecretKey from token
    // if(!req.jwtParams) return res.status(400).send({ message : 'Broken token' });
    // const { email, name, password, tokenSecretKey } = req.jwtParams
    // if(!email || !name || !password || !tokenSecretKey) return res.status(400).send({ message : 'Broken token' });
    //
    // //to compare secretKey from body and from token
    // if (secretKey !== tokenSecretKey) return res.status(400).send({ message : 'You entered an incorrect secret key' });
    //
    // //check is exist email in db
    // const usersDb = usersRepository(req.db);
    // const [existingUser] = await usersDb.getByEmail(email).catch((err) => {
    //     console.log(err);
    //     hasError = true;
    // })
    // if(hasError) return res.status(500).send({ message : 'Server error' });
    // if(existingUser) return res.status(400).send({ message : 'This email is already exist' })
    //
    // //save user in db
    // const hexPassword = crypto.createHash("md5").update(password).digest("hex");
    // const [newUser] = await usersDb.save({email, password : hexPassword, name}).catch(err => {
    //     console.log(err);
    //     hasError = true;
    // })
    // if(hasError) return res.status(500).send({ message : 'Server error' });
    //
    // //create new token
    // const payload = { userId : newUser.id, status : newUser.status };
    // const token = jwt.sign(payload, SECRET_KEY);
    //
    // //send token
    // res.send({ token, status : newUser.status })
})

router.post('/login', async (req, res) => {
    // let hasError = false;
    //
    // //get email and password from body
    // const { email, password } = req.body;
    // if(!email || !password) return res.status(400).send({ message : 'Invalid data' });
    //
    // //check if exist user
    // const usersDb = usersRepository(req.db);
    // const [existingUser] = await usersDb.getByEmail(email).catch((err) => {
    //     console.log(err);
    //     hasError = true;
    // })
    // if(hasError) return res.status(500).send({ message : 'Server error' });
    // if(!existingUser) return res.status(400).send({ message : 'Your email or password incorect' })
    //
    // const hexPassword = crypto.createHash("md5").update(password).digest("hex");
    // if(existingUser.password !== hexPassword) return res.status(400).send({ message : 'Your email or password incorect' })
    //
    // //create token
    // const payload = { userId : existingUser.id, status : existingUser.status };
    // const token = jwt.sign(payload, SECRET_KEY);
    //
    // //send token
    // res.send({ token, status : existingUser.status })
})

module.exports = router