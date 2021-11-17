const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Hotel = require('../models/hotel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verifyToken = require('./verifyToken');
const multer = require('multer');
const path = require('path');

require('dotenv').config();
var DB_CONNECTION = "mongodb+srv://supun:1234@cluster0.2mmgq.mongodb.net/OnlineFood";
var SECRET_KEY = "supun";

//connect to the database
mongoose.connect(DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to the database successfully");
    })
    .catch(err => console.log(err));

router.get('/', (req, res) => {
    res.send('Redirecting to login page');
});

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'public/uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `FunOfHeuristic_${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

router.post('/register', async (req, res) => {
    let userData = req.body;
    // check if the user is already in the database
    const emailExist = await User.findOne({ email: userData.email });
    if (emailExist) return res.status(400).send("Email already exist!");

    // hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create a new user
    const newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword
    });

    // save to the db
    newUser.save()
        .then((registeredUser) => {
            let payload = { subject: registeredUser.id };
            let token = jwt.sign(payload, SECRET_KEY);
            res.status(200).send({ token, username: registeredUser.username, email: registeredUser.email, userId: registeredUser.id });
        })
        .catch((error) => { console.log(error); res.status(400).send(error) });

});

router.post('/login', async (req, res) => {
    let userData = req.body;

    // check if the email matches the email in the database
    const user = await User.findOne({ email: userData.email });
    if (!user) return res.status(400).send("Email doesn't exist!");

    // check if the password is correct
    const validPassword = await bcrypt.compare(userData.password, user.password);
    if (!validPassword) return res.status(400).send("Incorrect Password!");

    // create and assign a token
    let payload = { subject: user.id };
    let token = jwt.sign(payload, SECRET_KEY);
    return res.status(200).send({ token, username: user.username, email: user.email, userId: user.id });
});

router.put('/changePassword', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    User.findOne({ email: req.body.email },
        (err, user) => {
            if (!user)
                return res.status(404).send(['user Not Exist !']);
            else {
                console.log(hashedPassword)
                user.updateOne({ password: hashedPassword }, function (err, doc) {
                    if (err) {
                        return res.status(422).send(['Eror from backend !']);
                    } else {
                        return res.status(200).send(['User updated to list!']);
                    }
                })
            }
        })
});

router.get('/hotels', verifyToken, async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.json(hotels);
    } catch (err) {
        res.status(404).send(`Unable to process your request - ${err}`);
    }
});

router.get('/hotels/:hotelId', verifyToken, async (req, res) => {
    try {
        const hotel = await Hotel.findOne({ id: req.params.hotelId });
        res.json(hotel);
    } catch (err) {
        res.status(404).send(`Unable to process your request - ${err}`);
    }
});

router.get('/order/:userId', verifyToken, async (req, res) => {

    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send("User doesn't exist!");

    return res.status(200).send({ orders: user.orders });
});

router.delete('/deleteHotel/:hotelId', verifyToken, async (req, res) => {
    Hotel.deleteOne({ _id: req.params.hotelId },
        (err, dep) => {
            if (!dep)
                return res.status(404).send(['Hotel Not Exist !']);
            else {
                return res.status(200).json({ message: 'Hotel removed !' });
            }
        })
});

router.delete('/orderDelete/:userId/:orderId', verifyToken, async (req, res) => {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send("User doesn't exist!");

    User.updateOne(
        { _id: req.params.userId },
        {
            $pull: {
                orders: {
                    _id : req.params.orderId
                }
            }
        },
        function (err, success) {
            if (err) {
                return res.status(500).send(err)
            }
            else {
                return res.status(200).send(success);
            }
        }
    )
});

router.put('/updateHotel/:hotelId', verifyToken, async (req, res) => {
    Hotel.findOne({ _id: req.params.hotelId },
        (err, hotel) => {
            if (!hotel)
                return res.status(404).send(['Department Not Exist !']);
            else {
                if (req.body.name) {
                    hotel.updateOne({ name: req.body.name }, function (err, doc) {
                        if (err) {
                            return res.status(422).send(['Eror from backend !']);
                        } else {
                            return res.status(200).send(['User Added to list!']);
                        }

                    })
                }
                if (req.body.address) {
                    hotel.updateOne({ address: req.body.address }, function (err, doc) {
                        if (err) {
                            return res.status(422).send(['Eror from backend !']);
                        } else {
                            return res.status(200).send(['User Added to list!']);
                        }

                    })
                }
                if (req.body.cuisines) {
                    hotel.updateOne({ cuisines: req.body.cuisines }, function (err, doc) {
                        if (err) {
                            return res.status(422).send(['Eror from backend !']);
                        } else {
                            return res.status(200).send(['User Added to list!']);
                        }

                    })
                }
            }
        })
});

router.put('/updateImage/:hotelId', upload.single('file'), (req, res, next) => {
    const file = req.file;
    if (file) {
        Hotel.findOne({ _id: req.params.hotelId },
            (err, hotel) => {
                if (!hotel)
                    return res.status(404).send(['Department Not Exist !']);
                else {
                    hotel.updateOne({ thumbnail_image: 'http://localhost:8080/uploads/' + file.filename + '?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A' }, function (err, doc) {
                        if (err) {
                            return res.status(422).send(['Eror from backend !']);
                        } else {
                            return res.status(200).send(['User Added to list!']);
                        }

                    })
                }
            })
    }
})

router.post('/order/:userId', verifyToken, async (req, res) => {

    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send("User doesn't exist!");

    User.updateOne(
        { _id: req.params.userId },
        {
            $push: {
                orders: req.body
            }
        },
        function (err, success) {
            if (err) {
                return res.status(500).send(err)
            }
            else {
                return res.status(200).send(success);
            }
        }
    )
});

router.post('/addItem/:hotelId', verifyToken, async (req, res) => {

    const hotel = await Hotel.findById(req.params.hotelId);
    if (!hotel) return res.status(400).send("User doesn't exist!");
    console.log(req.body);
    User.updateOne(
        { _id: req.params.hotelId },
        {
            $push: {
                menu: req.body
            }
        },
        function (err, success) {
            if (err) {
                return res.status(500).send(err)
            }
            else {
                return res.status(200).send(success);
            }
        }
    )
});

module.exports = router;