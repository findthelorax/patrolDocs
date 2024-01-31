const mongoose = require('mongoose');
const { MONGODB_URL, MONGODB_DB_NAME } = process.env;

const db = async () => {
    try {
        const connection = await mongoose.connect(`${MONGODB_URL}/${MONGODB_DB_NAME}`);
        return connection;
    } catch (err) {
        throw new Error(`Error: ${err.message}`);
    }
};

module.exports = db;