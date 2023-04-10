const express = require('express')
const router = express.Router()
const { handleMongoooseError, isValidIdFormat } = require('../utils')

const bcrypt = require("bcrypt")
const bcryptSalt = 10

const User = require('./../models/User.model')



// Signup (post)
// router.post('/signup', async (req, res) => {

//     const { email, pwd, name, surname, username } = req.body
//     // username && (username = name.trim().split(' ')[0])

//     try {
//         const user = await User.findOne({ email })
      
//         if (user) {
//           res.status(400).json({ code: 400, err: ['A user already exists with this email address.'] })
//           return
//         }
      
//         // toAdd: check the username
      
//         const salt = bcrypt.genSaltSync(bcryptSalt)
//         const hashPass = pwd ? bcrypt.hashSync(pwd, salt) : undefined
      
//         const newUser = await User.create({ email, password: hashPass, name, surname, username})
//         if (newUser){
//             res.json({ code: 200, message: 'User created.'})
//             return
//         }
        
//         } 
//     catch (err) {
//             res.status(500).json({ code: 500, message: 'DB error while creating user.', err: handleMongoooseError(err) })
//         }
      
// })


router.post('/signup', (req, res) => {

    const { email, pwd, name, surname, username } = req.body
    // username && (username = name.trim().split(' ')[0])


    User
        .findOne({ email })
        .then(user => {

            if (user) {
                // console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                res.status(400).json({ code: 400, err: ['A user already exists with this email address.'] })
                return
            }

            // toAdd: check the username

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = pwd ? bcrypt.hashSync(pwd, salt) : undefined

            User
                .create({ email, password: hashPass, name, surname, username})
                .then((user) => res.json({ code: 200, message: 'User created.'}))
                .catch(err => res.status(500).json({ code: 500, message: 'DB error while creating user.', err: handleMongoooseError(err) }))
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching user.', err }))
})


// Login (post)
router.post('/login', (req, res) => {

    const { email, pwd } = req.body

    if( !email || !pwd ){
        res.status(400).json({ code: 401, err: ['Please provide the email and the password.'] })
        return
    }

    User
        .findOne({ email })
        .then(user => {

            if (!user) {
                res.status(401).json({ code: 401, err: ['User not registered.'] })
                return
            }

            if (bcrypt.compareSync(pwd, user.password) === false) {
                res.status(401).json({ code: 401, err: ['Incorect password.'] })
                return
            }

            req.session.currentUser = user
            res.json(req.session.currentUser)
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching user.', err: handleMongoooseError(err) }))
})


router.get('/logout', (req, res) => {
    // res.json(req.session.currentUser)
    req.session.destroy((err) => {
        if (err) {
            console.log(err)
            res.status(500).json({ code: 500, err: ['An error occurred while logging out.'] });
          } else {
            // req.session.cookie.maxAge = 0; //this one threw an error. Obviously.
            res.clearCookie('connect.sid');
            res.status(200).json({ code: 200, err: ["You've just logged out. Goodbye!"] })
            // res.redirect('/login'); // this one does nothing. Obviously. 
          }
        })
})

router.post('/isLoggedIn', (req, res) => {
    req.session.currentUser 
    ? 
    res.json(req.session.currentUser) 
    : 
    res.status(401).json({ code: 401, message: `Unauthorized operation for unidentified user: ${req.session.currentUser}` })
})



module.exports = router