const bcrypt = require('bcryptjs');
const jwt  = require('jsonwebtoken');
const axios = require('axios');

const { APP_SECRET } = require('../config');

const jwt = require('jsonwebtoken')

// ================================== UTILITY FUNCTIONS =================================

const verifyToken = (req, res, next) => {
    const authHeader = req.header(`Authorization`)
    const token = authHeader && authHeader.split(` `)[1]

    if (!token) {
        return res.status(401).json({ success: false, message: `Token not found!` })
        
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
        req.userId = decoded.userId
        next()
    } catch (error) {
        console.log(error.message)
        return res.status(403).json({ success: false, message: `Invalid Token!` })
        
    }
    

}

module.exports = { verifyToken, }

//Utility functions
module.exports.GenerateSalt = async() => {
        return await bcrypt.genSalt()    
},

module.exports.GeneratePassword = async (password, salt) => {
        return await bcrypt.hash(password, salt);
};


module.exports.ValidatePassword = async (enteredPassword, savedPassword, salt) => {
        return await this.GeneratePassword(enteredPassword, salt) === savedPassword;
};

module.exports.GenerateSignature = async (payload) => {
        return await jwt.sign(payload, APP_SECRET, { expiresIn: '1d'} )
}, 

module.exports.ValidateSignature  = async(req) => {

        const signature = req.get('Authorization');

        console.log(signature);
        
        if(signature){
            const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET);
            req.user = payload;
            return true;
        }

        return false
};

module.exports.FormateData = (data) => {
        if(data){
            return { data }
        }else{
            throw new Error('Data Not found!')
        }
    }

module.exports.PublishCustomerEvent = async(payload) => {
        
        axios.post('http://localhost:8000/customer/app-events', {
                payload
        })
}

module.exports.PublishShoppingEvent = async(payload) => {
        axios.post('http://localhost:8000/shopping/app-events', {
                payload
        })
}
