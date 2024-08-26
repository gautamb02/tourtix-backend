const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const constants = require('../config/constants')

const secretKey = constants.JWT_SECRET; 
const saltRounds = 10; // Number of salt rounds for bcrypt

// Function to generate JWT token
function generateJWTToken(payload) {
    return jwt.sign(payload, secretKey); 
}

// Function to verify JWT token
function verifyToken(token) {
    try {
        return jwt.verify(token, secretKey);
    } catch (err) {
        return null; // Return null if token verification fails
    }
}

// Function to encrypt password
async function encryptPassword(password) {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
}

// Function to decrypt/compare password
async function decryptPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

module.exports = {
    generateJWTToken,
    verifyToken,
    encryptPassword,
    decryptPassword,
};
