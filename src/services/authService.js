const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');

const { SECRET } = require('../config/config')

exports.register = (userData) => {
    const user = User.findOne({email: userData.email});

    if (user){
        throw new Error('Email already exist!')
    }
    return User.create(userData)
};

exports.login = async (email, password) => {
    //Get user from DB
    const user = await User.findOne({email})

    //Check if user exist
    if (!user){
        throw new Error('Email or password is incorrect!')
    }

    //Check if password is correct
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid){
        throw new Error('Email or password is incorrect!')
    }

    //Generate JWT token
    const payload = {
        _id: user._id,
        email: user.email,
    }
    const token = await jwt.sign(payload, SECRET, { expiresIn: '2h'})

    return token; 
}