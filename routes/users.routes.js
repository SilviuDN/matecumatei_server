const express = require('express')
const router = express.Router()
const { handleMongoooseError, isValidIdFormat } = require('../utils')

const bcrypt = require("bcrypt")
const bcryptSalt = 10

const User = require('./../models/User.model')

const { checkLoggedUser } = require('./../middleware')


// router.get('/', (req, res) => {

//     User
//         .find()
//         .sort({ position: 1 })
//         .then(response => res.json(response))
//         // .then(response => setTimeout(() => res.json(response), 200))
//         .catch(err => res.status(500).json({ code: 500, message: 'Error fetching users.', err }))
// })


router.get('/:user_id', (req, res) => {

    User
        .findById(req.params.user_id)
        // .populate('courses')
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching user.', err }))
})


// router.post('/new', (req, res) => {

//     const user = req.body

//     User
//         .create(user)
//         .then(response => res.json(response))
//         .catch(err => res.status(500).json({ code: 500, message: 'Error saving user.', err }))
// })


router.put('/edit/:user_id', checkLoggedUser, (req, res) => {

    const {user, changePassword} = req.body
    // const userId = req.params.user_id

    if( changePassword === false ){
        User
            .findByIdAndUpdate(user._id, user, { new: true })
            .then(updatedUser => res.json(updatedUser) )
            .catch(err => res.status(500).json({ code: 500, err: ['Error editing user.']}))
    }else{

        User
        .findById(user._id)
        .then(response => {    

            const isPasswordMatch = user.pwd ? bcrypt.compareSync(user.pwd, response.password) : false
            const isPwdNewMatch = user.pwdNew1 ? user.pwdNew1 === user.pwdNew2 : false
            
            if( isPasswordMatch  && isPwdNewMatch){
                const salt = bcrypt.genSaltSync(bcryptSalt)
                const hashPass = bcrypt.hashSync(user.pwdNew1, salt)
                user.password = hashPass
                User
                    .findByIdAndUpdate(user._id, user, { new: true })
                    .then(response => res.json(response) )
                    .catch(err => res.status(500).json({ code: 500, err: ['Error editing user.']}))
            }else{
                return res.status(500).json({ code: 500, err: ['Introdu parola corectă și o nouă parolă sau debifează opțiunea "Schimbă parola".']})
                // return res.status(500).json({ code: 500, err: ['Provide the correct current password, and a new password or uncheck the "Change password" box.']})
            }
        })
        .catch(err => res.status(500).json({ code: 500, err: ['Error fetching user.'] }))
    }


    // User
    //     .findById(user._id)
    //     .then(response => {           
            
    //         if( bcrypt.compareSync(user.pwd, response.password) === true  && user.pwdNew1 === user.pwdNew2){
    //             const salt = bcrypt.genSaltSync(bcryptSalt)
    //             const hashPass = user.pwdNew1 ? bcrypt.hashSync(user.pwdNew1, salt) : undefined
    //             user.password = hashPass
    //             User
    //                 .findByIdAndUpdate(user._id, user)
    //                 .then(response => res.json(response) )
    //                 .catch(err => res.status(500).json({ code: 500, err: ['Error editing user.']}))
    //         }else{
    //             res.status(500).json({ code: 500, err: ['Provide the correct current password, and a new password.']})
    //         }
    //     })
    //     .catch(err => res.status(500).json({ code: 500, err: ['Error fetching user.'] }))

})



module.exports = router






// console.log('the current pasword is correct: ', bcrypt.compareSync(pwd, user.password)===true)
// console.log('pwdNew1: ', user.pwdNew1)
// console.log('pwdNew2: ', user.pwdNew2)