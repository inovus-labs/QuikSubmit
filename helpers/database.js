const db = require('../config/db');

const User = require('../models/users');


module.exports = {



    // save user to database
    saveUser: async (user) => {
        return new Promise(async (resolve, reject) => {

            await new User(user).save()
            .then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            }); 
            
        });
    },
    


};