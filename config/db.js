const mongoose = require('mongoose');

module.exports = {

    // Establish connection to MongoDB Atlas
    connect: () => {
        // mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("--- Connected to MongoDB Database\n");
        }).catch((error) => {
            console.log(error);
        });
    },

    // Get a collection from MongoDB Atlas
    collection: (name) => {
        return mongoose.connection.db.collection(name);
    }

};