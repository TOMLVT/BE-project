const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authMiddleware = (req , res) => {
    console.log('checkToken' , req.headers.token)
        const token = req.headers.token.split(' ')[1]
        jwt.verify(token , process.env.ACCESS_TOKEN, function(err , user) {
            console.log(decoded.foo)
            if (err) {
                 return res.status(404).json({
                    message : 'The authemtication',
                    status : 'ERROR'
                 })
            }
            console.log('user' , user)
        })
}

module.exports = {
    authMiddleware
}