require('dotenv').config()

class Constants {

    constructor(){
        this.loadEnvironmentVariables();
    }

    loadEnvironmentVariables(){
        this.PORT = process.env.PORT;
        this.SALT_ROUNDS = process.env.SALT_ROUNDS;
        this.JWT_SECRET = process.env.JWT_SECRET;
        this.MONGO_URI = process.env.MONGO_URI;
    }

};

module.exports = new Constants();