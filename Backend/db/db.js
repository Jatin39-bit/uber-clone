const mongoose = require("mongoose")

function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT , {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => { console.log("connected to database") }
    ).catch(error => console.log(error))
}

module.exports = connectToDb
