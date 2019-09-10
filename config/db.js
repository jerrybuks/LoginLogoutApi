const mongoose = require('mongoose');

async function initDb() {
    try{
    await mongoose.connect('mongodb+srv://jerry:jerrybuks@bookapi-qwpsz.mongodb.net/test?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    });
    console.log(`connected to Databse`)
    }
	catch  {
        console.log(`not connected to Databse`)
    }
}

module.exports = initDb;