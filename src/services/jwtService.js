const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()


const genneralAccessToken = async (payload) => {
    console.log('payload' , payload)
    const access_token = jwt.sign({
        payload
    }, process.env.ACCESS_TOKEN , {expiresIn: '1h'})
    return access_token
}

const genneralRefreshToken = async (payload) => {
    const Refresh_token = jwt.sign({
        payload
    }, process.env.REFRESH_TOKEN , {expiresIn: '365d'})
    return Refresh_token
}


module.exports = {
    genneralAccessToken,
    genneralRefreshToken
}